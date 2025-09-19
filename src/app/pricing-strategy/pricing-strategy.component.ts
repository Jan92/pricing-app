import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-pricing-strategy',
  templateUrl: './pricing-strategy.component.html',
  styleUrls: ['./pricing-strategy.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatRadioModule, 
    MatCheckboxModule, 
    MatSliderModule, 
    MatDividerModule, 
    MatProgressBarModule, 
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PricingStrategyComponent implements OnInit {
  currentPhase = 0;
  totalPhases = 6;
  formData: any = {};
  results: any = {};
  pricingForm: FormGroup;
  
  phases = [
    'System-Übersicht',
    'Technische Komplexität',
    'Markt & Wettbewerb',
    'Implementierung & Vertrieb',
    'Geschäftsmodell',
    'Ergebnisse'
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.pricingForm = this.fb.group({
      // Schritt 1: System-Übersicht (erweitert)
      systemName: ['', [Validators.required, Validators.minLength(3)]],
      autonomy: ['', Validators.required],
      // Neue Kosteneingaben
      developmentCosts: [0, [Validators.required, Validators.min(0)]],
      costPerUsage: [0, [Validators.required, Validators.min(0)]],
      maintenanceCosts: [0, [Validators.required, Validators.min(0)]],
      expectedCasesPerYear: [100, [Validators.required, Validators.min(1)]],
      amortizationPeriod: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
      
      // Schritt 2: Technische Komplexität (erweitert)
      measurability: ['', Validators.required],
      inferenceCosts: ['', Validators.required],
      // Mehrdimensionale Komplexitätsbewertung
      dataDiversity: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      caseComplexity: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      clinicalQuestionComplexity: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      aiInvolvementLevel: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      
      // Schritt 3: Markt & Wettbewerb (erweitert)
      sector: ['', Validators.required],
      reimbursement: ['', Validators.required],
      competition: ['', Validators.required],
      // Wettbewerberdaten
      competitors: this.fb.array([]),
      alternativeMethodCosts: [0, [Validators.min(0)]],
      
      // Schritt 4: Implementierung & Vertrieb (erweitert)
      salesEffort: ['', Validators.required],
      implementation: ['', Validators.required],
      customerFencing: ['', Validators.required],
      // Neue Felder
      deploymentType: ['', Validators.required],
      installationFee: [0, [Validators.min(0)]],
      salesChannel: ['', Validators.required],
      partnerCommission: [0, [Validators.min(0), Validators.max(100)]],
      
      // Schritt 5: Geschäftsmodell (erweitert)
      upgradePath: ['', Validators.required],
      supportIntensity: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
      // Neue Geschäftsmodell-Optionen
      pricingModel: ['', Validators.required],
      basePrice: [0, [Validators.min(0)]],
      hybridBaseFee: [0, [Validators.min(0)]],
      hybridUsageFee: [0, [Validators.min(0)]],
      dacsBasePrice: [0, [Validators.min(0)]],
      profitMargin: [20, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.updatePhaseDisplay();
    this.updateProgress();
    this.updateNavigation();
  }

  // Hilfsmethoden für Kostenberechnung
  calculateCostPerCase(): number {
    const formValue = this.pricingForm.value;
    const developmentCosts = formValue.developmentCosts || 0;
    const costPerUsage = formValue.costPerUsage || 0;
    const maintenanceCosts = formValue.maintenanceCosts || 0;
    const expectedCasesPerYear = formValue.expectedCasesPerYear || 100;
    const amortizationPeriod = formValue.amortizationPeriod || 5;

    // Berechnung der Selbstkosten pro Fall
    const amortizedDevelopmentCosts = developmentCosts / (expectedCasesPerYear * amortizationPeriod);
    const maintenanceCostsPerCase = maintenanceCosts / expectedCasesPerYear;
    
    return amortizedDevelopmentCosts + costPerUsage + maintenanceCostsPerCase;
  }

  calculateComplexityScore(): number {
    const formValue = this.pricingForm.value;
    const dataDiversity = formValue.dataDiversity || 3;
    const caseComplexity = formValue.caseComplexity || 3;
    const clinicalQuestionComplexity = formValue.clinicalQuestionComplexity || 3;
    const aiInvolvementLevel = formValue.aiInvolvementLevel || 3;

    return dataDiversity + caseComplexity + clinicalQuestionComplexity + aiInvolvementLevel;
  }

  getComplexityLevel(): string {
    const score = this.calculateComplexityScore();
    if (score <= 8) return 'niedrig';
    if (score <= 12) return 'mittel';
    if (score <= 16) return 'hoch';
    return 'sehr hoch';
  }

  // Wettbewerber-Management
  get competitorsArray(): FormArray {
    return this.pricingForm.get('competitors') as FormArray;
  }

  addCompetitor(): void {
    const competitorGroup = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      features: ['']
    });
    this.competitorsArray.push(competitorGroup);
  }

  removeCompetitor(index: number): void {
    this.competitorsArray.removeAt(index);
  }

  calculateMarketStats(): { min: number, max: number, avg: number } {
    const competitors = this.competitorsArray.value;
    if (competitors.length === 0) return { min: 0, max: 0, avg: 0 };

    const prices = competitors.map((c: any) => c.price).filter((p: number) => p > 0);
    if (prices.length === 0) return { min: 0, max: 0, avg: 0 };

    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: prices.reduce((sum: number, price: number) => sum + price, 0) / prices.length
    };
  }

  // DACS-Preisberechnung
  calculateDACSPrices(): { 
    simple: number, 
    medium: number, 
    complex: number, 
    dynamic: number,
    basePrice: number,
    complexityScore: number,
    complexityLevel: string,
    priceRange: { min: number, max: number, spread: number }
  } {
    const basePrice = this.pricingForm.get('dacsBasePrice')?.value || 0;
    const complexityScore = this.calculateComplexityScore();
    const profitMargin = this.pricingForm.get('profitMargin')?.value || 20;
    const complexityLevel = this.getComplexityLevel();
    
    // DACS-Preise basierend auf Komplexität mit Gewinnmarge
    const simplePrice = (basePrice * 0.5) * (1 + profitMargin / 100); // 50% des Basispreises für einfache Fälle
    const mediumPrice = basePrice * (1 + profitMargin / 100); // 100% des Basispreises für mittlere Fälle
    const complexPrice = (basePrice * 1.5) * (1 + profitMargin / 100); // 150% des Basispreises für komplexe Fälle
    
    // Dynamische Preisanpassung basierend auf tatsächlichem Komplexitätsscore
    let dynamicPrice = basePrice;
    if (complexityScore <= 8) {
      dynamicPrice = simplePrice;
    } else if (complexityScore <= 12) {
      dynamicPrice = mediumPrice;
    } else {
      dynamicPrice = complexPrice;
    }
    
    return {
      simple: simplePrice,
      medium: mediumPrice,
      complex: complexPrice,
      dynamic: dynamicPrice,
      basePrice: basePrice,
      complexityScore: complexityScore,
      complexityLevel: complexityLevel,
      priceRange: {
        min: simplePrice,
        max: complexPrice,
        spread: complexPrice - simplePrice
      }
    };
  }

  // Hilfsmethode für Slider-Labels und String-Formatierung
  formatLabel(value: number | string): string {
    if (typeof value === 'number') {
      return value.toString();
    }
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/([A-Z])/g, ' $1');
  }

  // Automatische Modell-Empfehlung
  getModelRecommendation(): string {
    const formValue = this.pricingForm.value;
    const deploymentType = formValue.deploymentType;
    const salesChannel = formValue.salesChannel;
    const complexityScore = this.calculateComplexityScore();
    const costPerCase = this.calculateCostPerCase();

    let recommendation = '';

    // Cloud + viele Nutzer + variable Kosten hoch: → Vorschlag nutzungsbasiert
    if (deploymentType === 'cloud' && costPerCase > 0) {
      recommendation = 'Bei Ihrer Cloud-Konstellation bietet sich ein nutzungsabhängiges Modell an.';
    }

    // On-Premises + wenige große Kunden: → Vorschlag jährliche Lizenz
    if (deploymentType === 'onpremises') {
      recommendation = 'Bei On-Premises-Installation empfehlen wir eine jährliche Lizenz oder hohe Einmalzahlung.';
    }

    // Hohe Komplexitäts-Schwankungen: → Vorschlag DACS
    if (complexityScore > 14) {
      recommendation = 'Aufgrund der hohen Komplexitätsschwankungen empfehlen wir das DACS-Modell für eine faire Preisverteilung.';
    }

    // Partnervertrieb: → Hinweis auf höhere Preise
    if (salesChannel === 'partner') {
      recommendation += ' Beachten Sie bei Partnervertrieb die erforderliche Provision in Ihrem Preis.';
    }

    return recommendation;
  }

  // Hilfsmethode für Preismodell-Labels
  getPricingModelLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'license': 'Feste Lizenzgebühr',
      'usage': 'Nutzungsbasiert',
      'hybrid': 'Hybrid-Modell',
      'dacs': 'Komplexitätsabhängig (DACS)'
    };
    return labels[value] || 'Unbekannt';
  }

  // Math-Objekt für Template-Zugriff
  Math = Math;

  nextPhase() {
    if (!this.validateCurrentPhase()) {
      return;
    }
    
    this.saveFormData();
    
    if (this.currentPhase === this.totalPhases - 2) {
      this.generateRecommendations();
    } else if (this.currentPhase < this.totalPhases - 1) {
      this.currentPhase++;
      this.updatePhaseDisplay();
      this.updateProgress();
      this.updateNavigation();
    }
  }

  previousPhase() {
    if (this.currentPhase > 0) {
      this.currentPhase--;
      this.updatePhaseDisplay();
      this.updateProgress();
      this.updateNavigation();
    }
  }

  jumpToPhase(phaseIndex: number) {
    // Erlaube nur Sprünge zu bereits besuchten Phasen oder der nächsten Phase
    if (phaseIndex <= this.currentPhase || phaseIndex === this.currentPhase + 1) {
      if (this.currentPhase === this.totalPhases - 1 && phaseIndex < this.currentPhase) {
        // Wenn wir von den Ergebnissen zurückspringen, speichern wir die aktuellen Ergebnisse
        const savedResults = { ...this.results };
        this.currentPhase = phaseIndex;
        this.updatePhaseDisplay();
        this.updateProgress();
        this.updateNavigation();
        this.results = savedResults; // Stelle die Ergebnisse wieder her
      } else {
        this.currentPhase = phaseIndex;
        this.updatePhaseDisplay();
        this.updateProgress();
        this.updateNavigation();
      }
    }
  }

  isPhaseVisible(index: number): boolean {
    return index === this.currentPhase;
  }

  isPhaseActive(index: number): boolean {
    return index === this.currentPhase;
  }

  isPhaseCompleted(index: number): boolean {
    return index < this.currentPhase;
  }

  updatePhaseDisplay() {
    // Diese Methode bleibt für Kompatibilität, aber die Logik wurde in die Template-Methoden verschoben
  }

  getProgressPercent(): number {
    return ((this.currentPhase + 1) / this.totalPhases) * 100;
  }

  updateProgress() {
    // Diese Methode bleibt für Kompatibilität, aber die Logik wurde in die Template-Methoden verschoben
  }

  isPrevButtonVisible(): boolean {
    return this.currentPhase !== 0;
  }

  isNextButtonVisible(): boolean {
    return this.currentPhase !== this.totalPhases - 1;
  }

  getNextButtonText(): string {
    if (this.currentPhase === this.totalPhases - 2) {
      return 'Empfehlung generieren';
    }
    return 'Weiter →';
  }

  updateNavigation() {
    // Diese Methode bleibt für Kompatibilität, aber die Logik wurde in die Template-Methoden verschoben
  }

  validateCurrentPhase(): boolean {
    // Wenn wir auf der Ergebnisseite sind, ist die Validierung immer erfolgreich
    if (this.currentPhase === this.totalPhases - 1) {
      return true;
    }

    // Prüfe die Validität des Formulars für die aktuelle Phase
    const currentPhaseControls = this.getCurrentPhaseControls();
    const invalidControls = currentPhaseControls.filter(control => {
      const formControl = this.pricingForm.get(control);
      if (formControl?.invalid) {
        formControl.markAsTouched();
        return true;
      }
      return false;
    });

    if (invalidControls.length > 0) {
      const errorMessages = invalidControls.map(control => {
        const formControl = this.pricingForm.get(control);
        if (formControl?.hasError('required')) {
          return `${this.getFieldLabel(control)} ist erforderlich`;
        } else if (formControl?.hasError('minlength')) {
          return `${this.getFieldLabel(control)} muss mindestens ${formControl.errors?.['minlength'].requiredLength} Zeichen lang sein`;
        } else if (formControl?.hasError('min')) {
          return `${this.getFieldLabel(control)} muss mindestens ${formControl.errors?.['min'].min} sein`;
        } else if (formControl?.hasError('max')) {
          return `${this.getFieldLabel(control)} darf maximal ${formControl.errors?.['max'].max} sein`;
        }
        return `${this.getFieldLabel(control)} ist ungültig`;
      });

      this.snackBar.open(errorMessages.join('\n'), 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });

      return false;
    }

    return true;
  }

  private getFieldLabel(control: string): string {
    const labels: { [key: string]: string } = {
      systemName: 'Name des DDSS-Systems',
      autonomy: 'Autonomie-Level',
      developmentCosts: 'Entwicklungskosten (einmalig)',
      costPerUsage: 'Kosten pro Nutzung',
      maintenanceCosts: 'Wartungs-/Updatekosten (jährlich)',
      expectedCasesPerYear: 'Erwartete Fallzahl pro Jahr',
      amortizationPeriod: 'Amortisierungszeitraum (Jahre)',
      measurability: 'Messbarkeit des Nutzens',
      inferenceCosts: 'AI-Inferenzkosten',
      dataDiversity: 'Datenvielfalt/-qualität',
      caseComplexity: 'Krankheits-/Fallkomplexität',
      clinicalQuestionComplexity: 'Komplexität der klinischen Fragestellung',
      aiInvolvementLevel: 'KI-Beteiligungsgrad',
      sector: 'Primärer Zielsektor',
      reimbursement: 'Erstattungsintegration',
      competition: 'Wettbewerbsintensität',
      alternativeMethodCosts: 'Kosten der bisherigen Methode pro Fall',
      salesEffort: 'Vertriebskomplexität',
      implementation: 'Implementierungskomplexität',
      customerFencing: 'Kundenbindung',
      deploymentType: 'Bereitstellungsart',
      installationFee: 'Installationsgebühr',
      salesChannel: 'Vertriebskanal',
      partnerCommission: 'Partnerprovision (%)',
      upgradePath: 'Upgrade-Pfad',
      supportIntensity: 'Support-Intensität',
      pricingModel: 'Preismodell',
      basePrice: 'Basispreis',
      hybridBaseFee: 'Hybrid: Grundgebühr',
      hybridUsageFee: 'Hybrid: Nutzungsgebühr',
      dacsBasePrice: 'DACS: Basispreis',
      profitMargin: 'Gewinnmarge (%)'
    };
    return labels[control] || control;
  }

  private getCurrentPhaseControls(): string[] {
    // Definiere die Formularfelder für jede Phase
    const phaseControls = {
      0: ['systemName', 'autonomy', 'developmentCosts', 'costPerUsage', 'maintenanceCosts', 'expectedCasesPerYear', 'amortizationPeriod'],
      1: ['measurability', 'inferenceCosts', 'dataDiversity', 'caseComplexity', 'clinicalQuestionComplexity', 'aiInvolvementLevel'],
      2: ['sector', 'reimbursement', 'competition'],
      3: ['salesEffort', 'implementation', 'customerFencing', 'deploymentType', 'salesChannel'],
      4: ['upgradePath', 'supportIntensity', 'pricingModel']
    };

    return phaseControls[this.currentPhase as keyof typeof phaseControls] || [];
  }

  // Diese Methode wird nicht mehr benötigt, da wir jetzt Angular Forms Validierung verwenden

  saveFormData() {
    // Speichere die Formulardaten aus dem ReactiveForm
    if (this.pricingForm.valid) {
      this.formData = { ...this.pricingForm.value };
      this.snackBar.open('Daten erfolgreich gespeichert', 'OK', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    }
  }

  generateRecommendations() {
    if (!this.validateCurrentPhase()) {
      return;
    }

    this.saveFormData();

    if (this.pricingForm.valid) {
      this.results = this.calculatePricingRecommendations();
      this.currentPhase = this.totalPhases - 1;
      this.updatePhaseDisplay();
      this.updateProgress();
      this.updateNavigation();

      // Bestätige die erfolgreiche Generierung
      this.snackBar.open('Pricing-Empfehlung wurde erfolgreich generiert!', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    }
  }

  calculatePricingRecommendations() {
    const formValue = this.pricingForm.value;
    
    // Grundlegende Berechnungen
    const basePrice = formValue.basePrice || 0;
    const profitMargin = formValue.profitMargin || 20;
    const complexityScore = this.calculateComplexityScore();
    const costPerCase = this.calculateCostPerCase();
    const expectedCases = formValue.expectedCasesPerYear || 100;
    const developmentCosts = formValue.developmentCosts || 0;
    const maintenanceCosts = formValue.maintenanceCosts || 0;
    const costPerUsage = formValue.costPerUsage || 0;
    
    // Preisempfehlung basierend auf Komplexität und Geschäftsmodell
    let recommendedPrice = basePrice;
    let pricingModel = formValue.pricingModel || 'license';
    
    // Anpassung basierend auf Geschäftsmodell
    switch (pricingModel) {
      case 'usage':
        recommendedPrice = costPerUsage * (1 + profitMargin / 100);
        break;
      case 'hybrid':
        const hybridBase = formValue.hybridBaseFee || 0;
        const hybridUsage = formValue.hybridUsageFee || 0;
        recommendedPrice = {
          baseFee: hybridBase * (1 + profitMargin / 100),
          usageFee: hybridUsage * (1 + profitMargin / 100)
        };
        break;
      case 'dacs':
        const dacsBase = formValue.dacsBasePrice || 0;
        recommendedPrice = this.calculateDACSPrices();
        break;
      default: // license
        if (complexityScore > 15) {
          recommendedPrice = basePrice * 1.5; // 50% Aufschlag für hohe Komplexität
        } else if (complexityScore > 10) {
          recommendedPrice = basePrice * 1.2; // 20% Aufschlag für mittlere Komplexität
        }
        recommendedPrice = recommendedPrice * (1 + profitMargin / 100);
    }
    
    // Marktvergleich
    const marketStats = this.calculateMarketStats();
    const alternativeCosts = formValue.alternativeMethodCosts || 0;
    
    // ROI-Berechnung
    const totalCosts = developmentCosts + (maintenanceCosts * 5); // 5 Jahre Wartung
    const annualRevenue = typeof recommendedPrice === 'number' 
      ? recommendedPrice * expectedCases 
      : (recommendedPrice as any).baseFee + ((recommendedPrice as any).usageFee * expectedCases);
    const roi = totalCosts > 0 ? ((annualRevenue - totalCosts) / totalCosts) * 100 : 0;
    
    // Break-Even-Punkt
    const breakEvenCases = totalCosts > 0 
      ? Math.ceil(totalCosts / (typeof recommendedPrice === 'number' ? recommendedPrice : (recommendedPrice as any).usageFee))
      : 0;
    
    // Marktvergleich
    const marketComparison = {
      yourPrice: typeof recommendedPrice === 'number' ? recommendedPrice : (recommendedPrice as any).baseFee,
      marketMin: marketStats.min,
      marketMax: marketStats.max,
      marketAvg: marketStats.avg,
      isCompetitive: typeof recommendedPrice === 'number' 
        ? recommendedPrice >= marketStats.min && recommendedPrice <= marketStats.max
        : (recommendedPrice as any).baseFee >= marketStats.min && (recommendedPrice as any).baseFee <= marketStats.max,
      alternativeCosts: alternativeCosts,
      costSavings: alternativeCosts > 0 ? alternativeCosts - (typeof recommendedPrice === 'number' ? recommendedPrice : (recommendedPrice as any).baseFee) : 0
    };
    
    // DACS-Preise berechnen
    const dacsPrices = this.calculateDACSPrices();
    
    // Implementierungskosten
    const installationFee = formValue.installationFee || 0;
    const partnerCommission = formValue.partnerCommission || 0;
    const totalImplementationCosts = installationFee + (partnerCommission > 0 ? (typeof recommendedPrice === 'number' ? recommendedPrice : (recommendedPrice as any).baseFee) * partnerCommission / 100 : 0);
    
    return {
      recommendedPrice: recommendedPrice,
      basePrice: basePrice,
      complexityScore: complexityScore,
      costPerCase: costPerCase,
      marketComparison: marketComparison,
      dacsPrices: dacsPrices,
      profitMargin: profitMargin,
      modelRecommendation: this.getModelRecommendation(),
      pricingModel: pricingModel,
      roi: roi,
      breakEvenCases: breakEvenCases,
      totalCosts: totalCosts,
      annualRevenue: annualRevenue,
      implementationCosts: totalImplementationCosts,
      expectedCases: expectedCases,
      developmentCosts: developmentCosts,
      maintenanceCosts: maintenanceCosts,
      costPerUsage: costPerUsage
    };
  }

  // Helper methods for labels
  getAutonomyLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'assistive': 'Assistive (Score 1-2)',
      'augmentative': 'Augmentative (Score 3-4)', 
      'autonomous': 'Autonomous (Score 5)'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  getMeasurabilityLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'high': 'Hoch messbar',
      'medium': 'Mittel messbar',
      'low': 'Schwer messbar'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  getInferenceCostsLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'low': 'Niedrig',
      'medium': 'Mittel', 
      'high': 'Hoch'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  getSectorLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'public': 'Öffentlich',
      'private': 'Privat',
      'hybrid': 'Hybrid'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  getSalesEffortLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'low': 'Niedrig (<10%)',
      'medium': 'Mittel (10-25%)',
      'high': 'Hoch (>25%)'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  exportPDF() {
    if (!this.results || !this.pricingForm.valid) {
      this.snackBar.open('Keine Ergebnisse zum Exportieren verfügbar.', 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['warning-snackbar']
      });
      return;
    }

    try {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const htmlContent = this.generatePDFContent();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          this.snackBar.open('PDF-Export erfolgreich gestartet', 'OK', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
        }, 500);
      } else {
        throw new Error('Popup wurde blockiert');
      }
    } catch (error) {
      this.snackBar.open('Fehler beim PDF-Export: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'), 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }

  private generatePDFContent(): string {
    return `
      <html>
      <head>
        <title>DDSS Pricing Strategy - ${this.pricingForm.get('systemName')?.value || 'Report'}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .result-section { 
            margin: 20px 0; 
            padding: 15px; 
            border-left: 4px solid #0891b2; 
            background: #f8f9fa; 
            page-break-inside: avoid;
          }
          .recommendation-box { 
            background: #f0f9f0; 
            border: 1px solid #22c55e; 
            padding: 20px; 
            margin: 15px 0; 
          }
          .risk-factors { 
            background: #fef3f3; 
            border: 1px solid #f59e0b; 
            padding: 15px; 
            margin: 15px 0; 
          }
          .result-label { font-weight: bold; margin-right: 10px; }
          .result-item { margin: 8px 0; }
          .pricing-details { display: flex; gap: 15px; flex-wrap: wrap; }
          .pricing-card { 
            border: 1px solid #ddd; 
            padding: 15px; 
            background: white;
            flex: 1;
            min-width: 200px;
          }
          .system-type-badge { 
            padding: 8px 15px; 
            border-radius: 20px; 
            background: #e0f2fe; 
            border: 1px solid #0891b2;
            display: inline-block;
            margin-bottom: 15px;
            font-weight: bold;
          }
          h3, h4, h5 { color: #0891b2; margin-bottom: 10px; }
          h1 { text-align: center; color: #0891b2; }
          .meta-info { text-align: center; color: #666; margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <h1>DDSS Pricing Strategy Report</h1>
        <div class="meta-info">
          <p><strong>Generiert am:</strong> ${new Date().toLocaleDateString('de-DE')}</p>
          <p><strong>System:</strong> ${this.pricingForm.get('systemName')?.value || 'Unbekannt'}</p>
        </div>
        ${this.generateResultsHTML()}
      </body>
      </html>
    `;
  }

  private generateResultsHTML(): string {
    return `
      <div class="results-container">
        <div class="result-section">
          <div class="system-type-badge">${this.results.systemType}</div>
          <h3>Empfohlenes Pricing-Modell</h3>
          <div class="recommendation-box">
            <div class="result-item"><span class="result-label">Modell:</span> ${this.results.pricingModel}</div>
            <div class="result-item"><span class="result-label">Struktur:</span> ${this.results.structure}</div>
            <div class="result-item"><span class="result-label">Primäre Metrik:</span> ${this.results.primaryMetric}</div>
          </div>
          
          <h4>Preisdetails</h4>
          <div class="pricing-details">
            <div class="pricing-card">
              <h5>Basispreis</h5>
              <p>${this.results.basePrice}</p>
            </div>
            <div class="pricing-card">
              <h5>Variable Komponente</h5>
              <p>${this.results.variableComponent}</p>
            </div>
          </div>

          ${this.results.implementation ? `
            <h4>Implementierungsdetails</h4>
            <div class="recommendation-box">
              ${Object.entries(this.results.implementation)
                .filter(([key, value]) => value && key !== 'tiers')
                .map(([key, value]) => `<div class="result-item"><span class="result-label">${this.formatLabel(key)}:</span> ${value}</div>`)
                .join('')}
              
              ${this.results.implementation.tiers ? `
                <h5>Verfügbare Tiers</h5>
                ${Object.entries(this.results.implementation.tiers)
                  .map(([tier, desc]) => `<div class="result-item"><span class="result-label">${this.formatLabel(tier)}:</span> ${desc}</div>`)
                  .join('')}
              ` : ''}
            </div>
          ` : ''}

          ${this.results.risks && this.results.risks.length > 0 ? `
            <h4>Risikofaktoren</h4>
            <div class="risk-factors">
              ${this.results.risks.map((risk: string) => `<div class="result-item">• ${risk}</div>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }


  exportJSON() {
    if (!this.results || !this.pricingForm.valid) {
      this.snackBar.open('Keine Ergebnisse zum Exportieren verfügbar.', 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['warning-snackbar']
      });
      return;
    }

    try {
      const exportData = {
        timestamp: new Date().toISOString(),
        systemName: this.pricingForm.get('systemName')?.value || 'Unnamed System',
        formData: this.pricingForm.value,
        recommendations: this.results
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ddss-pricing-${(this.pricingForm.get('systemName')?.value || 'report').replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);

      this.snackBar.open('JSON-Export erfolgreich', 'OK', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    } catch (error) {
      this.snackBar.open('Fehler beim JSON-Export: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'), 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }
}
