import { Injectable, signal } from '@angular/core';

type Language = {
  label: string;
  value: string;
};

const LANGUAGE_LOCAL_STORAGE_KEY = 'flxLanguageKey'

@Injectable({ providedIn: 'root' })
export class FlxLanguageService {
  readonly availableLanguages: Language[] = [
    {label:  'English', value: 'en'},
    {label: 'Romanian', value: 'ro'}
  ];

  readonly selectedLanguage = signal<Language['value']>(this.availableLanguages[0].value);

  constructor() {
    const storedLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
    if (storedLanguage) {
      const foundLanguage = this.availableLanguages.find(language => language.value === storedLanguage) ??  this.availableLanguages[0]; 
      this.selectedLanguage.set(foundLanguage.value);
    } else {
      this.selectedLanguage.set(this.availableLanguages[0].value);
      localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, this.selectedLanguage());
    }
  }

  setSelectedLanguage(language = this.availableLanguages[0].value): void {
    this.selectedLanguage.set(language);
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, language);
  }
}

