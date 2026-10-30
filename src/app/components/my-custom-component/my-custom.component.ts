import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import {
  FLX_VALIDATOR_SERVICE,
  FlxCustomComponentData,
  getEnumerationItems,
  getMediaItemUrl,
  getSubstitutionTagContent,
} from '@flowx/angular-sdk';
import { ANALYTICS_EVENTS, NomenclatorValue, pushAnalyticsData } from '@flowx/core-sdk';

@Component({
    selector: 'my-custom-component',
    imports: [CommonModule, FormsModule],
    templateUrl: './my-custom.component.html',
    styleUrls: ['./my-custom.component.scss'],
})

export class MyCustomComponent implements OnInit {
  input = input<FlxCustomComponentData>();

  #validationService = inject(FLX_VALIDATOR_SERVICE);
  #destroyRef = inject(DestroyRef);

  name = '';
  submitted = signal(false);

  // Utility API: resolved against the project of the running renderer
  options = signal<NomenclatorValue[]>([]);
  logoUrl = getMediaItemUrl('<MEDIA_ITEM_KEY>');
  label = getSubstitutionTagContent('<SUBSTITUTION_TAG_KEY>') ?? 'Client name';

  ngOnInit(): void {
    getEnumerationItems('<ENUMERATION_NAME>').then((items) => this.options.set(items));

    // Emits on step submit
    this.#validationService.validated$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(() => this.submitted.set(true));
    this.onNameChange();
  }

  onNameChange(): void {
    // Blocks the step submit while the name is empty
    this.#validationService.validate(!!this.name);
    // Written back to the process data on step submit
    this.#validationService.saveData({ name: this.name });
  }

  saveData(): void {
    pushAnalyticsData({ type: ANALYTICS_EVENTS.ACTION, value: 'custom-component-save', label: 'Save Data' });
    this.input()?.runAction('saveData', { appData: { name: this.name } }).subscribe();
  }
}
