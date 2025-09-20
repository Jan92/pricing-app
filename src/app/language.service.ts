import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Language = 'de' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<Language>('de');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations = {
    de: {
      // Navigation
      'nav.overview': 'Übersicht Scores',
      'nav.newScore': 'Neuen Score berechnen',
      'nav.scoreSettings': 'Score Einstellungen',
      'nav.priceSimulation': 'Preissimulation',
      'nav.pricingStrategy': 'Pricing Strategie',
      'nav.simulationResults': 'Simulation Ergebnisse',
      'nav.language': 'Sprache',
      'nav.german': 'Deutsch',
      'nav.english': 'English',
      
      // Common
      'common.save': 'Speichern',
      'common.cancel': 'Abbrechen',
      'common.delete': 'Löschen',
      'common.edit': 'Bearbeiten',
      'common.details': 'Details',
      'common.loading': 'Lade Ergebnisse...',
      'common.noResults': 'Noch keine Bewertungen gespeichert.',
      'common.confirmDelete': 'Sind Sie sicher, dass Sie die Bewertung',
      'common.deleted': 'Bewertung',
      'common.dataSaved': 'Daten gespeichert für Evaluation ID',
      'common.fillAllFields': 'Bitte füllen Sie alle Felder aus.',
      
      // Score Management
      'score.name': 'Score-Name',
      'score.totalScore': 'Gesamtscore',
      'score.actions': 'Aktionen',
      'score.placeholder': 'z.B. Projekt XY oder Patient 123',
      'score.currentEvaluationId': 'Aktuelle Evaluations-ID',
      'score.calculateSingle': 'Berechnung einzelner AI Score',
      
      // Pricing Strategy
      'pricing.title': 'Pricing Strategie',
      'pricing.description': 'Hier können Sie verschiedene Pricing-Strategien definieren und simulieren.',
      
      // Data Input
      'input.title': 'Neuen Score berechnen',
      'input.description': 'Geben Sie die erforderlichen Daten ein, um einen neuen Score zu berechnen.',
      
      // Score Properties
      'properties.title': 'Score Einstellungen',
      'properties.description': 'Konfigurieren Sie die Einstellungen für die Score-Berechnung.',
      
      // Results
      'results.title': 'Simulation Ergebnisse',
      'results.description': 'Hier werden die Ergebnisse Ihrer Simulationen angezeigt.',
      
      // Pricing Strategy
      'pricing.phases.systemOverview': 'System-Übersicht',
      'pricing.phases.complexity': 'Komplexität',
      'pricing.phases.marketCompetition': 'Markt & Wettbewerb',
      'pricing.phases.implementation': 'Implementierung & Vertrieb',
      'pricing.phases.businessModel': 'Geschäftsmodell',
      'pricing.phases.results': 'Ergebnisse',
      'pricing.next': 'Weiter →',
      'pricing.previous': '← Zurück',
      'pricing.generateRecommendation': 'Empfehlung generieren',
      'pricing.dataSaved': 'Daten erfolgreich gespeichert',
      'pricing.recommendationGenerated': 'Pricing-Empfehlung wurde erfolgreich generiert!',
      'pricing.noResultsToExport': 'Keine Ergebnisse zum Exportieren verfügbar.',
      'pricing.pdfExportStarted': 'PDF-Export erfolgreich gestartet',
      'pricing.jsonExportSuccessful': 'JSON-Export erfolgreich',
      'pricing.exportError': 'Fehler beim Export',
      'pricing.popupBlocked': 'Popup wurde blockiert',
      'pricing.unknownError': 'Unbekannter Fehler'
    },
    en: {
      // Navigation
      'nav.overview': 'Score Overview',
      'nav.newScore': 'Calculate New Score',
      'nav.scoreSettings': 'Score Settings',
      'nav.priceSimulation': 'Price Simulation',
      'nav.pricingStrategy': 'Pricing Strategy',
      'nav.simulationResults': 'Simulation Results',
      'nav.language': 'Language',
      'nav.german': 'Deutsch',
      'nav.english': 'English',
      
      // Common
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.details': 'Details',
      'common.loading': 'Loading results...',
      'common.noResults': 'No evaluations saved yet.',
      'common.confirmDelete': 'Are you sure you want to delete evaluation',
      'common.deleted': 'Evaluation',
      'common.dataSaved': 'Data saved for Evaluation ID',
      'common.fillAllFields': 'Please fill in all fields.',
      
      // Score Management
      'score.name': 'Score Name',
      'score.totalScore': 'Total Score',
      'score.actions': 'Actions',
      'score.placeholder': 'e.g. Project XY or Patient 123',
      'score.currentEvaluationId': 'Current Evaluation ID',
      'score.calculateSingle': 'Calculate Individual AI Score',
      
      // Pricing Strategy
      'pricing.title': 'Pricing Strategy',
      'pricing.description': 'Here you can define and simulate various pricing strategies.',
      
      // Data Input
      'input.title': 'Calculate New Score',
      'input.description': 'Enter the required data to calculate a new score.',
      
      // Score Properties
      'properties.title': 'Score Settings',
      'properties.description': 'Configure the settings for score calculation.',
      
      // Results
      'results.title': 'Simulation Results',
      'results.description': 'Here you can view the results of your simulations.',
      
      // Pricing Strategy
      'pricing.phases.systemOverview': 'System Overview',
      'pricing.phases.complexity': 'Complexity',
      'pricing.phases.marketCompetition': 'Market & Competition',
      'pricing.phases.implementation': 'Implementation & Sales',
      'pricing.phases.businessModel': 'Business Model',
      'pricing.phases.results': 'Results',
      'pricing.next': 'Next →',
      'pricing.previous': '← Previous',
      'pricing.generateRecommendation': 'Generate Recommendation',
      'pricing.dataSaved': 'Data successfully saved',
      'pricing.recommendationGenerated': 'Pricing recommendation generated successfully!',
      'pricing.noResultsToExport': 'No results available for export.',
      'pricing.pdfExportStarted': 'PDF export started successfully',
      'pricing.jsonExportSuccessful': 'JSON export successful',
      'pricing.exportError': 'Error during export',
      'pricing.popupBlocked': 'Popup was blocked',
      'pricing.unknownError': 'Unknown error'
    }
  };

  constructor() {
    // Load saved language from localStorage or default to German
    const savedLanguage = localStorage.getItem('selectedLanguage') as Language;
    if (savedLanguage && (savedLanguage === 'de' || savedLanguage === 'en')) {
      this.currentLanguageSubject.next(savedLanguage);
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguageSubject.next(language);
    localStorage.setItem('selectedLanguage', language);
  }

  translate(key: string): string {
    const currentLang = this.getCurrentLanguage();
    return (this.translations[currentLang] as any)[key] || key;
  }

  getTranslations(): any {
    const currentLang = this.getCurrentLanguage();
    return this.translations[currentLang];
  }
}
