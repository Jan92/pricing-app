import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ScoreService } from '../score.service';
import { Dimension, ScoreInput, Criterion } from '../models/score.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-data-input',
  standalone: false,
  templateUrl: './data-input.component.html',
  styleUrl: './data-input.component.css'
})
export class DataInputComponent implements OnInit {
  dimensions$: Observable<Dimension[]>;
  scoreForm: FormGroup;
  evaluationId: string = 'eval_' + Date.now(); // Simple unique ID for this session
  showSuccessMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private scoreService: ScoreService,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.scoreForm = this.fb.group({ // Initialize with an empty group
        evaluationId: [this.evaluationId, Validators.required],
        name: ['', Validators.required]
    });
    this.dimensions$ = this.scoreService.getDimensions();
  }

  ngOnInit(): void {
    // Check if editing
    this.route.paramMap.subscribe(params => {
      const evalId = params.get('evaluationId');
      if (evalId) {
        this.evaluationId = evalId;
        // Try to load existing input
        this.scoreService.getScoreInputs().subscribe(inputs => {
          const existing = inputs.find(i => i.evaluationId === evalId);
          if (existing) {
            this.dimensions$.subscribe(dims => {
              this.buildForm(dims);
              // Patch form with existing values
              this.scoreForm.patchValue({ 
                evaluationId: existing.evaluationId, 
                name: existing.name,
                ...existing.dimensionValues 
              });
              // Patch each dimension group
              Object.keys(existing.dimensionValues).forEach(dimId => {
                if (this.scoreForm.get(dimId)) {
                  this.scoreForm.get(dimId)?.patchValue(existing.dimensionValues[dimId]);
                }
              });
            });
          } else {
            this.dimensions$.subscribe(dims => this.buildForm(dims));
          }
        });
      } else {
        this.dimensions$.subscribe(dims => this.buildForm(dims));
      }
    });
  }

  buildForm(dimensions: Dimension[]): void {
     const dimensionGroups = dimensions.reduce((acc, dim) => {
      const criteriaControls = dim.criteria.reduce((critAcc, crit) => {
        // Default to score 1, or load existing value if available (e.g., editing)
        critAcc[crit.id] = this.fb.control(1, Validators.required); 
        return critAcc;
      }, {} as { [key: string]: FormControl });
      acc[dim.id] = this.fb.group(criteriaControls);
      return acc;
    }, {} as { [key: string]: FormGroup });

     // Replace the controls in the existing form group
     // Clear existing dimension controls first
    Object.keys(this.scoreForm.controls).forEach(key => {
        if (key !== 'evaluationId' && key !== 'name') {
            this.scoreForm.removeControl(key);
        }
    });
    // Add new dimension controls
    Object.keys(dimensionGroups).forEach(key => {
        this.scoreForm.addControl(key, dimensionGroups[key]);
    });
  }

  onSubmit(): void {
    if (this.scoreForm.valid) {
      const formValue = this.scoreForm.value;
      const scoreInput: ScoreInput = {
        evaluationId: formValue.evaluationId,
        name: formValue.name, // Include the name in the score input
        dimensionValues: {}
      };

      // Extract dimension values correctly
      Object.keys(formValue).forEach(key => {
        if (key !== 'evaluationId' && key !== 'name') {
          scoreInput.dimensionValues[key] = formValue[key];
        }
      });

      this.scoreService.saveScoreInput(scoreInput);
      console.log('Score Input Saved:', scoreInput);
      
      // Show success message
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 3000); // Hide after 3 seconds
      
      // Reset form for a new evaluation
      this.evaluationId = 'eval_' + Date.now();
      this.scoreForm.reset({ evaluationId: this.evaluationId });
      this.dimensions$.subscribe(dims => this.buildForm(dims)); // Rebuild form with defaults

    } else {
      console.error('Form is invalid');
      alert(this.languageService.translate('common.fillAllFields'));
    }
  }

  // Helper to get score labels for radio buttons
  getScoreLabel(dimensionId: string, criterionId: string, score: number): string {
      return this.scoreService.getScoreLabel(dimensionId, criterionId, score);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  // Helper method to get translated dimension name
  getTranslatedDimensionName(dimensionId: string): string {
    const dimensionTranslations: { [key: string]: string } = {
      'dataComplexity': this.translate('input.dataComplexity'),
      'diseaseComplexity': this.translate('input.diseaseComplexity'),
      'questionDifficulty': this.translate('input.questionComplexity'),
      'aiSupportExtent': this.translate('input.aiSupport')
    };
    return dimensionTranslations[dimensionId] || dimensionId;
  }

  // Helper method to get translated criterion name and description
  getTranslatedCriterionInfo(criterionId: string): { name: string, description: string } {
    const criterionTranslations: { [key: string]: { name: string, description: string } } = {
      'sourceVariety': { name: this.translate('input.dataSourceDiversity'), description: '' },
      'dataIntegrity': { name: this.translate('input.dataIntegrity'), description: '' },
      'dataComplexityLevel': { name: this.translate('input.dataComplexityLevel'), description: '' },
      'dataLinking': { name: this.translate('input.dataLinking'), description: '' },
      'dataVolume': { name: this.translate('input.dataVolume'), description: '' },
      'diseaseRarity': { name: this.translate('input.diseaseRarity'), description: '' },
      'diagnosticAmbiguity': { name: this.translate('input.diagnosticAmbiguity'), description: '' },
      'prognosticUncertainty': { name: this.translate('input.prognosticUncertainty'), description: '' },
      'multimorbidity': { name: this.translate('input.multimorbidity'), description: '' },
      'diseaseSeverity': { name: this.translate('input.diseaseSeverity'), description: '' },
      'differentialDepth': { name: this.translate('input.differentialDiagnosticDepth'), description: '' },
      'prognosticPrecision': { name: this.translate('input.prognosticPrecision'), description: '' },
      'realtimeRequirement': { name: this.translate('input.realTimeRequirement'), description: '' },
      'interdisciplinaryRelevance': { name: this.translate('input.interdisciplinaryRelevance'), description: '' },
      'dynamicAdaptability': { name: this.translate('input.dynamicAdaptability'), description: '' },
      'automationLevel': { name: this.translate('input.automationLevel'), description: '' },
      'analysisLevel': { name: this.translate('input.analysisDepth'), description: '' },
      'recommendationComplexity': { name: this.translate('input.recommendationComplexity'), description: '' },
      'guidelineIntegration': { name: this.translate('input.guidelineIntegration'), description: '' },
      'patientIndividualization': { name: this.translate('input.patientSpecificIndividualization'), description: '' }
    };
    return criterionTranslations[criterionId] || { name: criterionId, description: '' };
  }
}
