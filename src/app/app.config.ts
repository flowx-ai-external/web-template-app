import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { AuthConfigService } from './auth/auth.service';
import { FlxIconModule, provideExtraIconSet } from '@flowx/angular-ui-toolkit';
import { logoutIcon } from './icons';
import { environment } from '../environments/environment';
import { authConfig } from './auth/auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideAppInitializer(() => inject(AuthConfigService).initAuth()),
    provideOAuthClient({
      resourceServer: {
        allowedUrls: [`${environment.baseUrl}`],
        sendAccessToken: true,
      },
    }),
    { provide: AuthConfig, useValue: authConfig },
    importProvidersFrom(FlxIconModule),
    provideExtraIconSet({ logoutIcon }),
  ],
};
