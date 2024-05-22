import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  baseUrl = environment.baseUrl;
  selectedProcessId = '';

  constructor(
    private router: Router,
    private oauthService: OAuthService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.queryParamMap.get('processName')) {
      this.startProcess(
        this.activeRoute.snapshot.queryParamMap.get('processName'),
        this.activeRoute.snapshot.queryParamMap.get('startCondition')
      );
    }
  }

  startProcess(processName?: any, startCondition?: any): any {
    const startData: any = {};
    if (startCondition) {
      startData.startCondition = startCondition;
    }

    this.router.navigate(['/process'], {
      state: {
        processName: processName || this.selectedProcessId,
        processStartData: startData,
      },
    });
  }
}
