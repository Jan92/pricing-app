import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { PricingSimulationService, SimulationResult, SimulationInput } from './pricing-simulation.service';
import { FindCostPipe } from './find-cost.pipe';

@Component({
  selector: 'app-pricing-calculator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FindCostPipe,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './pricing-calculator.component.html',
  styleUrl: './pricing-calculator.component.css'
})
export class PricingCalculatorComponent implements OnInit {
  simulationForm: FormGroup;
  latestSimulation: SimulationResult | null = null;
  simulationHistory: SimulationResult[] = [];

  constructor(
    private fb: FormBuilder,
    private simulationService: PricingSimulationService
  ) {
    this.simulationForm = this.fb.group({
      // Inputs
      numberOfUsers: [10, [Validators.required, Validators.min(1)]],
      numberOfRequests: [1000, [Validators.required, Validators.min(0)]],
      aiScore: [50, [Validators.required, Validators.min(0), Validators.max(100)]], // Assuming score is 0-100
      pricePerUser: [10, [Validators.required, Validators.min(0)]],
      pricePerRequest: [0.05, [Validators.required, Validators.min(0)]],
      aiScoreReferencePrice: [0.01, [Validators.required, Validators.min(0)]],
      description: [''],
      // Model Selection
      calculateMonthly: [true],
      calculateVolume: [true],
      calculateAiScore: [true]
    });
  }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.simulationHistory = this.simulationService.getSimulationHistory();
  }

  onSubmit(): void {
    if (this.simulationForm.valid) {
      const formValue = this.simulationForm.value;

      const input: SimulationInput = {
        numberOfUsers: formValue.numberOfUsers,
        numberOfRequests: formValue.numberOfRequests,
        aiScore: formValue.aiScore,
        pricePerUser: formValue.pricePerUser,
        pricePerRequest: formValue.pricePerRequest,
        aiScoreReferencePrice: formValue.aiScoreReferencePrice,
        description: formValue.description
      };

      this.latestSimulation = this.simulationService.runSimulation(
        input,
        formValue.calculateMonthly,
        formValue.calculateVolume,
        formValue.calculateAiScore
      );

      // Update history display
      this.loadHistory();

      // Optional: Reset parts of the form after submission if needed
      // this.simulationForm.patchValue({ description: '' });
    } else {
      // Mark all fields as touched to show validation errors
      this.simulationForm.markAllAsTouched();
      console.error('Form is invalid');
    }
  }

  // Helper to easily access form controls in the template
  get f() { return this.simulationForm.controls; }
}
