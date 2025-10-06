import { Component, OnInit, OnDestroy, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';

import { OAuthService } from 'angular-oauth2-oidc';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnalyticsData } from '@flowx/core-sdk'
import { ProcessModule } from './process.module';
import { environment } from '../../../environments/environment';
import { FlxLanguageService } from '../../services/language.service';
@Component({
    selector: 'flx-process',
    imports: [ProcessModule],
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss'],
})
export class FlxProcessComponent implements OnInit, OnDestroy {
  #authService = inject(OAuthService)
  #route = inject(ActivatedRoute)
  #localizationService = inject(FlxLanguageService)
  #destroyRef = inject(DestroyRef)

  apiUrl = environment.baseUrl;
  staticUrl = environment.staticAssetsPath;
  processPath = environment.processApiPath;

  processName = 'PROCESS_NAME';
  themeId = 'THEME_ID';
  projectInfo = {projectId: 'PROJECT_ID'}
  workspaceId = 'WORKSPACE_ID';
  language = 'en';
  locale= 'en-us'
  processStartData = {};

  accessToken = localStorage.getItem('access_token') || '';

  analyticsListener = (event: Event) => {
    const { detail } = event as CustomEvent<AnalyticsData>
    console.log('Received flowx:analytics event:', detail)
  }

  onProcessEnd = () => {
    console.log('Process has ended')
  }

  ngOnInit(): void {
    
      this.#route.paramMap
        .pipe(
          first(), 
          map(() => window.history.state)
        )
        .subscribe((state) => {
          this.processName = state.processName || this.processName;
          this.language = this.#localizationService.selectedLanguage();
        })
    
      this.#authService.events.pipe(takeUntilDestroyed(this.#destroyRef)).subscribe((event) => {
        if (event.type === 'token_received') {
          this.accessToken = this.#authService.getAccessToken()
        }
      })
    

    document.addEventListener('flowx:analytics', this.analyticsListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('flowx:analytics', this.analyticsListener);
  }
}
