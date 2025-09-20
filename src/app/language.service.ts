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
      'nav.german': 'DE',
      'nav.english': 'EN',
      
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
      'input.dataComplexity': 'Datenkomplexität und -vielfalt',
      'input.dataSourceDiversity': 'Datenquellenvielfalt (Anzahl der genutzten Datentypen.)',
      'input.dataIntegrity': 'Datenintegrität (Grad der Vollständigkeit und Konsistenz der verarbeitbaren Eingangsdaten.)',
      'input.dataComplexityLevel': 'Datenkomplexität (Schwierigkeitsgrad bei der Interpretation der Daten.)',
      'input.dataLinking': 'Datenverknüpfung (Fähigkeit, mehrere Datenquellen in einer Analyse zu kombinieren.)',
      'input.dataVolume': 'Datenvolumen (Menge und Umfang der zu verarbeitenden Daten.)',
      'input.diseaseComplexity': 'Komplexität der Erkrankung',
      'input.diseaseRarity': 'Seltenheit der Erkrankung (Häufigkeit des Auftretens in der Bevölkerung.)',
      'input.diagnosticAmbiguity': 'Diagnostische Mehrdeutigkeit (Schwierigkeit der eindeutigen Diagnosestellung.)',
      'input.prognosticUncertainty': 'Prognostische Unsicherheit (Vorhersagbarkeit des Krankheitsverlaufs.)',
      'input.multimorbidity': 'Multimorbidität (Gleichzeitiges Vorliegen mehrerer Erkrankungen.)',
      'input.diseaseSeverity': 'Schweregrad der Erkrankung (Ausmaß der funktionellen Beeinträchtigung.)',
      'input.questionComplexity': 'Schwierigkeitsgrad der Fragestellung',
      'input.differentialDiagnosticDepth': 'Differenzialdiagnostische Tiefe (Anzahl und Komplexität der zu unterscheidenden Diagnosen.)',
      'input.prognosticPrecision': 'Prognostische Präzision (Genauigkeit der Vorhersage von Krankheitsverläufen.)',
      'input.realTimeRequirement': 'Anforderung an die Echtzeit (Zeitkritizität der Entscheidungsfindung.)',
      'input.interdisciplinaryRelevance': 'Interdisziplinäre Relevanz (Notwendigkeit der Zusammenarbeit verschiedener Fachbereiche.)',
      'input.dynamicAdaptability': 'Dynamische Anpassungsfähigkeit (Fähigkeit zur Anpassung an sich ändernde Bedingungen.)',
      'input.aiSupport': 'Ausmaß der KI-Unterstützung',
      'input.automationLevel': 'Automatisierungsgrad (Umfang der automatisierten Entscheidungsfindung.)',
      'input.analysisDepth': 'Analyseebene (Tiefe der Datenanalyse und -interpretation.)',
      'input.recommendationComplexity': 'Empfehlungskomplexität (Komplexität der generierten Handlungsempfehlungen.)',
      'input.guidelineIntegration': 'Integration von Leitlinien (Einbindung medizinischer Leitlinien und Standards.)',
      'input.patientSpecificIndividualization': 'Patientenspezifische Individualisierung (Anpassung an individuelle Patienteneigenschaften.)',
      'input.scoreLabels': {
        '1': '1 - Nur ein Datentyp (z.B. Labordaten).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Sehr vielfältig (z.B. multimodale Daten).'
      },
      
      // Score Properties
      'properties.title': 'Score Einstellungen',
      'properties.description': 'Konfigurieren Sie die Einstellungen für die Score-Berechnung.',
      'properties.dimensions': 'Dimensionen',
      'properties.criteria': 'Kriterien für',
      'properties.scaleLabels': 'Skalenbeschriftungen',
      'properties.scoreLabel': 'Score',
      'properties.placeholder': 'Bezeichnung für Score',
      'properties.hint': 'Geben Sie eine aussagekräftige Bezeichnung für diesen Scorewert ein',
      'properties.resetDefaults': 'Standardwerte',
      'properties.save': 'Speichern',
      'properties.selectDimension': 'Bitte wählen Sie eine Dimension aus der Liste links aus.',
      'properties.selectCriterion': 'Bitte wählen Sie ein Kriterium aus der Liste aus.',
      'properties.backToDimensions': 'Zurück zu Dimensionen',
      'properties.backToCriteria': 'Zurück zu Kriterien',
      
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
      'nav.german': 'DE',
      'nav.english': 'EN',
      
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
      'input.dataComplexity': 'Data Complexity and Diversity',
      'input.dataSourceDiversity': 'Data Source Diversity (Number of data types used.)',
      'input.dataIntegrity': 'Data Integrity (Degree of completeness and consistency of processable input data.)',
      'input.dataComplexityLevel': 'Data Complexity (Difficulty level in interpreting the data.)',
      'input.dataLinking': 'Data Linkage (Ability to combine multiple data sources in an analysis.)',
      'input.dataVolume': 'Data Volume (Amount and scope of data to be processed.)',
      'input.diseaseComplexity': 'Disease Complexity',
      'input.diseaseRarity': 'Disease Rarity (Frequency of occurrence in the population.)',
      'input.diagnosticAmbiguity': 'Diagnostic Ambiguity (Difficulty of unambiguous diagnosis.)',
      'input.prognosticUncertainty': 'Prognostic Uncertainty (Predictability of disease course.)',
      'input.multimorbidity': 'Multimorbidity (Simultaneous presence of multiple diseases.)',
      'input.diseaseSeverity': 'Disease Severity (Extent of functional impairment.)',
      'input.questionComplexity': 'Question Complexity Level',
      'input.differentialDiagnosticDepth': 'Differential Diagnostic Depth (Number and complexity of diagnoses to be distinguished.)',
      'input.prognosticPrecision': 'Prognostic Precision (Accuracy of disease course prediction.)',
      'input.realTimeRequirement': 'Real-time Requirement (Time-criticality of decision-making.)',
      'input.interdisciplinaryRelevance': 'Interdisciplinary Relevance (Need for collaboration between different specialties.)',
      'input.dynamicAdaptability': 'Dynamic Adaptability (Ability to adapt to changing conditions.)',
      'input.aiSupport': 'Extent of AI Support',
      'input.automationLevel': 'Automation Level (Scope of automated decision-making.)',
      'input.analysisDepth': 'Analysis Level (Depth of data analysis and interpretation.)',
      'input.recommendationComplexity': 'Recommendation Complexity (Complexity of generated action recommendations.)',
      'input.guidelineIntegration': 'Guideline Integration (Integration of medical guidelines and standards.)',
      'input.patientSpecificIndividualization': 'Patient-Specific Individualization (Adaptation to individual patient characteristics.)',
      'input.scoreLabels': {
        '1': '1 - Only one data type (e.g., lab data).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Very diverse (e.g., multimodal data).'
      },
      
      // Score Properties
      'properties.title': 'Score Settings',
      'properties.description': 'Configure the settings for score calculation.',
      'properties.dimensions': 'Dimensions',
      'properties.criteria': 'Criteria for',
      'properties.scaleLabels': 'Scale Labels',
      'properties.scoreLabel': 'Score',
      'properties.placeholder': 'Label for Score',
      'properties.hint': 'Enter a meaningful label for this score value',
      'properties.resetDefaults': 'Reset to Defaults',
      'properties.save': 'Save',
      'properties.selectDimension': 'Please select a dimension from the list on the left.',
      'properties.selectCriterion': 'Please select a criterion from the list.',
      'properties.backToDimensions': 'Back to Dimensions',
      'properties.backToCriteria': 'Back to Criteria',
      
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
