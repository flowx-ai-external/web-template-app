import {inject, Injectable} from '@angular/core';
import { NullValidationHandler, OAuthService} from 'angular-oauth2-oidc';
import {filter} from 'rxjs/operators';
import { authConfig } from './auth.config';

@Injectable({
    providedIn: 'root'
})
export class AuthConfigService {
    #oauthService = inject(OAuthService);

    #decodedAccessToken!: string;
    #decodedIDToken!: string;

    get decodedAccessToken(): string {
        return this.#decodedAccessToken;
    }

    get decodedIDToken(): string {
        return this.#decodedIDToken;
    }

    async initAuth(): Promise<any> {
        return new Promise<void>((resolveFn, rejectFn) => {
            // setup oauthService
            this.#oauthService.configure(authConfig);
            this.#oauthService.setStorage(localStorage);
            this.#oauthService.tokenValidationHandler = new NullValidationHandler();

            // subscribe to token events
            this.#oauthService.events
                .pipe(
                    filter((e: any) => {
                        return e.type === 'token_received';
                    })
                )
                .subscribe(() => this.handleNewToken());

            // continue initializing app or redirect to login-page
            this.#oauthService.loadDiscoveryDocumentAndLogin().then((isLoggedIn) => {
                if (isLoggedIn) {
                    this.#oauthService.setupAutomaticSilentRefresh();
                    resolveFn();
                } else {

                    this.#oauthService.initImplicitFlow();
                    rejectFn();
                }
            });
        });
    }

    private handleNewToken(): void {
        this.#decodedAccessToken = this.#oauthService.getAccessToken();
        this.#decodedIDToken = this.#oauthService.getIdToken();
    }
}
