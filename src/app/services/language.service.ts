import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>('de');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();
  
  private translations: { [key: string]: any } = {};

  constructor() {
    this.loadTranslations();
  }

  private async loadTranslations() {
    try {
      // Load German translations
      const deResponse = await fetch('/assets/i18n/de.json');
      this.translations['de'] = await deResponse.json();
      
      // Load English translations
      const enResponse = await fetch('/assets/i18n/en.json');
      this.translations['en'] = await enResponse.json();
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  setLanguage(language: string) {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('preferred-language', language);
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  translate(key: string): string {
    const currentLang = this.getCurrentLanguage();
    const translation = this.getNestedValue(this.translations[currentLang], key);
    return translation || key;
  }

  private getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  // Get score label for complexity criteria
  getScoreLabel(criterionId: string, score: number): string {
    const key = `pricing.${criterionId}.scoreLabels.${score}`;
    return this.translate(key);
  }

  // Get all available languages
  getAvailableLanguages(): { code: string; name: string }[] {
    return [
      { code: 'de', name: 'Deutsch' },
      { code: 'en', name: 'English' }
    ];
  }
}
