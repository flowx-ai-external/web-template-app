import {NgModule, APP_INITIALIZER} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {OAuthModule, AuthConfig} from 'angular-oauth2-oidc';

import {authConfig, OAuthModuleConfig} from './auth.config';

import {AuthConfigService} from './auth.service';
import {environment} from '../../../environments/environment';

export function init_app(authConfigService: AuthConfigService): () => Promise<any> {
    return () => authConfigService.initAuth();
}

@NgModule({
    imports: [
        HttpClientModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [`${environment.baseUrl}`],
                sendAccessToken: true,
            },
        }),
    ],
    providers: [
        AuthConfigService,
        {provide: AuthConfig, useValue: authConfig},
        OAuthModuleConfig,
        {
            provide: APP_INITIALIZER,
            useFactory: init_app,
            deps: [AuthConfigService],
            multi: true,
        },
    ],
})
export class AuthConfigModule {
}
