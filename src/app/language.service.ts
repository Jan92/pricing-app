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
      // App
      'app.title': 'Pricing Simulator',
      
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
      'common.back': 'Zurück',
      
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
      'properties.placeholder': 'Geben Sie eine aussagekräftige Bezeichnung für diesen Score-Wert ein',
      'properties.hint': 'Diese Bezeichnung wird in der Bewertung angezeigt',
      'properties.resetDefaults': 'Auf Standard zurücksetzen',
      'properties.save': 'Speichern',
      'properties.selectDimension': 'Bitte wählen Sie eine Dimension aus der Liste links aus.',
      'properties.selectCriterion': 'Bitte wählen Sie ein Kriterium aus der Liste aus.',
      'properties.backToDimensions': 'Zurück zu Dimensionen',
      'properties.backToCriteria': 'Zurück zu Kriterien',
      
      // Dimension Names
      'dimensions.dataComplexity': 'Datenkomplexität und -vielfalt',
      'dimensions.diseaseComplexity': 'Komplexität der Erkrankung',
      'dimensions.questionDifficulty': 'Schwierigkeitsgrad der Fragestellung',
      'dimensions.aiSupportExtent': 'Ausmaß der KI-Unterstützung',
      
      // Criterion Names
      'criteria.sourceVariety': 'Datenquellenvielfalt',
      'criteria.sourceVarietyDesc': 'Anzahl der genutzten Datentypen',
      'criteria.dataIntegrity': 'Datenintegrität',
      'criteria.dataIntegrityDesc': 'Grad der Vollständigkeit und Konsistenz der verarbeitbaren Eingangsdaten',
      'criteria.dataComplexityLevel': 'Datenkomplexität',
      'criteria.dataComplexityLevelDesc': 'Schwierigkeitsgrad bei der Interpretation der Daten',
      'criteria.dataLinking': 'Datenverknüpfung',
      'criteria.dataLinkingDesc': 'Fähigkeit, mehrere Datenquellen in einer Analyse zu kombinieren',
      'criteria.dataVolume': 'Datenvolumen',
      'criteria.dataVolumeDesc': 'Menge der Daten pro Analyse',
      'criteria.diseaseRarity': 'Seltenheit der Erkrankung',
      'criteria.diagnosticAmbiguity': 'Diagnostische Mehrdeutigkeit',
      'criteria.prognosticUncertainty': 'Prognostische Unsicherheit',
      'criteria.multimorbidity': 'Multimorbidität',
      'criteria.diseaseSeverity': 'Schweregrad der Erkrankung',
      'criteria.differentialDepth': 'Differenzialdiagnostische Tiefe',
      'criteria.prognosticPrecision': 'Prognostische Präzision',
      'criteria.realtimeRequirement': 'Anforderung an die Echtzeit',
      'criteria.interdisciplinaryRelevance': 'Interdisziplinäre Relevanz',
      'criteria.dynamicAdaptability': 'Dynamische Anpassungsfähigkeit',
      'criteria.automationLevel': 'Automatisierungsgrad',
      'criteria.analysisLevel': 'Analyseebene',
      'criteria.recommendationComplexity': 'Empfehlungskomplexität',
      'criteria.guidelineIntegration': 'Integration von Leitlinien',
      'criteria.patientIndividualization': 'Patientenspezifische Individualisierung',
      
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
      'pricing.unknownError': 'Unbekannter Fehler',
      
      // Pricing Strategy Content
      'pricing.subtitle': 'Entwickeln und verwalten Sie Ihre Pricing-Strategien für DDSS effizient',
      'pricing.systemOverview.title': 'System-Übersicht',
      'pricing.systemOverview.subtitle': 'Grundlegende Informationen über Ihr DDSS-System und Kosteneingaben',
      'pricing.systemName': 'Name des DDSS-Systems',
      'pricing.systemNameError': 'Bitte geben Sie einen Namen ein',
      'pricing.autonomyLevel': 'Autonomie-Level des Systems',
      'pricing.autonomy.assistive': 'Assistive (Score 1-2)',
      'pricing.autonomy.assistiveDesc': 'Unterstützt Ärzte bei der Entscheidungsfindung, trifft keine autonomen Entscheidungen',
      'pricing.autonomy.augmentative': 'Augmentative (Score 3-4)',
      'pricing.autonomy.augmentativeDesc': 'Erweitert die Fähigkeiten des Arztes, kann teilweise autonome Entscheidungen treffen',
      'pricing.autonomy.autonomous': 'Autonomous (Score 5)',
      'pricing.autonomy.autonomousDesc': 'Kann vollständig autonome medizinische Entscheidungen treffen',
      'pricing.developmentCosts': 'Entwicklungskosten (einmalig)',
      'pricing.costPerUsage': 'Kosten pro Nutzung',
      'pricing.maintenanceCosts': 'Wartungs-/Updatekosten (jährlich)',
      'pricing.expectedCases': 'Erwartete Fallzahl pro Jahr',
      'pricing.amortizationPeriod': 'Amortisierungszeitraum (Jahre)',
      
      // Pricing Strategy - System Overview Phase (Additional)
      'pricing.costInputs': 'Kosteneingaben',
      'pricing.years': 'Jahre',
      
      // Pricing Strategy - Complexity Phase
      'pricing.complexity.title': 'Komplexität',
      'pricing.complexity.subtitle': 'Mehrdimensionale Bewertung der Komplexität Ihres Systems',
      'pricing.complexity.benefitMeasurability': 'Messbarkeit des Nutzens',
      'pricing.complexity.benefit.high': 'Hoch',
      'pricing.complexity.benefit.highDesc': 'Nutzen ist klar messbar und quantifizierbar',
      'pricing.complexity.benefit.medium': 'Mittel',
      'pricing.complexity.benefit.mediumDesc': 'Nutzen ist teilweise messbar, erfordert aber Annahmen',
      'pricing.complexity.benefit.low': 'Niedrig',
      'pricing.complexity.benefit.lowDesc': 'Nutzen ist schwer messbar oder nur qualitativ erfassbar',
      'pricing.complexity.aiInferenceCosts': 'AI-Inferenzkosten',
      'pricing.complexity.costs.low': 'Niedrig',
      'pricing.complexity.costs.lowDesc': 'Geringe laufende Kosten für AI-Verarbeitung',
      'pricing.complexity.costs.medium': 'Mittel',
      'pricing.complexity.costs.mediumDesc': 'Moderate laufende Kosten',
      'pricing.complexity.costs.high': 'Hoch',
      'pricing.complexity.costs.highDesc': 'Hohe laufende Kosten für AI-Verarbeitung',
      'pricing.complexity.evaluation': 'Komplexitätsbewertung',
      'pricing.complexity.evaluationMethod': 'Wie möchten Sie die Komplexität bewerten?',
      'pricing.complexity.detailed': 'Detaillierte Bewertung',
      'pricing.complexity.detailedDesc': 'Alle 20 Kriterien einzeln bewerten (wie in der AI-Score Berechnung)',
      'pricing.complexity.direct': 'Direkte Score-Eingabe',
      'pricing.complexity.directDesc': 'AI-Score direkt eingeben (z.B. aus vorheriger Berechnung)',
      'pricing.complexity.aiScore': 'AI-Score (20-100)',
      'pricing.complexity.aiScoreTooltip': 'Geben Sie den bereits berechneten AI-Score ein',
      'pricing.complexity.aiScoreError': 'Bitte geben Sie einen gültigen Score zwischen 20 und 100 ein',
      'pricing.complexity.score': 'Komplexitäts-Score',
      'pricing.complexity.scoreSubtitle': 'Gesamtbewertung der Komplexität',
      'pricing.complexity.evaluationDescription': 'Bewerten Sie die folgenden Aspekte auf einer Skala von 1 (niedrig) bis 5 (hoch):',
      'pricing.complexity.level.low': 'Niedrig',
      'pricing.complexity.level.medium': 'Mittel',
      'pricing.complexity.level.high': 'Hoch',
      'pricing.complexity.level.veryHigh': 'Sehr hoch',
      
      // Deployment Type
      'pricing.deploymentType': 'Bereitstellungsart',
      'pricing.deployment.cloud': 'Cloud-Service',
      'pricing.deployment.cloudDesc': 'Software-as-a-Service, kontinuierliche Cloud-Kosten',
      'pricing.deployment.onPremises': 'On-Premises',
      'pricing.deployment.onPremisesDesc': 'Vor-Ort Installation, hohe Initialkosten',
      
      // Sales Channel
      'pricing.salesChannel': 'Vertriebskanal',
      'pricing.sales.direct': 'Direktvertrieb',
      'pricing.sales.directDesc': 'Verkauf direkt an Endkunden',
      'pricing.sales.partner': 'Partner/Distributor',
      'pricing.sales.partnerDesc': 'Verkauf über Partner, Provision erforderlich',
      
      // Partner Commission
      'pricing.partnerCommission': 'Partnerprovision',
      'pricing.partnerCommissionTooltip': 'Prozentsatz des Umsatzes, der als Provision an den Partner geht (Standard: ~20%)',
      
      // Deployment Hints
      'pricing.deploymentHints.title': 'Hinweise zur Bereitstellungsart',
      'pricing.deploymentHints.cloud': 'Hinweis: Laufender Cloud-Betrieb verursacht pro Nutzung Kosten – ein nutzungsabhängiger Preis ist daher oft angebracht.',
      'pricing.deploymentHints.onPremises': 'Hinweis: Vor-Ort-Installation bedeutet hohen Initialaufwand – häufig wird eine Einrichtungsgebühr oder hohe Startzahlung vereinbart.',
      'pricing.deploymentHints.partner': 'Hinweis: Bei Vertrieb über Partner sollten Sie die Marge des Partners in Ihrem Preis berücksichtigen (z.B. 20% Aufschlag einplanen).',
      
      // Profit Margin
      'pricing.profitMargin': 'Gewinnmarge',
      'pricing.profitMarginTooltip': 'Gewünschte Gewinnmarge auf die Selbstkosten',
      
      // Model Recommendation
      'pricing.modelRecommendation.title': 'Modell-Empfehlung',
      'pricing.modelRecommendation.subtitle': 'Basierend auf Ihren Eingaben',
      'pricing.modelRecommendation.cloud': 'Bei Ihrer Cloud-Konstellation bietet sich ein nutzungsabhängiges Modell an.',
      'pricing.modelRecommendation.onPremises': 'Bei On-Premises-Installation empfehlen wir eine jährliche Lizenz oder hohe Einmalzahlung.',
      'pricing.modelRecommendation.dacs': 'Aufgrund der hohen Komplexitätsschwankungen empfehlen wir das DACS-Modell für eine faire Preisverteilung.',
      'pricing.modelRecommendation.partner': 'Beachten Sie bei Partnervertrieb die erforderliche Provision in Ihrem Preis.',
      
      // Series Simulation
      'series.noSimulations': 'Noch keine Seriensimulationen durchgeführt oder vorhanden.',
      'series.title': 'Seriensimulation',
      'series.description': 'Führen Sie Parameter-Variationen durch, um optimale Pricing-Strategien zu finden.',
      'series.startSimulation': 'Simulation starten',
      'series.parameterVariation': 'Parameter-Variation',
      'series.results': 'Simulationsergebnisse',
      'series.originalValue': 'Ursprünglicher Wert',
      'series.scenarioType': 'Szenario-Typ',
      'series.scenarioValue': 'Szenario-Wert',
      'series.totalScore': 'Gesamtpunktzahl',
      'series.score': 'Score',
      'series.originalValues': 'Ursprüngliche Werte',
      
      // Series Parameter Options
      'series.numberOfUsers': 'Anzahl Nutzer',
      'series.numberOfRequests': 'Anzahl Anfragen pro Monat',
      'series.aiScore': 'KI-Score',
      'series.pricePerUser': 'Monatlicher Preis pro Nutzer (€)',
      'series.pricePerRequest': 'Preis pro Anfrage (€)',
      'series.aiScoreReferencePrice': 'KI Score Referenzpreis (€)',
      
      // Simulation Parameters (erweiterte Übersetzungen)
      'simulation.seriesSettings': 'Einstellungen für Seriensimulation',
      'simulation.varyingParameter': 'Variierender Parameter',
      'simulation.values': 'Werte (kommagetrennt, z.B. 10,50,100)',
      
      // Simulation History
      'simulationHistory.title': 'Simulationsverlauf',
      'simulationHistory.id': 'ID',
      'simulationHistory.timestamp': 'Zeitstempel',
      'simulationHistory.description': 'Beschreibung',
      'simulationHistory.inputs': 'Eingaben (Nutzer/Anfragen/Score)',
      'simulationHistory.annualRentCosts': 'Jahreskosten Miete',
      'simulationHistory.annualVolumeCosts': 'Jahreskosten Volumen',
      'simulationHistory.annualAIScoreCosts': 'Jahreskosten KI-Score',
      'simulationHistory.mySimulation': 'Meine Simulation',
      'simulationHistory.noSimulations': 'Noch keine Simulationen durchgeführt oder vorhanden.',
      
      // Cost Inputs Tooltips
      'pricing.developmentCostsTooltip': 'Einmalige Entwicklungskosten für das System',
      'pricing.costPerUsageTooltip': 'Kosten pro Nutzung des Systems',
      'pricing.maintenanceCostsTooltip': 'Jährliche Wartungs- und Updatekosten',
      'pricing.expectedCasesTooltip': 'Erwartete Anzahl der Fälle pro Jahr',
      'pricing.amortizationPeriodTooltip': 'Zeitraum für die Amortisation der Entwicklungskosten',
      
      // Cost Inputs Error Messages
      'pricing.developmentCostsError': 'Bitte geben Sie die Entwicklungskosten ein',
      'pricing.costPerUsageError': 'Bitte geben Sie die Kosten pro Nutzung ein',
      'pricing.maintenanceCostsError': 'Bitte geben Sie die Wartungskosten ein',
      'pricing.expectedCasesError': 'Bitte geben Sie die erwartete Fallzahl ein',
      'pricing.amortizationPeriodError': 'Bitte geben Sie den Amortisierungszeitraum ein',
      
      // Common
      'common.currency': '€',
      
      // Pricing Strategy - Cost Calculation
      'pricing.costCalculation': 'Kostenberechnung',
      'pricing.costPerCase': 'Selbstkosten pro Fall',
      'pricing.calculatedCostPerCase': 'Berechnete Selbstkosten pro Fall',
      'pricing.amortizedDevelopmentCosts': 'Amortisierte Entwicklungskosten',
      'pricing.maintenanceCostsPerCase': 'Wartungskosten pro Fall',
      
      // Properties - Score Labels (Flat Keys for Pricing Strategy)
      'properties.dataSourceDiversity.scoreLabels.1': 'Nur ein Datentyp (z.B. Labordaten).',
      'properties.dataSourceDiversity.scoreLabels.2': 'Unterdurchschnittlich',
      'properties.dataSourceDiversity.scoreLabels.3': 'Durchschnittlich',
      'properties.dataSourceDiversity.scoreLabels.4': 'Überdurchschnittlich',
      'properties.dataSourceDiversity.scoreLabels.5': 'Fünf oder mehr Datentypen (z.B. Bild-, Text-, und Genomdaten).',
      
      'properties.dataIntegrity.scoreLabels.1': 'Nur ein Teil der Eingangsdaten kann verarbeitet werden.',
      'properties.dataIntegrity.scoreLabels.2': 'Unterdurchschnittlich',
      'properties.dataIntegrity.scoreLabels.3': 'Durchschnittlich',
      'properties.dataIntegrity.scoreLabels.4': 'Überdurchschnittlich',
      'properties.dataIntegrity.scoreLabels.5': 'Daten sind nahezu vollständig und konsistent verarbeitbar.',
      
      'properties.dataComplexityLevel.scoreLabels.1': 'Strukturiert, leicht interpretierbar (z.B. numerische Labordaten).',
      'properties.dataComplexityLevel.scoreLabels.2': 'Unterdurchschnittlich',
      'properties.dataComplexityLevel.scoreLabels.3': 'Durchschnittlich',
      'properties.dataComplexityLevel.scoreLabels.4': 'Überdurchschnittlich',
      'properties.dataComplexityLevel.scoreLabels.5': 'Unstrukturierte oder hochkomplexe Daten (z.B. freier Text oder verrauschte Daten).',
      
      'properties.dataLinking.scoreLabels.1': 'Keine Verknüpfung unterschiedlicher Quellen.',
      'properties.dataLinking.scoreLabels.2': 'Unterdurchschnittlich',
      'properties.dataLinking.scoreLabels.3': 'Durchschnittlich',
      'properties.dataLinking.scoreLabels.4': 'Überdurchschnittlich',
      'properties.dataLinking.scoreLabels.5': 'Vollständig integrierte Analyse aus mehreren Quellen.',
      
      'properties.dataVolume.scoreLabels.1': 'Gering (z.B. ein einzelner Parameter).',
      'properties.dataVolume.scoreLabels.2': 'Unterdurchschnittlich',
      'properties.dataVolume.scoreLabels.3': 'Durchschnittlich',
      'properties.dataVolume.scoreLabels.4': 'Überdurchschnittlich',
      'properties.dataVolume.scoreLabels.5': 'Sehr groß (z.B. Millionen von Parametern pro Patient).',
      
      // Price Simulation
      'simulation.title': 'Preissimulation',
      'simulation.parameters': 'Simulationsparameter',
      'simulation.seriesSimulation': 'Seriensimulation durchführen?',
      'simulation.numberOfUsers': 'Anzahl Nutzer',
      'simulation.requestsPerMonth': 'Anzahl Anfragen pro Monat',
      'simulation.aiScore': 'KI-Score (0-100)',
      'simulation.monthlyPricePerUser': 'Monatlicher Preis pro Nutzer (€)',
      'simulation.pricePerRequest': 'Preis pro Anfrage (€)',
      'simulation.aiScoreReferencePrice': 'KI Score Referenzpreis (€)',
      'simulation.description': 'Beschreibung (Optional)',
      'simulation.models': 'Modelle zur Berechnung auswählen',
      'simulation.monthlyRent': 'Monatliche Miete',
      'simulation.volumeBased': 'Volumenbasiert',
      'simulation.aiScoreBased': 'KI-Score-basiert',
      'simulation.startSimulation': 'Simulation starten',
      'simulation.numberOfUsersRequired': 'Anzahl Nutzer ist erforderlich',
      'simulation.numberOfUsersMin': 'Mindestens 1 Nutzer erforderlich',
      'simulation.numberOfRequestsRequired': 'Anzahl Anfragen ist erforderlich',
      'simulation.numberOfRequestsMin': 'Mindestens 0 Anfragen erforderlich',
      'simulation.aiScoreRequired': 'KI-Score ist erforderlich',
      'simulation.aiScoreRange': 'Score muss zwischen 0 und 100 liegen',
      'simulation.pricePerUserRequired': 'Preis pro Nutzer ist erforderlich',
      'simulation.pricePerRequestRequired': 'Preis pro Anfrage ist erforderlich',
      'simulation.aiScoreReferencePriceRequired': 'Referenzpreis ist erforderlich',
      'simulation.priceNonNegative': 'Preis darf nicht negativ sein',
      
      // Pricing Strategy - Market & Competition Phase
      'pricing.market.title': 'Markt & Wettbewerb',
      'pricing.market.subtitle': 'Analyse des Marktumfelds und Wettbewerbspositionierung',
      'pricing.market.competitors': 'Wettbewerber',
      'pricing.market.addCompetitor': 'Wettbewerber hinzufügen',
      'pricing.market.competitorName': 'Name des Wettbewerbers',
      'pricing.market.competitorPrice': 'Preis pro Fall (€)',
      'pricing.market.competitorDescription': 'Beschreibung (optional)',
      'pricing.market.marketStats': 'Marktstatistiken',
      'pricing.market.marketStatsSubtitle': 'Berechnete Kennzahlen aus den Wettbewerberdaten',
      'pricing.market.minPrice': 'Minimalpreis',
      'pricing.market.maxPrice': 'Maximalpreis',
      'pricing.market.avgPrice': 'Durchschnittspreis',
      'pricing.market.alternativeMethod': 'Kosten der bisherigen Methode pro Fall (optional)',
      'pricing.market.alternativeMethodTooltip': 'Falls kein direkter Wettbewerber vorhanden ist, können Sie hier die Kosten der manuellen/konventionellen Methode eingeben',
      'pricing.market.marketComparison': 'Marktvergleich',
      'pricing.market.marketComparisonSubtitle': 'Ihr Preis im Vergleich zum Markt',
      'pricing.market.yourCosts': 'Ihre Selbstkosten pro Fall',
      'pricing.market.marketPrices': 'Marktpreise',
      'pricing.market.marketAverage': 'Marktdurchschnitt',
      'pricing.market.conventionalMethod': 'Konventionelle Methode',
      'pricing.market.warningAboveMax': 'Achtung: Ihr Preis liegt über dem höchsten Marktpreis um',
      'pricing.market.warningAboveMaxEnd': '%. Stellen Sie sicher, dass der Mehrwert dies rechtfertigt.',
      'pricing.market.infoBelowMin': 'Ihr Preis liegt unter dem günstigsten Wettbewerber. Dies kann eine aggressiv niedrige Strategie sein – prüfen Sie, ob alle Kosten gedeckt sind.',
      'pricing.market.successInRange': 'Ihr Preis liegt im Marktband. Sie positionieren sich',
      'pricing.market.successUpper': 'im oberen',
      'pricing.market.successLower': 'im unteren',
      'pricing.market.successEnd': 'Drittel des Marktsegments.',
      
      // Pricing Strategy - Implementation Phase
      'pricing.implementation.title': 'Implementierung & Vertrieb',
      'pricing.implementation.subtitle': 'Berücksichtigung von Implementierung und Vertriebsweg',
      'pricing.implementation.salesComplexity': 'Vertriebskomplexität',
      'pricing.implementation.salesComplexity.low': 'Niedrig',
      'pricing.implementation.salesComplexity.lowDesc': 'Direkter Verkauf, einfache Implementierung',
      'pricing.implementation.salesComplexity.medium': 'Mittel',
      'pricing.implementation.salesComplexity.mediumDesc': 'Vertriebspartner, moderate Implementierung',
      'pricing.implementation.salesComplexity.high': 'Hoch',
      'pricing.implementation.salesComplexity.highDesc': 'Komplexe Vertriebsstruktur, aufwendige Implementierung',
      'pricing.implementation.implementationComplexity': 'Implementierungskomplexität',
      'pricing.implementation.implementationComplexity.low': 'Einfach',
      'pricing.implementation.implementationComplexity.lowDesc': 'Plug-and-Play, minimaler Aufwand',
      'pricing.implementation.implementationComplexity.medium': 'Mittel',
      'pricing.implementation.implementationComplexity.mediumDesc': 'Moderate Anpassungen erforderlich',
      'pricing.implementation.implementationComplexity.high': 'Komplex',
      'pricing.implementation.implementationComplexity.highDesc': 'Umfangreiche Integration und Anpassungen',
      'pricing.implementation.supportLevel': 'Support-Level',
      'pricing.implementation.supportLevel.basic': 'Basis',
      'pricing.implementation.supportLevel.basicDesc': 'Standard-Support, Dokumentation',
      'pricing.implementation.supportLevel.premium': 'Premium',
      'pricing.implementation.supportLevel.premiumDesc': 'Erweiterter Support, Schulungen',
      'pricing.implementation.supportLevel.enterprise': 'Enterprise',
      'pricing.implementation.supportLevel.enterpriseDesc': 'Vollumfänglicher Support, Dedicated Account Manager',
      
      // Pricing Strategy - Business Model Phase
      'pricing.businessModel.title': 'Geschäftsmodell',
      'pricing.businessModel.subtitle': 'Wahl des passenden Geschäftsmodells',
      'pricing.businessModel.pricingModel': 'Preismodell',
      'pricing.businessModel.pricingModel.fixed': 'Fester Preis',
      'pricing.businessModel.pricingModel.fixedDesc': 'Einmaliger Kaufpreis',
      'pricing.businessModel.pricingModel.subscription': 'Abonnement',
      'pricing.businessModel.pricingModel.subscriptionDesc': 'Monatliche/Jährliche Gebühr',
      'pricing.businessModel.pricingModel.usage': 'Nutzungsbasiert',
      'pricing.businessModel.pricingModel.usageDesc': 'Preis pro Nutzung',
      'pricing.businessModel.pricingModel.hybrid': 'Hybrid',
      'pricing.businessModel.pricingModel.hybridDesc': 'Kombination aus Abonnement und Nutzung',
      'pricing.businessModel.pricingModel.dacs': 'Komplexitätsabhängig (DACS)',
      'pricing.businessModel.pricingModel.dacsDesc': 'Preis abhängig von der Fallkomplexität',
      'pricing.businessModel.basePrice': 'Basispreis (für durchschnittliche Komplexität)',
      'pricing.businessModel.basePriceTooltip': 'Preis für einen Fall mit durchschnittlicher Komplexität (Score 3)',
      'pricing.businessModel.dacsPreview': 'DACS-Preisspanne',
      'pricing.businessModel.dacsPreviewSubtitle': 'Basierend auf Ihrem Komplexitäts-Score von',
      'pricing.businessModel.simpleCases': 'Einfache Fälle (Score 1-2)',
      'pricing.businessModel.mediumCases': 'Mittlere Fälle (Score 3-4)',
      'pricing.businessModel.complexCases': 'Komplexe Fälle (Score 5)',
      
      // Pricing Strategy - Results Phase
      'pricing.results.title': 'Ergebnisse',
      'pricing.results.subtitle': 'Zusammenfassung und Empfehlungen',
      'pricing.results.summary': 'Zusammenfassung',
      'pricing.results.recommendations': 'Empfehlungen',
      'pricing.results.export': 'Exportieren',
      'pricing.results.exportPDF': 'Als PDF exportieren',
      'pricing.results.exportJSON': 'Als JSON exportieren',
      
      // Score Output
      'output.title': 'Score-Detailansicht',
      'output.evaluationForId': 'Bewertung für ID',
      'output.totalScore': 'Gesamtscore',
      'output.score': 'Score',
      'output.noDataFound': 'Keine Bewertungsdaten gefunden',
      'output.noDataMessage': 'Erstellen Sie eine neue Bewertung über die Dateneingabe oder wählen Sie eine vorhandene Bewertung aus der Score-Verwaltung.',
      'output.loadingData': 'Lade Bewertungsdaten...',
      
      // Wettbewerberdaten (Competitor Data)
      'competitor.title': 'Wettbewerberdaten',
      'competitor.subtitle': 'Fügen Sie Informationen zu Ihren Wettbewerbern hinzu:',
      'competitor.addCompetitor': '+ Wettbewerber hinzufügen',
      'competitor.name': 'Name des Wettbewerbers',
      'competitor.pricePerCase': 'Preis pro Fall',
      'competitor.specialFeatures': 'Besonderheiten (optional)',
      'competitor.delete': 'Löschen',
      
      // Markt & Wettbewerb - Zusätzliche Felder
      'pricing.sector': 'Primärer Zielsektor',
      'pricing.sector.public': 'Öffentlich',
      'pricing.sector.publicDesc': 'Krankenhäuser, Universitätskliniken, öffentliche Einrichtungen',
      'pricing.sector.private': 'Privat',
      'pricing.sector.privateDesc': 'Private Praxen, Privatkliniken, kommerzielle Einrichtungen',
      'pricing.sector.hybrid': 'Hybrid',
      'pricing.sector.hybridDesc': 'Gemischte Kundenstruktur',
      'pricing.reimbursement': 'Erstattungsintegration möglich?',
      'pricing.reimbursement.yes': 'Ja',
      'pricing.reimbursement.yesDesc': 'Integration in GOÄ/EBM möglich',
      'pricing.reimbursement.no': 'Nein',
      'pricing.reimbursement.noDesc': 'Keine direkte Erstattung möglich',
      'pricing.competition': 'Wettbewerbsintensität',
      'pricing.competition.low': 'Niedrig',
      'pricing.competition.lowDesc': 'Wenige direkte Konkurrenten',
      'pricing.competition.medium': 'Mittel',
      'pricing.competition.mediumDesc': 'Moderate Konkurrenz',
      'pricing.competition.high': 'Hoch',
      'pricing.competition.highDesc': 'Starke Konkurrenz, etablierte Anbieter',
      
      // Datenkomplexität - Erweiterte Score-Labels
      'input.scoreLabels.extended': {
        '1': '1 - Nur ein Datentyp (z.B. Labordaten).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Sehr vielfältig (z.B. multimodale Daten).'
      },
      'input.dataIntegrityLabels': {
        '1': '1 - Nur ein Teil der Eingangsdaten kann verarbeitet werden.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Daten sind nahezu vollständig und konsistent verarbeitbar.'
      },
      'input.dataComplexityLabels': {
        '1': '1 - Strukturiert, leicht interpretierbar (z.B. numerische Labordaten).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Unstrukturierte oder hochkomplexe Daten (z.B. freier Text oder verrauschte Daten).'
      },
      'input.dataLinkingLabels': {
        '1': '1 - Keine Verknüpfung unterschiedlicher Quellen.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Vollständig integrierte Analyse aus mehreren Quellen.'
      },
      
      // Score Properties - Kriterien-spezifische Beschreibungen
      'properties.realtimeRequirement.description': 'Erwartung an die Geschwindigkeit des Systems.',
      'properties.realtimeRequirement.scoreLabels': {
        '1': 'Nächtliche Batch Prozessierung ausreichend.',
        '2': 'Unterdurchschnittlich',
        '3': 'Durchschnittlich',
        '4': 'Überdurchschnittlich',
        '5': 'Sofortige Antwort erwartet.'
      },
      
      // Datenkomplexität Score-Labels
      'properties.dataSourceDiversity.scoreLabels': {
        '1': '1 - Nur ein Datentyp (z.B. Labordaten).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Fünf oder mehr Datentypen (z.B. Bild-, Text-, und Genomdaten).'
      },
      'properties.dataIntegrity.scoreLabels': {
        '1': '1 - Nur ein Teil der Eingangsdaten kann verarbeitet werden.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Daten sind nahezu vollständig und konsistent verarbeitbar.'
      },
      'properties.dataComplexity.scoreLabels': {
        '1': '1 - Strukturiert, leicht interpretierbar (z.B. numerische Labordaten).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Unstrukturierte oder hochkomplexe Daten (z.B. freier Text oder verrauschte Daten).'
      },
      'properties.dataLinking.scoreLabels': {
        '1': '1 - Keine Verknüpfung unterschiedlicher Quellen.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Vollständig integrierte Analyse aus mehreren Quellen.'
      },
      'properties.dataVolume.scoreLabels': {
        '1': '1 - Gering (z.B. ein einzelner Parameter).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Sehr groß (z.B. Millionen von Parametern pro Patient).'
      },
      
      // Krankheitskomplexität Score-Labels
      'properties.diseaseRarity.scoreLabels': {
        '1': '1 - Häufig (z.B. Anämie).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Sehr selten (z.B. Morbus Gaucher).'
      },
      'properties.diagnosticAmbiguity.scoreLabels': {
        '1': '1 - Einfach abzugrenzen (z.B. Grippe).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Hochgradig mehrdeutig (z.B. systemischer Lupus erythematodes).'
      },
      'properties.prognosticUncertainty.scoreLabels': {
        '1': '1 - Gut vorhersagbar (z.B. unkomplizierte bakterielle Infektion).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Unvorhersehbar und individuell unterschiedlich (z.B. aggressive Krebsarten).'
      },
      'properties.multimorbidity.scoreLabels': {
        '1': '1 - Kaum beeinflusst durch Komorbiditäten.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Stark beeinflusst durch zahlreiche Komorbiditäten.'
      },
      'properties.diseaseSeverity.scoreLabels': {
        '1': '1 - Geringe Lethalität und wenig Einfluss auf Patienten.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Hohe Letalität wie z.B. Krebs.'
      },
      
      // Fragestellungs-Schwierigkeit Score-Labels
      'properties.differentialDiagnosticDepth.scoreLabels': {
        '1': '1 - Wenige Differenzialdiagnosen (< 3).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Viele Differenzialdiagnosen (> 10).'
      },
      'properties.prognosticPrecision.scoreLabels': {
        '1': '1 - Nur kurzfristige Trends (z.B. einfache Risikoabschätzung).',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Hochpräzise, langfristige Vorhersagen (z.B. Krankheitsprogression).'
      },
      'properties.interdisciplinaryRelevance.scoreLabels': {
        '1': '1 - Nur ein Fachbereich.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Mehrere Fachbereiche (> 3).'
      },
      'properties.dynamicAdaptability.scoreLabels': {
        '1': '1 - Keine Anpassung an dynamische Parameter.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Echtzeit-Anpassung an klinische Änderungen.'
      },
      
      // KI-Unterstützung Score-Labels
      'properties.automationLevel.scoreLabels': {
        '1': '1 - Nur unterstützend, keine eigenständigen Analysen.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Vollautomatisierte Analysen und Entscheidungen.'
      },
      'properties.analysisLevel.scoreLabels': {
        '1': '1 - Einfacher Vorschlag.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Hochdimensionale, integrative Analysen.'
      },
      'properties.recommendationComplexity.scoreLabels': {
        '1': '1 - Einfache, generische Vorschläge.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Detaillierte, umsetzungsfähige Handlungspläne.'
      },
      'properties.guidelineIntegration.scoreLabels': {
        '1': '1 - Keine Berücksichtigung von Leitlinien.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Vollständige Integration aktueller Leitlinien.'
      },
      'properties.patientSpecificIndividualization.scoreLabels': {
        '1': '1 - Keine Individualisierung.',
        '2': '2 - Unterdurchschnittlich',
        '3': '3 - Durchschnittlich',
        '4': '4 - Überdurchschnittlich',
        '5': '5 - Höchstgradig patientenspezifische Analysen.'
      }
    },
    en: {
      // App
      'app.title': 'Pricing Simulator',
      
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
      'common.back': 'Back',
      
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
      'properties.placeholder': 'Enter a meaningful label for this score value',
      'properties.hint': 'This label will be displayed in the evaluation',
      'properties.resetDefaults': 'Reset to Defaults',
      'properties.save': 'Save',
      'properties.selectDimension': 'Please select a dimension from the list on the left.',
      'properties.selectCriterion': 'Please select a criterion from the list.',
      'properties.backToDimensions': 'Back to Dimensions',
      'properties.backToCriteria': 'Back to Criteria',
      
      // Dimension Names
      'dimensions.dataComplexity': 'Data Complexity and Diversity',
      'dimensions.diseaseComplexity': 'Disease Complexity',
      'dimensions.questionDifficulty': 'Question Complexity Level',
      'dimensions.aiSupportExtent': 'Extent of AI Support',
      
      // Criterion Names
      'criteria.sourceVariety': 'Data Source Diversity',
      'criteria.sourceVarietyDesc': 'Number of data types used',
      'criteria.dataIntegrity': 'Data Integrity',
      'criteria.dataIntegrityDesc': 'Degree of completeness and consistency of processable input data',
      'criteria.dataComplexityLevel': 'Data Complexity',
      'criteria.dataComplexityLevelDesc': 'Difficulty level in interpreting the data',
      'criteria.dataLinking': 'Data Linkage',
      'criteria.dataLinkingDesc': 'Ability to combine multiple data sources in an analysis',
      'criteria.dataVolume': 'Data Volume',
      'criteria.dataVolumeDesc': 'Amount of data per analysis',
      'criteria.diseaseRarity': 'Disease Rarity',
      'criteria.diagnosticAmbiguity': 'Diagnostic Ambiguity',
      'criteria.prognosticUncertainty': 'Prognostic Uncertainty',
      'criteria.multimorbidity': 'Multimorbidity',
      'criteria.diseaseSeverity': 'Disease Severity',
      'criteria.differentialDepth': 'Differential Diagnostic Depth',
      'criteria.prognosticPrecision': 'Prognostic Precision',
      'criteria.realtimeRequirement': 'Real-time Requirement',
      'criteria.interdisciplinaryRelevance': 'Interdisciplinary Relevance',
      'criteria.dynamicAdaptability': 'Dynamic Adaptability',
      'criteria.automationLevel': 'Automation Level',
      'criteria.analysisLevel': 'Analysis Level',
      'criteria.recommendationComplexity': 'Recommendation Complexity',
      'criteria.guidelineIntegration': 'Guideline Integration',
      'criteria.patientIndividualization': 'Patient-Specific Individualization',
      
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
      'pricing.unknownError': 'Unknown error',
      
      // Pricing Strategy Content
      'pricing.subtitle': 'Develop and manage your pricing strategies for DDSS efficiently',
      'pricing.systemOverview.title': 'System Overview',
      'pricing.systemOverview.subtitle': 'Basic information about your DDSS system and cost inputs',
      'pricing.systemName': 'Name of the DDSS System',
      'pricing.systemNameError': 'Please enter a name',
      'pricing.autonomyLevel': 'System Autonomy Level',
      'pricing.autonomy.assistive': 'Assistive (Score 1-2)',
      'pricing.autonomy.assistiveDesc': 'Supports physicians in decision-making, makes no autonomous decisions',
      'pricing.autonomy.augmentative': 'Augmentative (Score 3-4)',
      'pricing.autonomy.augmentativeDesc': 'Extends physician capabilities, can make partially autonomous decisions',
      'pricing.autonomy.autonomous': 'Autonomous (Score 5)',
      'pricing.autonomy.autonomousDesc': 'Can make fully autonomous medical decisions',
      'pricing.developmentCosts': 'Development Costs (one-time)',
      'pricing.costPerUsage': 'Cost per Usage',
      'pricing.maintenanceCosts': 'Maintenance/Update Costs (annually)',
      'pricing.expectedCases': 'Expected Cases per Year',
      'pricing.amortizationPeriod': 'Amortization Period (Years)',
      
      // Pricing Strategy - System Overview Phase (Additional)
      'pricing.costInputs': 'Cost Inputs',
      'pricing.years': 'Years',
      
      // Pricing Strategy - Complexity Phase
      'pricing.complexity.title': 'Complexity',
      'pricing.complexity.subtitle': 'Multidimensional evaluation of your system complexity',
      'pricing.complexity.benefitMeasurability': 'Benefit Measurability',
      'pricing.complexity.benefit.high': 'Highly Measurable',
      'pricing.complexity.benefit.highDesc': 'Benefit can be clearly measured in Euro, time or quality',
      'pricing.complexity.benefit.medium': 'Moderately Measurable',
      'pricing.complexity.benefit.mediumDesc': 'Partially measurable, but with uncertainties',
      'pricing.complexity.benefit.low': 'Hard to Measure',
      'pricing.complexity.benefit.lowDesc': 'Benefit is qualitative, hard to quantify',
      'pricing.complexity.aiInferenceCosts': 'AI Inference Costs',
      'pricing.complexity.costs.low': 'Low',
      'pricing.complexity.costs.lowDesc': 'Low running costs for AI processing',
      'pricing.complexity.costs.medium': 'Medium',
      'pricing.complexity.costs.mediumDesc': 'Moderate running costs',
      'pricing.complexity.costs.high': 'High',
      'pricing.complexity.costs.highDesc': 'High running costs for AI processing',
      'pricing.complexity.evaluation': 'Complexity Evaluation',
      'pricing.complexity.evaluationMethod': 'How would you like to evaluate the complexity?',
      'pricing.complexity.detailed': 'Detailed Evaluation',
      'pricing.complexity.detailedDesc': 'Evaluate all 20 criteria individually (as in AI-Score calculation)',
      'pricing.complexity.direct': 'Direct Score Input',
      'pricing.complexity.directDesc': 'Enter AI-Score directly (e.g., from previous calculation)',
      'pricing.complexity.aiScore': 'AI-Score (20-100)',
      'pricing.complexity.aiScoreTooltip': 'Enter the already calculated AI-Score',
      'pricing.complexity.aiScoreError': 'Please enter a valid score between 20 and 100',
      'pricing.complexity.score': 'Complexity Score',
      'pricing.complexity.scoreSubtitle': 'Overall complexity assessment',
      'pricing.complexity.evaluationDescription': 'Rate the following aspects on a scale from 1 (low) to 5 (high):',
      'pricing.complexity.level.low': 'Low',
      'pricing.complexity.level.medium': 'Medium',
      'pricing.complexity.level.high': 'High',
      'pricing.complexity.level.veryHigh': 'Very High',
      
      // Deployment Type
      'pricing.deploymentType': 'Deployment Type',
      'pricing.deployment.cloud': 'Cloud Service',
      'pricing.deployment.cloudDesc': 'Software-as-a-Service, continuous cloud costs',
      'pricing.deployment.onPremises': 'On-Premises',
      'pricing.deployment.onPremisesDesc': 'On-site installation, high initial costs',
      
      // Sales Channel
      'pricing.salesChannel': 'Sales Channel',
      'pricing.sales.direct': 'Direct Sales',
      'pricing.sales.directDesc': 'Direct sales to end customers',
      'pricing.sales.partner': 'Partner/Distributor',
      'pricing.sales.partnerDesc': 'Sales via partners, commission required',
      
      // Partner Commission
      'pricing.partnerCommission': 'Partner Commission',
      'pricing.partnerCommissionTooltip': 'Percentage of revenue that goes to the partner as commission (Standard: ~20%)',
      
      // Deployment Hints
      'pricing.deploymentHints.title': 'Deployment Type Notes',
      'pricing.deploymentHints.cloud': 'Note: Ongoing cloud operation incurs costs per usage - a usage-dependent price is therefore often appropriate.',
      'pricing.deploymentHints.onPremises': 'Note: On-site installation means high initial effort - often a setup fee or high initial payment is agreed upon.',
      'pricing.deploymentHints.partner': 'Note: When selling through partners, you should consider the partner\'s margin in your price (e.g., plan for a 20% markup).',
      
      // Profit Margin
      'pricing.profitMargin': 'Profit Margin',
      'pricing.profitMarginTooltip': 'Desired profit margin on cost of goods sold',
      
      // Model Recommendation
      'pricing.modelRecommendation.title': 'Model Recommendation',
      'pricing.modelRecommendation.subtitle': 'Based on your inputs',
      'pricing.modelRecommendation.cloud': 'For your cloud setup, a usage-based model is recommended.',
      'pricing.modelRecommendation.onPremises': 'For on-premises installation, we recommend an annual license or high one-time payment.',
      'pricing.modelRecommendation.dacs': 'Due to high complexity fluctuations, we recommend the DACS model for fair price distribution.',
      'pricing.modelRecommendation.partner': 'Please note the required commission in your price for partner sales.',
      
      // Series Simulation
      'series.noSimulations': 'No series simulations performed or available yet.',
      'series.title': 'Series Simulation',
      'series.description': 'Perform parameter variations to find optimal pricing strategies.',
      'series.startSimulation': 'Start Simulation',
      'series.parameterVariation': 'Parameter Variation',
      'series.results': 'Simulation Results',
      'series.originalValue': 'Original Value',
      'series.scenarioType': 'Scenario Type',
      'series.scenarioValue': 'Scenario Value',
      'series.totalScore': 'Total Score',
      'series.score': 'Score',
      'series.originalValues': 'Original Values',
      
      // Series Parameter Options
      'series.numberOfUsers': 'Number of Users',
      'series.numberOfRequests': 'Number of Requests per Month',
      'series.aiScore': 'AI-Score',
      'series.pricePerUser': 'Monthly Price per User (€)',
      'series.pricePerRequest': 'Price per Request (€)',
      'series.aiScoreReferencePrice': 'AI Score Reference Price (€)',
      
      // Price Simulation
      'simulation.title': 'Price Simulation',
      'simulation.parameters': 'Simulation Parameters',
      'simulation.seriesSimulation': 'Perform series simulation?',
      'simulation.numberOfUsers': 'Number of Users',
      'simulation.requestsPerMonth': 'Number of Requests per Month',
      'simulation.aiScore': 'AI-Score (0-100)',
      'simulation.monthlyPricePerUser': 'Monthly Price per User (€)',
      'simulation.pricePerRequest': 'Price per Request (€)',
      'simulation.aiScoreReferencePrice': 'AI Score Reference Price (€)',
      'simulation.description': 'Description (Optional)',
      'simulation.models': 'Select Models for Calculation',
      'simulation.monthlyRent': 'Monthly Rent',
      'simulation.volumeBased': 'Volume-based',
      'simulation.aiScoreBased': 'AI-Score-based',
      'simulation.startSimulation': 'Start Simulation',
      'simulation.numberOfUsersRequired': 'Number of users is required',
      'simulation.numberOfUsersMin': 'At least 1 user required',
      'simulation.numberOfRequestsRequired': 'Number of requests is required',
      'simulation.numberOfRequestsMin': 'At least 0 requests required',
      'simulation.aiScoreRequired': 'AI-Score is required',
      'simulation.aiScoreRange': 'Score must be between 0 and 100',
      'simulation.pricePerUserRequired': 'Price per user is required',
      'simulation.pricePerRequestRequired': 'Price per request is required',
      'simulation.aiScoreReferencePriceRequired': 'Reference price is required',
      'simulation.priceNonNegative': 'Price cannot be negative',
      
      // Pricing Strategy - Market & Competition Phase
      'pricing.market.title': 'Market & Competition',
      'pricing.market.subtitle': 'Analysis of market environment and competitive positioning',
      'pricing.market.competitors': 'Competitors',
      'pricing.market.addCompetitor': 'Add Competitor',
      'pricing.market.competitorName': 'Competitor Name',
      'pricing.market.competitorPrice': 'Price per Case (€)',
      'pricing.market.competitorDescription': 'Description (optional)',
      'pricing.market.marketStats': 'Market Statistics',
      'pricing.market.marketStatsSubtitle': 'Calculated metrics from competitor data',
      'pricing.market.minPrice': 'Minimum Price',
      'pricing.market.maxPrice': 'Maximum Price',
      'pricing.market.avgPrice': 'Average Price',
      'pricing.market.alternativeMethod': 'Costs of previous method per case (optional)',
      'pricing.market.alternativeMethodTooltip': 'If no direct competitor exists, you can enter the costs of the manual/conventional method here',
      'pricing.market.marketComparison': 'Market Comparison',
      'pricing.market.marketComparisonSubtitle': 'Your price compared to the market',
      'pricing.market.yourCosts': 'Your costs per case',
      'pricing.market.marketPrices': 'Market Prices',
      'pricing.market.marketAverage': 'Market Average',
      'pricing.market.conventionalMethod': 'Conventional Method',
      'pricing.market.warningAboveMax': 'Warning: Your price is above the highest market price by',
      'pricing.market.warningAboveMaxEnd': '%. Make sure the added value justifies this.',
      'pricing.market.infoBelowMin': 'Your price is below the cheapest competitor. This can be an aggressively low strategy – check if all costs are covered.',
      'pricing.market.successInRange': 'Your price is within the market range. You are positioning yourself in the',
      'pricing.market.successUpper': 'upper',
      'pricing.market.successLower': 'lower',
      'pricing.market.successEnd': 'third of the market segment.',
      
      // Pricing Strategy - Implementation Phase
      'pricing.implementation.title': 'Implementation & Sales',
      'pricing.implementation.subtitle': 'Consideration of implementation and sales channel',
      'pricing.implementation.salesComplexity': 'Sales Complexity',
      'pricing.implementation.salesComplexity.low': 'Low',
      'pricing.implementation.salesComplexity.lowDesc': 'Direct sales, simple implementation',
      'pricing.implementation.salesComplexity.medium': 'Medium',
      'pricing.implementation.salesComplexity.mediumDesc': 'Sales partners, moderate implementation',
      'pricing.implementation.salesComplexity.high': 'High',
      'pricing.implementation.salesComplexity.highDesc': 'Complex sales structure, extensive implementation',
      'pricing.implementation.implementationComplexity': 'Implementation Complexity',
      'pricing.implementation.implementationComplexity.low': 'Simple',
      'pricing.implementation.implementationComplexity.lowDesc': 'Plug-and-play, minimal effort',
      'pricing.implementation.implementationComplexity.medium': 'Medium',
      'pricing.implementation.implementationComplexity.mediumDesc': 'Moderate adjustments required',
      'pricing.implementation.implementationComplexity.high': 'Complex',
      'pricing.implementation.implementationComplexity.highDesc': 'Extensive integration and adjustments',
      'pricing.implementation.supportLevel': 'Support Level',
      'pricing.implementation.supportLevel.basic': 'Basic',
      'pricing.implementation.supportLevel.basicDesc': 'Standard support, documentation',
      'pricing.implementation.supportLevel.premium': 'Premium',
      'pricing.implementation.supportLevel.premiumDesc': 'Extended support, training',
      'pricing.implementation.supportLevel.enterprise': 'Enterprise',
      'pricing.implementation.supportLevel.enterpriseDesc': 'Comprehensive support, dedicated account manager',
      
      // Pricing Strategy - Business Model Phase
      'pricing.businessModel.title': 'Business Model',
      'pricing.businessModel.subtitle': 'Selection of the appropriate business model',
      'pricing.businessModel.pricingModel': 'Pricing Model',
      'pricing.businessModel.pricingModel.fixed': 'Fixed Price',
      'pricing.businessModel.pricingModel.fixedDesc': 'One-time purchase price',
      'pricing.businessModel.pricingModel.subscription': 'Subscription',
      'pricing.businessModel.pricingModel.subscriptionDesc': 'Monthly/Annual fee',
      'pricing.businessModel.pricingModel.usage': 'Usage-based',
      'pricing.businessModel.pricingModel.usageDesc': 'Price per usage',
      'pricing.businessModel.pricingModel.hybrid': 'Hybrid',
      'pricing.businessModel.pricingModel.hybridDesc': 'Combination of subscription and usage',
      'pricing.businessModel.pricingModel.dacs': 'Complexity-dependent (DACS)',
      'pricing.businessModel.pricingModel.dacsDesc': 'Price depending on case complexity',
      'pricing.businessModel.basePrice': 'Base price (for average complexity)',
      'pricing.businessModel.basePriceTooltip': 'Price for a case with average complexity (Score 3)',
      'pricing.businessModel.dacsPreview': 'DACS Price Range',
      'pricing.businessModel.dacsPreviewSubtitle': 'Based on your complexity score of',
      'pricing.businessModel.simpleCases': 'Simple Cases (Score 1-2)',
      'pricing.businessModel.mediumCases': 'Medium Cases (Score 3-4)',
      'pricing.businessModel.complexCases': 'Complex Cases (Score 5)',
      
      // Pricing Strategy - Results Phase
      'pricing.results.title': 'Results',
      'pricing.results.subtitle': 'Summary and recommendations',
      'pricing.results.summary': 'Summary',
      'pricing.results.recommendations': 'Recommendations',
      'pricing.results.export': 'Export',
      'pricing.results.exportPDF': 'Export as PDF',
      'pricing.results.exportJSON': 'Export as JSON',
      
      // Score Output
      'output.title': 'Score Detail View',
      'output.evaluationForId': 'Evaluation for ID',
      'output.totalScore': 'Total Score',
      'output.score': 'Score',
      'output.noDataFound': 'No evaluation data found',
      'output.noDataMessage': 'Create a new evaluation via data input or select an existing evaluation from score management.',
      'output.loadingData': 'Loading evaluation data...',
      
      // Wettbewerberdaten (Competitor Data)
      'competitor.title': 'Competitor Data',
      'competitor.subtitle': 'Add information about your competitors:',
      'competitor.addCompetitor': '+ Add Competitor',
      'competitor.name': 'Competitor Name',
      'competitor.pricePerCase': 'Price per Case',
      'competitor.specialFeatures': 'Special Features (optional)',
      'competitor.delete': 'Delete',
      
      // Markt & Wettbewerb - Zusätzliche Felder
      'pricing.sector': 'Primary Target Sector',
      'pricing.sector.public': 'Public',
      'pricing.sector.publicDesc': 'Hospitals, university clinics, public institutions',
      'pricing.sector.private': 'Private',
      'pricing.sector.privateDesc': 'Private practices, private clinics, commercial institutions',
      'pricing.sector.hybrid': 'Hybrid',
      'pricing.sector.hybridDesc': 'Mixed customer structure',
      'pricing.reimbursement': 'Reimbursement integration possible?',
      'pricing.reimbursement.yes': 'Yes',
      'pricing.reimbursement.yesDesc': 'Integration into GOÄ/EBM possible',
      'pricing.reimbursement.no': 'No',
      'pricing.reimbursement.noDesc': 'No direct reimbursement possible',
      'pricing.competition': 'Competitive Intensity',
      'pricing.competition.low': 'Low',
      'pricing.competition.lowDesc': 'Few direct competitors',
      'pricing.competition.medium': 'Medium',
      'pricing.competition.mediumDesc': 'Moderate competition',
      'pricing.competition.high': 'High',
      'pricing.competition.highDesc': 'Strong competition, established providers',
      
      // Datenkomplexität - Erweiterte Score-Labels
      'input.scoreLabels.extended': {
        '1': '1 - Only one data type (e.g., lab data).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Very diverse (e.g., multimodal data).'
      },
      'input.dataIntegrityLabels': {
        '1': '1 - Only part of the input data can be processed.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Data is almost completely and consistently processable.'
      },
      'input.dataComplexityLabels': {
        '1': '1 - Structured, easily interpretable (e.g., numerical lab data).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Unstructured or highly complex data (e.g., free text or noisy data).'
      },
      'input.dataLinkingLabels': {
        '1': '1 - No linking of different sources.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Fully integrated analysis from multiple sources.'
      },
      
      // Score Properties - Kriterien-spezifische Beschreibungen
      'properties.realtimeRequirement.description': 'Expectation of system speed.',
      'properties.realtimeRequirement.scoreLabels': {
        '1': 'Nightly batch processing sufficient.',
        '2': 'Below average',
        '3': 'Average',
        '4': 'Above average',
        '5': 'Immediate response expected.'
      },
      
      // Datenkomplexität Score-Labels
      'properties.dataSourceDiversity.scoreLabels': {
        '1': '1 - Only one data type (e.g., lab data).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Five or more data types (e.g., image, text, and genome data).'
      },
      'properties.dataIntegrity.scoreLabels': {
        '1': '1 - Only part of the input data can be processed.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Data is almost completely and consistently processable.'
      },
      'properties.dataComplexity.scoreLabels': {
        '1': '1 - Structured, easily interpretable (e.g., numerical lab data).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Unstructured or highly complex data (e.g., free text or noisy data).'
      },
      'properties.dataLinking.scoreLabels': {
        '1': '1 - No linking of different sources.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Fully integrated analysis from multiple sources.'
      },
      'properties.dataVolume.scoreLabels': {
        '1': '1 - Low (e.g., a single parameter).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Very large (e.g., millions of parameters per patient).'
      },
      
      // Krankheitskomplexität Score-Labels
      'properties.diseaseRarity.scoreLabels': {
        '1': '1 - Common (e.g., anemia).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Very rare (e.g., Gaucher disease).'
      },
      'properties.diagnosticAmbiguity.scoreLabels': {
        '1': '1 - Easy to distinguish (e.g., flu).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Highly ambiguous (e.g., systemic lupus erythematosus).'
      },
      'properties.prognosticUncertainty.scoreLabels': {
        '1': '1 - Well predictable (e.g., uncomplicated bacterial infection).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Unpredictable and individually different (e.g., aggressive cancers).'
      },
      'properties.multimorbidity.scoreLabels': {
        '1': '1 - Hardly influenced by comorbidities.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Strongly influenced by numerous comorbidities.'
      },
      'properties.diseaseSeverity.scoreLabels': {
        '1': '1 - Low lethality and little impact on patients.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - High lethality such as cancer.'
      },
      
      // Fragestellungs-Schwierigkeit Score-Labels
      'properties.differentialDiagnosticDepth.scoreLabels': {
        '1': '1 - Few differential diagnoses (< 3).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Many differential diagnoses (> 10).'
      },
      'properties.prognosticPrecision.scoreLabels': {
        '1': '1 - Only short-term trends (e.g., simple risk assessment).',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Highly precise, long-term predictions (e.g., disease progression).'
      },
      'properties.interdisciplinaryRelevance.scoreLabels': {
        '1': '1 - Only one specialty.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Multiple specialties (> 3).'
      },
      'properties.dynamicAdaptability.scoreLabels': {
        '1': '1 - No adaptation to dynamic parameters.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Real-time adaptation to clinical changes.'
      },
      
      // KI-Unterstützung Score-Labels
      'properties.automationLevel.scoreLabels': {
        '1': '1 - Only supportive, no independent analyses.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Fully automated analyses and decisions.'
      },
      'properties.analysisLevel.scoreLabels': {
        '1': '1 - Simple suggestion.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - High-dimensional, integrative analyses.'
      },
      'properties.recommendationComplexity.scoreLabels': {
        '1': '1 - Simple, generic suggestions.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Detailed, implementable action plans.'
      },
      'properties.guidelineIntegration.scoreLabels': {
        '1': '1 - No consideration of guidelines.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Complete integration of current guidelines.'
      },
      'properties.patientSpecificIndividualization.scoreLabels': {
        '1': '1 - No individualization.',
        '2': '2 - Below average',
        '3': '3 - Average',
        '4': '4 - Above average',
        '5': '5 - Highly patient-specific analyses.'
      },
      
      // Simulation Parameters (extended translations)
      'simulation.seriesSettings': 'Series Simulation Settings',
      'simulation.varyingParameter': 'Varying Parameter',
      'simulation.values': 'Values (comma-separated, e.g. 10,50,100)',
      
      // Simulation History
      'simulationHistory.title': 'Simulation History',
      'simulationHistory.id': 'ID',
      'simulationHistory.timestamp': 'Timestamp',
      'simulationHistory.description': 'Description',
      'simulationHistory.inputs': 'Inputs (Users/Requests/Score)',
      'simulationHistory.annualRentCosts': 'Annual Rental Costs',
      'simulationHistory.annualVolumeCosts': 'Annual Volume Costs',
      'simulationHistory.annualAIScoreCosts': 'Annual AI Score Costs',
      'simulationHistory.mySimulation': 'My Simulation',
      'simulationHistory.noSimulations': 'No simulations performed or available yet.',
      
      // Cost Inputs Tooltips
      'pricing.developmentCostsTooltip': 'One-time development costs for the system',
      'pricing.costPerUsageTooltip': 'Costs per usage of the system',
      'pricing.maintenanceCostsTooltip': 'Annual maintenance and update costs',
      'pricing.expectedCasesTooltip': 'Expected number of cases per year',
      'pricing.amortizationPeriodTooltip': 'Period for amortization of development costs',
      
      // Cost Inputs Error Messages
      'pricing.developmentCostsError': 'Please enter the development costs',
      'pricing.costPerUsageError': 'Please enter the cost per usage',
      'pricing.maintenanceCostsError': 'Please enter the maintenance costs',
      'pricing.expectedCasesError': 'Please enter the expected number of cases',
      'pricing.amortizationPeriodError': 'Please enter the amortization period',
      
      // Common
      'common.currency': '€',
      
      // Pricing Strategy - Cost Calculation
      'pricing.costCalculation': 'Cost Calculation',
      'pricing.costPerCase': 'Cost per Case',
      'pricing.calculatedCostPerCase': 'Calculated Cost per Case',
      'pricing.amortizedDevelopmentCosts': 'Amortized Development Costs',
      'pricing.maintenanceCostsPerCase': 'Maintenance Costs per Case',
      
      // Properties - Score Labels (Flat Keys for Pricing Strategy)
      'properties.dataSourceDiversity.scoreLabels.1': 'Only one data type (e.g., laboratory data).',
      'properties.dataSourceDiversity.scoreLabels.2': 'Below average',
      'properties.dataSourceDiversity.scoreLabels.3': 'Average',
      'properties.dataSourceDiversity.scoreLabels.4': 'Above average',
      'properties.dataSourceDiversity.scoreLabels.5': 'Five or more data types (e.g., image, text, and genomic data).',
      
      'properties.dataIntegrity.scoreLabels.1': 'Only part of the input data can be processed.',
      'properties.dataIntegrity.scoreLabels.2': 'Below average',
      'properties.dataIntegrity.scoreLabels.3': 'Average',
      'properties.dataIntegrity.scoreLabels.4': 'Above average',
      'properties.dataIntegrity.scoreLabels.5': 'Data is almost complete and consistently processable.',
      
      'properties.dataComplexityLevel.scoreLabels.1': 'Structured, easily interpretable (e.g., numerical laboratory data).',
      'properties.dataComplexityLevel.scoreLabels.2': 'Below average',
      'properties.dataComplexityLevel.scoreLabels.3': 'Average',
      'properties.dataComplexityLevel.scoreLabels.4': 'Above average',
      'properties.dataComplexityLevel.scoreLabels.5': 'Unstructured or highly complex data (e.g., free text or noisy data).',
      
      'properties.dataLinking.scoreLabels.1': 'No linking of different sources.',
      'properties.dataLinking.scoreLabels.2': 'Below average',
      'properties.dataLinking.scoreLabels.3': 'Average',
      'properties.dataLinking.scoreLabels.4': 'Above average',
      'properties.dataLinking.scoreLabels.5': 'Fully integrated analysis from multiple sources.',
      
      'properties.dataVolume.scoreLabels.1': 'Low (e.g., a single parameter).',
      'properties.dataVolume.scoreLabels.2': 'Below average',
      'properties.dataVolume.scoreLabels.3': 'Average',
      'properties.dataVolume.scoreLabels.4': 'Above average',
      'properties.dataVolume.scoreLabels.5': 'Very large (e.g., millions of parameters per patient).',
      
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
