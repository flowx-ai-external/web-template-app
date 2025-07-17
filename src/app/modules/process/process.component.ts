import { Component, OnInit, Inject, OnDestroy, DestroyRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LocalizationService } from '../../services/localization.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AnalyticsData } from '@flowx/core-sdk'
@Component({
    selector: 'app-modules',
    templateUrl: './process.component.html',
    styleUrls: ['./process.component.scss'],
    standalone: false
})
export class ProcessComponent implements OnInit, OnDestroy {
  public apiUrl = this.baseApiUrl;
  public staticUrl = this.staticAssetsUrl;
  public processPath = this.processApiPath;

  public processStartData = {};
  public processName = 'PROCESS_NAME';
  public themeId = 'THEME_ID';
  public projectInfo = {projectId: 'PROJECT_ID'}
  public language = 'LANGUAGE';
  public locale= 'LOCALE'
  public workspaceId = 'WORKSPACE_ID';

  accessToken = localStorage.getItem('access_token') || '';

  subscription: Subscription = new Subscription();

  constructor(
    @Inject('BASE_URL') private baseApiUrl: string,
    @Inject('STATIC_ASSETS_URL') private staticAssetsUrl: string,
    @Inject('PROCESS_API_PATH') private processApiPath: string,
    private route: ActivatedRoute,
    private localizationService: LocalizationService,
    private authService: OAuthService,
    private destroyRef: DestroyRef
  ) {}

  analyticsListener = (event: Event) => {
    const { detail } = event as CustomEvent<AnalyticsData>
    console.log('Received flowx:analytics event:', detail)
  }

  onProcessEnd = () => {
    console.log('Process has ended')
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap
        .pipe(first(), map(() => window.history.state))
        .subscribe((state) => {
          this.processName = state.processName || this.processName;
          this.projectInfo = {projectId: state.projectId || this.projectInfo.projectId};
          this.processStartData = {
            ...state.processStartData,
          };
          this.language = this.localizationService.getSelectedLanguage().value;
        })
    );

    this.subscription.add(
      this.authService.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
        if (event.type === 'token_received') {
          this.accessToken = this.authService.getAccessToken()
        }
      })
    )

    document.addEventListener('flowx:analytics', this.analyticsListener);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

    document.removeEventListener('flowx:analytics', this.analyticsListener);
  }
}
