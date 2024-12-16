import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {OAuthModule, AuthConfig} from 'angular-oauth2-oidc';

import {authConfig, OAuthModuleConfig} from './auth.config';

import {AuthConfigService} from './auth.service';
import {environment} from '../../../environments/environment';

export function init_app(authConfigService: AuthConfigService): () => Promise<any> {
    return () => authConfigService.initAuth();
}

@NgModule({ imports: [OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [`${environment.baseUrl}`],
                sendAccessToken: true,
            },
        })], providers: [
        AuthConfigService,
        { provide: AuthConfig, useValue: authConfig },
        OAuthModuleConfig,
        provideAppInitializer(() => {
        const initializerFn = (init_app)(inject(AuthConfigService));
        return initializerFn();
      }),
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AuthConfigModule {
}
