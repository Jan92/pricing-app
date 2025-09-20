import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';
import { Dimension, Criterion } from '../models/score.model';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable, switchMap, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-score-properties',
  standalone: false,
  templateUrl: './score-properties.component.html',
  styleUrl: './score-properties.component.css'
})
export class ScorePropertiesComponent implements OnInit {
  dimensions$: Observable<Dimension[]>;
  selectedDimension: Dimension | null = null;
  selectedCriterion: Criterion | null = null;
  
  scaleForm: FormGroup;
  scoreRange = [1, 2, 3, 4, 5]; // Default score range

  // Mobile step logic
  isMobile = false;
  mobileStep = 0; // 0: dimension, 1: criteria, 2: scale

  constructor(
    private scoreService: ScoreService,
    private fb: FormBuilder,
    private languageService: LanguageService
  ) {
    this.dimensions$ = this.scoreService.getDimensions();
    // FormArray direkt mit leeren Controls für die Score-Range initialisieren
    this.scaleForm = this.fb.group({
      scaleLabels: this.fb.array(this.scoreRange.map(() => new FormControl('')))
    });
  }

  ngOnInit(): void {
    this.isMobile = window.matchMedia('(max-width: 600px)').matches;
    window.addEventListener('resize', () => {
      this.isMobile = window.matchMedia('(max-width: 600px)').matches;
    });
  }
  
  // Retrieve the form array for scale labels
  get scaleLabels(): FormArray {
    return this.scaleForm.get('scaleLabels') as FormArray;
  }

  // When a dimension is selected
  onSelectDimension(dimension: Dimension): void {
    this.selectedDimension = dimension;
    this.selectedCriterion = null; // Reset criterion selection
    if (this.isMobile) {
      this.mobileStep = 1;
    }
  }

  // When a criterion is selected
  onSelectCriterion(criterion: Criterion): void {
    this.selectedCriterion = criterion;
    this.resetScaleForm(criterion);
    if (this.isMobile) {
      this.mobileStep = 2;
    }
  }

  goBackMobileStep(): void {
    if (this.mobileStep > 0) {
      this.mobileStep--;
      if (this.mobileStep === 1) {
        this.selectedCriterion = null;
      }
      if (this.mobileStep === 0) {
        this.selectedDimension = null;
        this.selectedCriterion = null;
      }
    }
  }

  // Reset the form with the criterion's values
  resetScaleForm(criterion: Criterion): void {
    if (!criterion) return;
    // Clear the form array
    const formArray = this.scaleForm.get('scaleLabels') as FormArray;
    while (formArray.length > 0) {
      formArray.removeAt(0);
    }
    
    // Add controls for each score in the range
    this.scoreRange.forEach(score => {
      // Try to get translated label first, then fallback to criterion scale, then default
      const translatedLabel = this.getTranslatedScoreLabel(criterion.id, score);
      const label = translatedLabel || criterion.scale[score] || this.scoreService.getDefaultScaleLabels()[score] || `Score ${score}`;
      formArray.push(new FormControl(label));
    });
  }

  // Helper method to get translated score labels for a criterion
  private getTranslatedScoreLabel(criterionId: string, score: number): string | null {
    const scoreLabels = this.languageService.translate(`properties.${criterionId}.scoreLabels`) as any;
    if (scoreLabels && typeof scoreLabels === 'object' && scoreLabels[score.toString()]) {
      return scoreLabels[score.toString()];
    }
    return null;
  }

  // Save the form values to the criterion
  saveScaleLabels(): void {
    if (!this.selectedDimension || !this.selectedCriterion) return;
    
    const updatedScale: {[key: number]: string} = {};
    
    this.scoreRange.forEach((score, index) => {
      updatedScale[score] = this.scaleLabels.at(index).value;
    });
    
    this.scoreService.updateCriterionScaleLabels(
      this.selectedDimension.id,
      this.selectedCriterion.id,
      updatedScale
    );
    
    alert('Skalenbeschriftungen wurden gespeichert.');
  }

  // Reset to default labels
  resetToDefaults(): void {
    if (!this.selectedDimension || !this.selectedCriterion) return;
    
    this.scoreService.resetCriterionScaleLabels(
      this.selectedDimension.id,
      this.selectedCriterion.id
    );
    
    // Update the form with new values
    this.resetScaleForm(this.selectedCriterion);
    
    alert(this.languageService.translate('properties.resetDefaults') + ' - ' + this.languageService.translate('common.dataSaved'));
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  // Helper method to get translated dimension name
  getTranslatedDimensionName(dimensionId: string): string {
    const dimensionTranslations: { [key: string]: string } = {
      'dataComplexity': this.translate('dimensions.dataComplexity'),
      'diseaseComplexity': this.translate('dimensions.diseaseComplexity'),
      'questionDifficulty': this.translate('dimensions.questionDifficulty'),
      'aiSupportExtent': this.translate('dimensions.aiSupportExtent')
    };
    return dimensionTranslations[dimensionId] || dimensionId;
  }

  // Helper method to get translated criterion name
  getTranslatedCriterionName(criterionId: string): string {
    const criterionTranslations: { [key: string]: string } = {
      'sourceVariety': this.translate('criteria.sourceVariety'),
      'dataIntegrity': this.translate('criteria.dataIntegrity'),
      'dataComplexityLevel': this.translate('criteria.dataComplexityLevel'),
      'dataLinking': this.translate('criteria.dataLinking'),
      'dataVolume': this.translate('criteria.dataVolume'),
      'diseaseRarity': this.translate('criteria.diseaseRarity'),
      'diagnosticAmbiguity': this.translate('criteria.diagnosticAmbiguity'),
      'prognosticUncertainty': this.translate('criteria.prognosticUncertainty'),
      'multimorbidity': this.translate('criteria.multimorbidity'),
      'diseaseSeverity': this.translate('criteria.diseaseSeverity'),
      'differentialDepth': this.translate('criteria.differentialDepth'),
      'prognosticPrecision': this.translate('criteria.prognosticPrecision'),
      'realtimeRequirement': this.translate('criteria.realtimeRequirement'),
      'interdisciplinaryRelevance': this.translate('criteria.interdisciplinaryRelevance'),
      'dynamicAdaptability': this.translate('criteria.dynamicAdaptability'),
      'automationLevel': this.translate('criteria.automationLevel'),
      'analysisLevel': this.translate('criteria.analysisLevel'),
      'recommendationComplexity': this.translate('criteria.recommendationComplexity'),
      'guidelineIntegration': this.translate('criteria.guidelineIntegration'),
      'patientIndividualization': this.translate('criteria.patientIndividualization')
    };
    return criterionTranslations[criterionId] || criterionId;
  }
}
