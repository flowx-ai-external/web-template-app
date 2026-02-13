import { Injectable, inject } from '@angular/core';

import {
  AuthConfig,
  NullValidationHandler,
  OAuthService,
} from 'angular-oauth2-oidc';

import { filter } from 'rxjs/operators';

import { environment } from '../../environments/environment';

type OrgLookupResponse = {
  organizationId: string;
  issuer: string;
  tokenEndpoint: string;
  clientId: string;
  redirectUri: string;
};

const ORG_CODE = environment.orgCode;
const FX_CLIENT_HOST = 'Fx-Client-Host';
const REDIRECT_LOCAL_STORAGE_KEY = 'FX-REDIRECT';

const fetchOrgLookup = async (
  url: string,
  clientHostHeaderValue: string
): Promise<OrgLookupResponse> => {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      [FX_CLIENT_HOST]: clientHostHeaderValue,
    },
  });

  if (!response.ok) {
    throw new Error(`Org lookup failed (${response.status})`);
  }

  return (await response.json()) as OrgLookupResponse;
};

@Injectable({
  providedIn: 'root',
})
export class AuthConfigService {
  #oauthService = inject(OAuthService);
  #authConfig = inject(AuthConfig);
  #decodedAccessToken: any;
  #decodedIDToken: any;

  get decodedAccessToken(): any {
    return this.#decodedAccessToken;
  }

  get decodedIDToken(): any {
    return this.#decodedIDToken;
  }

  async initAuth(): Promise<any> {
    const currentUrl = window.location.href;
    if (!localStorage.getItem(REDIRECT_LOCAL_STORAGE_KEY)) {
      localStorage.setItem(REDIRECT_LOCAL_STORAGE_KEY, currentUrl);
    }

    const redirectFromStorage = localStorage.getItem(
      REDIRECT_LOCAL_STORAGE_KEY
    );
    const baseConfig = {
      ...this.#authConfig,
      redirectUri:
        redirectFromStorage ?? currentUrl ?? this.#authConfig.redirectUri,
    };
    let resolvedConfig = baseConfig;

    if (ORG_CODE) {
      try {
        const orgLookup = await fetchOrgLookup(
          `${environment.baseUrl}/org/api/org/code/${encodeURIComponent(
            ORG_CODE
          )}`,
          window.location.hostname
        );
        const redirect = localStorage.getItem(REDIRECT_LOCAL_STORAGE_KEY);
        resolvedConfig = {
          ...baseConfig,
          issuer: orgLookup.issuer,
          clientId: orgLookup.clientId,
          redirectUri:
            redirect ?? orgLookup.redirectUri ?? baseConfig.redirectUri,
        };
      } catch (error) {
        console.warn(
          'Org lookup failed, falling back to default config',
          error
        );
        resolvedConfig = baseConfig;
      }
    }

    this.#oauthService.configure(resolvedConfig);
    this.#oauthService.setStorage(localStorage);
    this.#oauthService.tokenValidationHandler = new NullValidationHandler();

    this.#oauthService.events
      .pipe(filter((e: any) => e.type === 'token_received'))
      .subscribe(() => this.#handleNewToken());

    const isLoggedIn = await this.#oauthService.loadDiscoveryDocumentAndLogin();
    if (isLoggedIn) {
      this.#oauthService.setupAutomaticSilentRefresh();
      const redirect = localStorage.getItem(REDIRECT_LOCAL_STORAGE_KEY);
      if (redirect) {
        localStorage.removeItem(REDIRECT_LOCAL_STORAGE_KEY);
        if (redirect !== window.location.href) {
          window.location.href = redirect;
          return;
        }
      }
    } else {
      if (!localStorage.getItem(REDIRECT_LOCAL_STORAGE_KEY)) {
        localStorage.setItem(REDIRECT_LOCAL_STORAGE_KEY, window.location.href);
      }
      this.#oauthService.initImplicitFlow();
      throw new Error('Not logged in');
    }
  }

  logout(): void {
    this.#oauthService.logOut({ client_id: this.#oauthService.clientId });
  }

  #handleNewToken(): void {
    this.#decodedAccessToken = this.#oauthService.getAccessToken();
    this.#decodedIDToken = this.#oauthService.getIdToken();
  }
}
