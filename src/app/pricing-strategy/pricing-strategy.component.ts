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
import { LanguageService } from '../language.service';

/**
 * Pricing Strategy Component
 * 
 * Implements a comprehensive pricing strategy calculator for Diagnostic Decision Support Systems (DDSS).
 * The component guides users through a 6-phase process to determine optimal pricing models based on:
 * - System characteristics and cost structure
 * - Technical complexity assessment (20 criteria across 4 dimensions)
 * - Market competition analysis
 * - Implementation and deployment considerations
 * - Business model selection
 * - Pricing recommendations with ROI calculations
 */

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
  // Phase management
  currentPhase = 0;
  totalPhases = 6;
  
  // Data storage
  formData: any = {};
  results: any = {};
  pricingForm!: FormGroup;
  
  // Template utilities
  Number = Number;
  Math = Math;
  
  phases = [
    'pricing.phases.systemOverview',
    'pricing.phases.complexity',
    'pricing.phases.marketCompetition',
    'pricing.phases.implementation',
    'pricing.phases.businessModel',
    'pricing.phases.results'
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private languageService: LanguageService) {
    this.initializeForm();
  }

  /**
   * Initializes the reactive form with all required fields and validators
   * Organized by pricing strategy phases for clarity
   */
  private initializeForm(): void {
    this.pricingForm = this.fb.group({
      // Phase 1: System Overview & Cost Structure
      systemName: ['', [Validators.required, Validators.minLength(3)]],
      autonomy: ['', Validators.required],
      developmentCosts: [0, [Validators.required, Validators.min(0)]],
      costPerUsage: [0, [Validators.required, Validators.min(0)]],
      maintenanceCosts: [0, [Validators.required, Validators.min(0)]],
      expectedCasesPerYear: [100, [Validators.required, Validators.min(1)]],
      amortizationPeriod: [5, [Validators.required, Validators.min(1), Validators.max(10)]],

      // Phase 2: Technical Complexity Assessment
      measurability: ['', Validators.required],
      inferenceCosts: ['', Validators.required],
      complexityInputMethod: ['detailed', Validators.required],
      directComplexityScore: [60, [Validators.min(20), Validators.max(100)]],
      
      // 20 complexity criteria across 4 dimensions (1-5 scale each)
      dataSourceDiversity: [3, [Validators.min(1), Validators.max(5)]],
      dataIntegrity: [3, [Validators.min(1), Validators.max(5)]],
      dataComplexity: [3, [Validators.min(1), Validators.max(5)]],
      dataLinking: [3, [Validators.min(1), Validators.max(5)]],
      dataVolume: [3, [Validators.min(1), Validators.max(5)]],
      diseaseRarity: [3, [Validators.min(1), Validators.max(5)]],
      diagnosticAmbiguity: [3, [Validators.min(1), Validators.max(5)]],
      prognosticUncertainty: [3, [Validators.min(1), Validators.max(5)]],
      multimorbidity: [3, [Validators.min(1), Validators.max(5)]],
      diseaseSeverity: [3, [Validators.min(1), Validators.max(5)]],
      differentialDiagnosticDepth: [3, [Validators.min(1), Validators.max(5)]],
      prognosticPrecision: [3, [Validators.min(1), Validators.max(5)]],
      realTimeRequirement: [3, [Validators.min(1), Validators.max(5)]],
      interdisciplinaryRelevance: [3, [Validators.min(1), Validators.max(5)]],
      dynamicAdaptability: [3, [Validators.min(1), Validators.max(5)]],
      automationLevel: [3, [Validators.min(1), Validators.max(5)]],
      analysisDepth: [3, [Validators.min(1), Validators.max(5)]],
      recommendationComplexity: [3, [Validators.min(1), Validators.max(5)]],
      guidelineIntegration: [3, [Validators.min(1), Validators.max(5)]],
      patientSpecificIndividualization: [3, [Validators.min(1), Validators.max(5)]],

      // Phase 3: Market & Competition Analysis
      sector: ['', Validators.required],
      reimbursement: ['', Validators.required],
      competition: ['', Validators.required],
      competitors: this.fb.array([]),
      alternativeMethodCosts: [0, [Validators.min(0)]],

      // Phase 4: Implementation & Sales
      salesEffort: ['', Validators.required],
      implementation: ['', Validators.required],
      customerFencing: ['', Validators.required],
      deploymentType: ['', Validators.required],
      installationFee: [0, [Validators.min(0)]],
      salesChannel: ['', Validators.required],
      partnerCommission: [0, [Validators.min(0), Validators.max(100)]],

      // Phase 5: Business Model Selection
      upgradePath: ['', Validators.required],
      supportIntensity: [3, [Validators.required, Validators.min(1), Validators.max(5)]],
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

  /**
   * Calculates cost per case based on development, usage, and maintenance costs
   * Includes amortization of development costs over the expected usage period
   */
  calculateCostPerCase(): number {
    const formValue = this.pricingForm.value;
    const developmentCosts = formValue.developmentCosts || 0;
    const costPerUsage = formValue.costPerUsage || 0;
    const maintenanceCosts = formValue.maintenanceCosts || 0;
    const expectedCasesPerYear = formValue.expectedCasesPerYear || 100;
    const amortizationPeriod = formValue.amortizationPeriod || 5;

    const amortizedDevelopmentCosts = developmentCosts / (expectedCasesPerYear * amortizationPeriod);
    const maintenanceCostsPerCase = maintenanceCosts / expectedCasesPerYear;
    
    return amortizedDevelopmentCosts + costPerUsage + maintenanceCostsPerCase;
  }

  /**
   * Calculates complexity score based on 20 criteria across 4 dimensions
   * Returns score in range 20-100 (20 criteria × 1-5 points each)
   */
  calculateComplexityScore(): number {
    const formValue = this.pricingForm.value;
    const inputMethod = formValue.complexityInputMethod;
    
    if (inputMethod === 'direct') {
      return Number(formValue.directComplexityScore) || 60;
    }
    
    // Detailed assessment: 20 criteria across 4 dimensions
    const dataSourceDiversity = Number(formValue.dataSourceDiversity) || 3;
    const dataIntegrity = Number(formValue.dataIntegrity) || 3;
    const dataComplexity = Number(formValue.dataComplexity) || 3;
    const dataLinking = Number(formValue.dataLinking) || 3;
    const dataVolume = Number(formValue.dataVolume) || 3;
    const diseaseRarity = Number(formValue.diseaseRarity) || 3;
    const diagnosticAmbiguity = Number(formValue.diagnosticAmbiguity) || 3;
    const prognosticUncertainty = Number(formValue.prognosticUncertainty) || 3;
    const multimorbidity = Number(formValue.multimorbidity) || 3;
    const diseaseSeverity = Number(formValue.diseaseSeverity) || 3;
    const differentialDiagnosticDepth = Number(formValue.differentialDiagnosticDepth) || 3;
    const prognosticPrecision = Number(formValue.prognosticPrecision) || 3;
    const realTimeRequirement = Number(formValue.realTimeRequirement) || 3;
    const interdisciplinaryRelevance = Number(formValue.interdisciplinaryRelevance) || 3;
    const dynamicAdaptability = Number(formValue.dynamicAdaptability) || 3;
    const automationLevel = Number(formValue.automationLevel) || 3;
    const analysisDepth = Number(formValue.analysisDepth) || 3;
    const recommendationComplexity = Number(formValue.recommendationComplexity) || 3;
    const guidelineIntegration = Number(formValue.guidelineIntegration) || 3;
    const patientSpecificIndividualization = Number(formValue.patientSpecificIndividualization) || 3;

    return dataSourceDiversity + dataIntegrity + dataComplexity + dataLinking + dataVolume +
           diseaseRarity + diagnosticAmbiguity + prognosticUncertainty + multimorbidity + diseaseSeverity +
           differentialDiagnosticDepth + prognosticPrecision + realTimeRequirement + interdisciplinaryRelevance + dynamicAdaptability +
           automationLevel + analysisDepth + recommendationComplexity + guidelineIntegration + patientSpecificIndividualization;
  }

  /**
   * Determines complexity level based on score ranges
   */
  getComplexityLevel(): string {
    const score = this.calculateComplexityScore();
    if (score <= 40) return this.translate('pricing.complexity.level.low');
    if (score <= 60) return this.translate('pricing.complexity.level.medium');
    if (score <= 80) return this.translate('pricing.complexity.level.high');
    return this.translate('pricing.complexity.level.veryHigh');
  }

  // Competitor Management
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

  /**
   * Calculates market statistics from competitor data
   */
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

  /**
   * Calculates DACS (Dynamic Adaptive Complexity-based System) pricing
   * Prices vary based on complexity score: simple (50%), medium (100%), complex (150%), very complex (200%)
   */
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
    
    const simplePrice = (basePrice * 0.5) * (1 + profitMargin / 100);
    const mediumPrice = basePrice * (1 + profitMargin / 100);
    const complexPrice = (basePrice * 1.5) * (1 + profitMargin / 100);
    
    let dynamicPrice = basePrice;
    if (complexityScore <= 40) {
      dynamicPrice = simplePrice;
    } else if (complexityScore <= 60) {
      dynamicPrice = mediumPrice;
    } else if (complexityScore <= 80) {
      dynamicPrice = complexPrice;
    } else {
      dynamicPrice = (basePrice * 2) * (1 + profitMargin / 100);
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
        max: dynamicPrice > complexPrice ? dynamicPrice : complexPrice,
        spread: (dynamicPrice > complexPrice ? dynamicPrice : complexPrice) - simplePrice
      }
    };
  }

  /**
   * Formats labels for sliders and string formatting
   */
  formatLabel(value: number | string): string {
    if (typeof value === 'number') {
      return value.toString();
    }
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/([A-Z])/g, ' $1');
  }

  /**
   * Generates automatic pricing model recommendations based on system characteristics
   */
  getModelRecommendation(): string {
    const formValue = this.pricingForm.value;
    const deploymentType = formValue.deploymentType;
    const salesChannel = formValue.salesChannel;
    const complexityScore = this.calculateComplexityScore();
    const costPerCase = this.calculateCostPerCase();

    let recommendation = '';

    if (deploymentType === 'cloud' && costPerCase > 0) {
      recommendation = this.translate('pricing.modelRecommendation.cloud');
    }

    if (deploymentType === 'onpremises') {
      recommendation = this.translate('pricing.modelRecommendation.onPremises');
    }

    if (complexityScore > 60) {
      recommendation = this.translate('pricing.modelRecommendation.dacs');
    }

    if (salesChannel === 'partner') {
      recommendation += ' ' + this.translate('pricing.modelRecommendation.partner');
    }

    return recommendation;
  }

  /**
   * Returns human-readable labels for pricing models
   */
  getPricingModelLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'license': 'Feste Lizenzgebühr',
      'usage': 'Nutzungsbasiert',
      'hybrid': 'Hybrid-Modell',
      'dacs': 'Komplexitätsabhängig (DACS)'
    };
    return labels[value] || 'Unbekannt';
  }

  /**
   * Translation helper method
   */
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  /**
   * Returns score labels for complexity criteria
   */
  getScoreLabel(criterionId: string, score: number): string {
    if (score === 1) {
      return this.languageService.translate(`common.scoreLabels.1`);
    } else if (score === 5) {
      return this.languageService.translate(`common.scoreLabels.5`);
    } else {
      return this.languageService.translate(`common.scoreLabels.${score}`);
    }
  }


  /**
   * Advances to the next phase after validation
   */
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

  /**
   * Returns to the previous phase
   */
  previousPhase() {
    if (this.currentPhase > 0) {
      this.currentPhase--;
      this.updatePhaseDisplay();
      this.updateProgress();
      this.updateNavigation();
    }
  }

  /**
   * Allows jumping to previously visited phases or the next phase
   */
  jumpToPhase(phaseIndex: number) {
    if (phaseIndex <= this.currentPhase || phaseIndex === this.currentPhase + 1) {
      if (this.currentPhase === this.totalPhases - 1 && phaseIndex < this.currentPhase) {
        const savedResults = { ...this.results };
        this.currentPhase = phaseIndex;
        this.updatePhaseDisplay();
        this.updateProgress();
        this.updateNavigation();
        this.results = savedResults;
      } else {
        this.currentPhase = phaseIndex;
        this.updatePhaseDisplay();
        this.updateProgress();
        this.updateNavigation();
      }
    }
  }

  // Phase visibility and navigation helpers
  isPhaseVisible(index: number): boolean {
    return index === this.currentPhase;
  }

  isPhaseActive(index: number): boolean {
    return index === this.currentPhase;
  }

  isPhaseCompleted(index: number): boolean {
    return index < this.currentPhase;
  }

  getProgressPercent(): number {
    return ((this.currentPhase + 1) / this.totalPhases) * 100;
  }

  isPrevButtonVisible(): boolean {
    return this.currentPhase !== 0;
  }

  isNextButtonVisible(): boolean {
    return this.currentPhase !== this.totalPhases - 1;
  }

  getNextButtonText(): string {
    if (this.currentPhase === this.totalPhases - 2) {
      return this.translate('pricing.generateRecommendation');
    }
    return this.translate('pricing.next');
  }

  // Template compatibility methods
  updatePhaseDisplay() {}
  updateProgress() {}
  updateNavigation() {}

  /**
   * Validates the current phase form data
   */
  validateCurrentPhase(): boolean {
    if (this.currentPhase === this.totalPhases - 1) {
      return true;
    }

    if (this.currentPhase === 4) {
      return this.validateBusinessModelPhase();
    }

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
        return `${this.getFieldLabel(control)} ${this.translate('pricing.validation.invalidField')}`;
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

  /**
   * Validates business model phase with model-specific requirements
   */
  private validateBusinessModelPhase(): boolean {
    const formValue = this.pricingForm.value;
    const pricingModel = formValue.pricingModel;
    
    if (!pricingModel) {
      this.snackBar.open('Bitte wählen Sie ein Preismodell aus', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
      return false;
    }

    let isValid = true;
    let errorMessage = '';

    switch (pricingModel) {
      case 'license':
        if (!formValue.basePrice || formValue.basePrice <= 0) {
          errorMessage = this.translate('pricing.validation.validBasePrice');
          isValid = false;
        }
        break;
      case 'usage':
        if (!formValue.basePrice || formValue.basePrice <= 0) {
          errorMessage = this.translate('pricing.validation.validUsagePrice');
          isValid = false;
        }
        break;
      case 'hybrid':
        const hybridErrors: string[] = [];
        if (!formValue.hybridBaseFee || formValue.hybridBaseFee <= 0) {
          hybridErrors.push(this.translate('pricing.validation.validHybridBaseFee'));
          isValid = false;
        }
        if (!formValue.hybridUsageFee || formValue.hybridUsageFee <= 0) {
          hybridErrors.push(this.translate('pricing.validation.validHybridUsageFee'));
          isValid = false;
        }
        if (hybridErrors.length > 0) {
          errorMessage = hybridErrors.join(' und ');
        }
        break;
      case 'dacs':
        if (!formValue.dacsBasePrice || formValue.dacsBasePrice <= 0) {
          errorMessage = this.translate('pricing.validation.validDacsBasePrice');
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      this.snackBar.open(errorMessage, 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }

    return isValid;
  }

  /**
   * Returns field labels for validation error messages
   */
  private getFieldLabel(control: string): string {
    const labels: { [key: string]: string } = {
      systemName: this.languageService.translate('pricing.systemName'),
      autonomy: this.languageService.translate('pricing.autonomyLevel'),
      developmentCosts: this.languageService.translate('pricing.developmentCosts'),
      costPerUsage: this.languageService.translate('pricing.costPerUsage'),
      maintenanceCosts: this.languageService.translate('pricing.maintenanceCosts'),
      expectedCasesPerYear: this.languageService.translate('pricing.expectedCases'),
      amortizationPeriod: this.languageService.translate('pricing.amortizationPeriod'),
      measurability: this.languageService.translate('pricing.complexity.benefitMeasurability'),
      inferenceCosts: this.languageService.translate('pricing.complexity.aiInferenceCosts'),
      complexityInputMethod: 'Eingabemethode für Komplexitätsbewertung',
      directComplexityScore: 'Direkter AI-Score',
      dataSourceDiversity: 'Datenquellenvielfalt',
      dataIntegrity: 'Datenintegrität',
      dataComplexity: 'Datenkomplexität',
      dataLinking: 'Datenverknüpfung',
      dataVolume: 'Datenvolumen',
      diseaseRarity: 'Seltenheit der Erkrankung',
      diagnosticAmbiguity: 'Diagnostische Mehrdeutigkeit',
      prognosticUncertainty: 'Prognostische Unsicherheit',
      multimorbidity: 'Multimorbidität',
      diseaseSeverity: 'Schweregrad der Erkrankung',
      differentialDiagnosticDepth: 'Differenzialdiagnostische Tiefe',
      prognosticPrecision: 'Prognostische Präzision',
      realTimeRequirement: 'Anforderung an die Echtzeit',
      interdisciplinaryRelevance: 'Interdisziplinäre Relevanz',
      dynamicAdaptability: 'Dynamische Anpassungsfähigkeit',
      automationLevel: 'Automatisierungsgrad',
      analysisDepth: 'Analyseebene',
      recommendationComplexity: 'Empfehlungskomplexität',
      guidelineIntegration: 'Integration von Leitlinien',
      patientSpecificIndividualization: 'Patientenspezifische Individualisierung',
      sector: this.languageService.translate('pricing.sector'),
      reimbursement: this.languageService.translate('pricing.reimbursement'),
      competition: this.languageService.translate('pricing.competition'),
      alternativeMethodCosts: 'Kosten der bisherigen Methode pro Fall',
      salesEffort: this.languageService.translate('pricing.implementation.salesComplexity'),
      implementation: this.languageService.translate('pricing.implementation.implementationComplexity'),
      customerFencing: 'Kundenbindung',
      deploymentType: this.languageService.translate('pricing.deploymentType'),
      installationFee: this.languageService.translate('pricing.installationFee'),
      salesChannel: this.languageService.translate('pricing.salesChannel'),
      partnerCommission: this.languageService.translate('pricing.partnerCommission'),
      upgradePath: this.languageService.translate('pricing.businessModel.upgradePath'),
      supportIntensity: this.languageService.translate('pricing.implementation.supportLevel'),
      pricingModel: this.languageService.translate('pricing.businessModel.pricingModel'),
      basePrice: this.languageService.translate('pricing.businessModel.basePrice'),
      hybridBaseFee: this.languageService.translate('pricing.businessModel.hybridSubscription'),
      hybridUsageFee: this.languageService.translate('pricing.businessModel.hybridUsageFee'),
      dacsBasePrice: this.languageService.translate('pricing.businessModel.basePrice'),
      profitMargin: this.languageService.translate('pricing.profitMargin')
    };
    return labels[control] || control;
  }

  /**
   * Returns form controls that need validation for the current phase
   */
  private getCurrentPhaseControls(): string[] {
    const phaseControls = {
      0: ['systemName', 'autonomy', 'developmentCosts', 'costPerUsage', 'maintenanceCosts', 'expectedCasesPerYear', 'amortizationPeriod'],
      1: this.getComplexityPhaseControls(),
      2: ['sector', 'reimbursement', 'competition'],
      3: ['salesEffort', 'implementation', 'customerFencing', 'deploymentType', 'salesChannel'],
      4: ['upgradePath', 'supportIntensity', 'pricingModel', 'basePrice', 'hybridBaseFee', 'hybridUsageFee', 'dacsBasePrice', 'profitMargin']
    };

    return phaseControls[this.currentPhase as keyof typeof phaseControls] || [];
  }

  /**
   * Returns complexity phase controls based on input method
   */
  private getComplexityPhaseControls(): string[] {
    const baseControls = ['measurability', 'inferenceCosts', 'complexityInputMethod'];
    const inputMethod = this.pricingForm.get('complexityInputMethod')?.value;
    
    if (inputMethod === 'direct') {
      return [...baseControls, 'directComplexityScore'];
    } else {
      return [...baseControls, 'dataSourceDiversity', 'dataIntegrity', 'dataComplexity', 'dataLinking', 'dataVolume',
              'diseaseRarity', 'diagnosticAmbiguity', 'prognosticUncertainty', 'multimorbidity', 'diseaseSeverity',
              'differentialDiagnosticDepth', 'prognosticPrecision', 'realTimeRequirement', 'interdisciplinaryRelevance', 'dynamicAdaptability',
              'automationLevel', 'analysisDepth', 'recommendationComplexity', 'guidelineIntegration', 'patientSpecificIndividualization'];
    }
  }

  /**
   * Saves current form data to local storage
   */
  saveFormData() {
    if (this.pricingForm.valid) {
      this.formData = { ...this.pricingForm.value };
      this.snackBar.open(this.translate('pricing.dataSaved'), 'OK', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    }
  }

  /**
   * Generates pricing recommendations and advances to results phase
   */
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

      this.snackBar.open(this.translate('pricing.recommendationGenerated'), 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    }
  }

  /**
   * Calculates comprehensive pricing recommendations based on all input parameters
   */
  calculatePricingRecommendations() {
    const formValue = this.pricingForm.value;
    
    const basePrice = formValue.basePrice || 0;
    const profitMargin = formValue.profitMargin || 20;
    const complexityScore = this.calculateComplexityScore();
    const costPerCase = this.calculateCostPerCase();
    const expectedCases = formValue.expectedCasesPerYear || 100;
    const developmentCosts = formValue.developmentCosts || 0;
    const maintenanceCosts = formValue.maintenanceCosts || 0;
    const costPerUsage = formValue.costPerUsage || 0;
    
    let recommendedPrice = basePrice;
    let pricingModel = formValue.pricingModel || 'license';
    
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
        recommendedPrice = this.calculateDACSPrices();
        break;
      default: // license
        if (complexityScore > 80) {
          recommendedPrice = basePrice * 1.5;
        } else if (complexityScore > 60) {
          recommendedPrice = basePrice * 1.2;
        }
        recommendedPrice = recommendedPrice * (1 + profitMargin / 100);
    }
    
    const marketStats = this.calculateMarketStats();
    const alternativeCosts = formValue.alternativeMethodCosts || 0;
    
    const totalCosts = developmentCosts + (maintenanceCosts * 5);
    let annualRevenue: number;
    
    if (typeof recommendedPrice === 'number') {
      annualRevenue = recommendedPrice * expectedCases;
    } else if (recommendedPrice && typeof recommendedPrice === 'object') {
      const priceObj = recommendedPrice as any;
      if (priceObj.baseFee && priceObj.usageFee) {
        annualRevenue = priceObj.baseFee + (priceObj.usageFee * expectedCases);
      } else if (priceObj.dynamic) {
        annualRevenue = priceObj.dynamic * expectedCases;
      } else {
        annualRevenue = 0;
      }
    } else {
      annualRevenue = 0;
    }
    
    const roi = totalCosts > 0 ? ((annualRevenue - totalCosts) / totalCosts) * 100 : 0;
    
    let breakEvenCases = 0;
    if (totalCosts > 0) {
      if (typeof recommendedPrice === 'number') {
        breakEvenCases = Math.ceil(totalCosts / recommendedPrice);
      } else if (recommendedPrice && typeof recommendedPrice === 'object') {
        const priceObj = recommendedPrice as any;
        if (priceObj.baseFee && priceObj.usageFee) {
          breakEvenCases = Math.ceil(totalCosts / priceObj.usageFee);
        } else if (priceObj.dynamic) {
          breakEvenCases = Math.ceil(totalCosts / priceObj.dynamic);
        }
      }
    }
    
    let yourPrice: number;
    if (typeof recommendedPrice === 'number') {
      yourPrice = recommendedPrice;
    } else if (recommendedPrice && typeof recommendedPrice === 'object') {
      const priceObj = recommendedPrice as any;
      if (priceObj.baseFee && priceObj.usageFee) {
        yourPrice = priceObj.baseFee + (priceObj.usageFee * expectedCases);
      } else if (priceObj.dynamic) {
        yourPrice = priceObj.dynamic;
      } else {
        yourPrice = 0;
      }
    } else {
      yourPrice = 0;
    }
    
    const marketComparison = {
      yourPrice: yourPrice,
      marketMin: marketStats.min,
      marketMax: marketStats.max,
      marketAvg: marketStats.avg,
      isCompetitive: yourPrice >= marketStats.min && yourPrice <= marketStats.max,
      alternativeCosts: alternativeCosts,
      costSavings: alternativeCosts > 0 ? alternativeCosts - yourPrice : 0
    };
    
    const dacsPrices = this.calculateDACSPrices();
    
    const installationFee = formValue.installationFee || 0;
    const partnerCommission = formValue.partnerCommission || 0;
    const totalImplementationCosts = installationFee + (partnerCommission > 0 ? yourPrice * partnerCommission / 100 : 0);
    
    return {
      systemType: formValue.autonomy || 'assistive',
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

  /**
   * Checks if results are available for display
   */
  hasResults(): boolean {
    return this.results && Object.keys(this.results).length > 0;
  }

  /**
   * Returns human-readable labels for system autonomy levels
   */
  getAutonomyLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'assistive': 'Assistive (Score 1-2)',
      'augmentative': 'Augmentative (Score 3-4)', 
      'autonomous': 'Autonomous (Score 5)'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  /**
   * Returns human-readable labels for benefit measurability
   */
  getMeasurabilityLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'high': 'Hoch messbar',
      'medium': 'Mittel messbar',
      'low': 'Schwer messbar'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  /**
   * Returns human-readable labels for AI inference costs
   */
  getInferenceCostsLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'low': 'Niedrig',
      'medium': 'Mittel', 
      'high': 'Hoch'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  /**
   * Returns human-readable labels for market sector
   */
  getSectorLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'public': 'Öffentlich',
      'private': 'Privat',
      'hybrid': 'Hybrid'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  /**
   * Returns human-readable labels for sales effort levels
   */
  getSalesEffortLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'low': 'Niedrig (<10%)',
      'medium': 'Mittel (10-25%)',
      'high': 'Hoch (>25%)'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  /**
   * Exports pricing recommendations as PDF
   */
  exportPDF() {
    if (!this.results || !this.pricingForm.valid) {
      this.snackBar.open(this.translate('pricing.noResultsToExport'), 'OK', {
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
          this.snackBar.open(this.translate('pricing.pdfExportStarted'), 'OK', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
        }, 500);
      } else {
        throw new Error(this.translate('pricing.popupBlocked'));
      }
    } catch (error) {
      this.snackBar.open(this.translate('pricing.exportError') + ': ' + (error instanceof Error ? error.message : this.translate('pricing.unknownError')), 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }

  /**
   * Generates HTML content for PDF export
   */
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

  /**
   * Generates HTML content for results section in PDF
   */
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


  /**
   * Exports pricing recommendations as JSON file
   */
  exportJSON() {
    if (!this.results || !this.pricingForm.valid) {
      this.snackBar.open(this.translate('pricing.noResultsToExport'), 'OK', {
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

      this.snackBar.open(this.translate('pricing.jsonExportSuccessful'), 'OK', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    } catch (error) {
      this.snackBar.open(this.translate('pricing.exportError') + ': ' + (error instanceof Error ? error.message : this.translate('pricing.unknownError')), 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }
}
