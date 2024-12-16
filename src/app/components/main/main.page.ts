import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
    standalone: false
})
export class MainPage implements OnInit {
  baseUrl = environment.baseUrl;

  constructor(
    private router: Router,
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

  startProcess(processName?: any, projectId?: any, startCondition?: any): any {
    const processStartData: any = {};
    if (startCondition) {
      processStartData.startCondition = startCondition;
    }

    this.router.navigate(['/process'], {
      state: {
        processName,
        projectId,
        processStartData,
      },
    });
  }
}
