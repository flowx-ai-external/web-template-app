import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, importProvidersFrom, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { AuthConfigService } from './auth/auth.service';
import { FlxIconModule, provideExtraIconSet } from '@flowx/angular-ui-toolkit';
import { logoutIcon } from './icons';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideAnimations(),
    provideRouter(routes), 
    provideHttpClient(),
    provideAppInitializer(() => inject(AuthConfigService).initAuth()),
    provideOAuthClient(),
    importProvidersFrom(FlxIconModule),
    provideExtraIconSet({ logoutIcon }),
  ]
};
