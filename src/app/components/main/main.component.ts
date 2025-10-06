import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'flx-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class FlxMainComponent implements OnInit {
  readonly #router = inject(Router)
  readonly #activeRoute = inject(ActivatedRoute)

  ngOnInit(): void {
    if (this.#activeRoute.snapshot.queryParamMap.get('processName')) {
      this.startProcess(
        this.#activeRoute.snapshot.queryParamMap.get('processName')!,
      );
    }
  }

  startProcess(processName?: string): void {
    this.#router.navigate(['/process'], {
      state: { processName },
    });
  }
}
