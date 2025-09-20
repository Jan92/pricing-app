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
              this.scoreForm.patchValue({ evaluationId: existing.evaluationId, ...existing.dimensionValues });
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
      alert(this.languageService.translate('common.dataSaved') + ' ' + this.evaluationId);
      
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
}
