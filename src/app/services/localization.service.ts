import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalizationService {
  private availableLanguages: Language[] = [
    {label:  'English', value: 'en-US'},
    {label: 'Romanian', value: 'ro-RO'}
  ];
  private languageKey = 'languageKey';

  constructor() {
    if (!localStorage.getItem(this.languageKey)) {
      localStorage.setItem(this.languageKey, this.availableLanguages[0].value);
    }
  }

  getAvailableLanges(): Language[] {
    return this.availableLanguages.slice();
  }

  getSelectedLanguage(): Language {
    const langValue = localStorage.getItem(this.languageKey);
    const lang = this.availableLanguages.find((language => {
      return language.value === langValue;
    }));
    return lang || this.availableLanguages[0];
  }

  setSelectedLanguage(language: Language): void {
    localStorage.setItem(this.languageKey, language.value);
  }
}

export type Language = {
  label: string;
  value: string;
};
