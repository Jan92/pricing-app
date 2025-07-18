import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';
import { Dimension, Criterion } from '../models/score.model';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable, switchMap, of } from 'rxjs';
import { tap } from 'rxjs/operators';

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
    private fb: FormBuilder
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
      const label = criterion.scale[score] || this.scoreService.getDefaultScaleLabels()[score] || `Score ${score}`;
      formArray.push(new FormControl(label));
    });
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
    
    alert('Skalenbeschriftungen wurden auf Standardwerte zurückgesetzt.');
  }
}
