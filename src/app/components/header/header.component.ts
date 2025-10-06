import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';

import { FlxLanguageService } from '../../services/language.service';

import { FlxIconComponent } from '@flowx/angular-ui-toolkit';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'flx-header',
    imports: [FlxIconComponent, ReactiveFormsModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class FlxHeaderComponent implements OnInit {
  readonly #destroyRef = inject(DestroyRef)
  readonly languageService = inject(FlxLanguageService)
  readonly oauthService = inject(OAuthService)

  readonly selectedLanguageFC = new FormControl(
    this.languageService.selectedLanguage(),
    { nonNullable: true }
  )

  ngOnInit(): void {
    this.selectedLanguageFC
      .valueChanges
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((newLanguage) => {
        this.languageService.setSelectedLanguage(newLanguage);
      window.location.reload();
    });
  }
}

