import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import * as XLSX from 'xlsx'; // Import the xlsx library

import { PricingSimulationService, SimulationResult, SimulationInput } from './pricing-simulation.service';
import { FindCostPipe } from './find-cost.pipe';

@Component({
  selector: 'app-pricing-calculator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FindCostPipe,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './pricing-calculator.component.html',
  styleUrl: './pricing-calculator.component.css'
})
export class PricingCalculatorComponent implements OnInit {
  simulationForm: FormGroup;
  latestSimulation: SimulationResult | null = null;
  simulationHistory: SimulationResult[] = [];

  // Series Simulation Properties for PricingCalculator
  isSeriesMode: boolean = false;
  seriesParameterOptions: { value: string, label: string }[] = [
    { value: 'numberOfUsers', label: 'Anzahl Nutzer' },
    { value: 'numberOfRequests', label: 'Anzahl Anfragen pro Monat' },
    { value: 'aiScore', label: 'KI-Score' },
    { value: 'pricePerUser', label: 'Monatlicher Preis pro Nutzer (€)' },
    { value: 'pricePerRequest', label: 'Preis pro Anfrage (€)' },
    { value: 'aiScoreReferencePrice', label: 'KI Score Referenzpreis (€)' }
  ];
  selectedSeriesParameter: string = 'numberOfUsers'; // Default selection
  seriesValuesString: string = ''; // e.g., "10, 50, 100"
  
  // To store results of a series run
  latestSeriesSimulationRun: { 
    parameter: string; 
    inputValue: number; 
    scenarios: { type: string, value: number, result: SimulationResult | null }[] 
  }[] = [];

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

      if (this.isSeriesMode && this.selectedSeriesParameter && this.seriesValuesString) {
        const seriesValues = this.seriesValuesString.split(',')
                              .map(v => parseFloat(v.trim()))
                              .filter(v => !isNaN(v)); 
        
        if (seriesValues.length === 0) {
          alert('Bitte gültige Zahlen für die Seriensimulation eingeben.');
          return;
        }

        this.latestSeriesSimulationRun = []; // Clear previous series results
        this.latestSimulation = null; // Clear single simulation result display

        seriesValues.forEach(val => {
          const scenariosMeta = [
            { type: 'original', multiplier: 1 },
            { type: 'half', multiplier: 0.5 },
            { type: 'double', multiplier: 2 },
            { type: 'triple', multiplier: 3 },
          ];

          const scenariosForValue: { type: string, value: number, result: SimulationResult | null }[] = [];

          scenariosMeta.forEach(scenario => {
            const scenarioValue = this.selectedSeriesParameter === 'aiScore' ? 
                                  Math.max(0, Math.min(100, Math.round(val * scenario.multiplier))) :
                                  Math.max(0, Math.round(val * scenario.multiplier)); // Ensure aiScore is within 0-100, others >= 0

            const tempFormValue = { ...formValue }; // Create a copy of base form values
            tempFormValue[this.selectedSeriesParameter] = scenarioValue;

            const input: SimulationInput = {
              numberOfUsers: tempFormValue.numberOfUsers,
              numberOfRequests: tempFormValue.numberOfRequests,
              aiScore: tempFormValue.aiScore,
              pricePerUser: tempFormValue.pricePerUser,
              pricePerRequest: tempFormValue.pricePerRequest,
              aiScoreReferencePrice: tempFormValue.aiScoreReferencePrice,
              // Description for series runs could be auto-generated or omitted for simplicity here
              description: `${formValue.description || 'Series'} (${this.seriesParameterOptions.find(p=>p.value === this.selectedSeriesParameter)?.label}: ${scenarioValue}, ${scenario.type})` 
            };

            const simResult = this.simulationService.runSimulation(
              input,
              tempFormValue.calculateMonthly,
              tempFormValue.calculateVolume,
              tempFormValue.calculateAiScore
            );
            scenariosForValue.push({ type: scenario.type, value: scenarioValue, result: simResult });
          });
          this.latestSeriesSimulationRun.push({ parameter: this.selectedSeriesParameter, inputValue: val, scenarios: scenariosForValue });
        });
        this.loadHistory(); // Refresh history as series runs also add to it

      } else {
        // Standard single simulation
        this.latestSeriesSimulationRun = []; // Clear series display
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
        this.loadHistory();
      }
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

  getSeriesParameterLabel(parameterValue: string): string {
    const param = this.seriesParameterOptions.find(p => p.value === parameterValue);
    return param ? param.label : parameterValue;
  }

  exportToExcel(): void {
    if (this.isSeriesMode && this.latestSeriesSimulationRun.length > 0) {
      this.exportSeriesResultsToExcel();
    } else if (!this.isSeriesMode && this.latestSimulation) {
      this.exportSingleResultToExcel();
    } else {
      alert('Keine Daten zum Exportieren vorhanden.');
    }
  }

  private exportSingleResultToExcel(): void {
    if (!this.latestSimulation) return;

    const simulation = this.latestSimulation;
    const dataToExport: any[][] = [
      ['Simulations-ID', simulation.id],
      ['Zeitstempel', new Date(simulation.timestamp).toLocaleString('de-DE')],
      ['Beschreibung', simulation.description || '-'],
      [], // Empty row separator
      ['Eingabeparameter'],
      ['Parameter', 'Wert'],
      ['Anzahl Nutzer', simulation.input.numberOfUsers],
      ['Anzahl Anfragen/Monat', simulation.input.numberOfRequests],
      ['KI-Score', simulation.input.aiScore],
      ['Monatl. Preis/Nutzer (€)', simulation.input.pricePerUser],
      ['Preis/Anfrage (€)', simulation.input.pricePerRequest],
      ['KI Score Referenzpreis (€)', simulation.input.aiScoreReferencePrice],
      [], // Empty row separator
      ['Ergebnisse Jahreskosten'],
      ['Modell', 'Kosten (€)', 'Berechnungsdetails']
    ];

    simulation.results.forEach(res => {
      if (res.cost !== null) {
        dataToExport.push([res.modelName, res.cost, res.calculation]);
      }
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);
    // Set column widths (optional, for better readability)
    ws['!cols'] = [{ wch: 30 }, { wch: 20 }, { wch: 50 }]; 
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Simulation Ergebnis');
    XLSX.writeFile(wb, `Pricing_Simulation_${simulation.id.substring(0,8)}.xlsx`);
  }

  private exportSeriesResultsToExcel(): void {
    if (!this.latestSeriesSimulationRun || this.latestSeriesSimulationRun.length === 0) return;

    const dataToExport: any[][] = [];
    const variedParamLabel = this.getSeriesParameterLabel(this.latestSeriesSimulationRun[0].parameter);

    // Header Row
    dataToExport.push([
      `Variierter Parameter: ${variedParamLabel}`,
      'Ursprungswert des variierten Parameters',
      'Szenario-Typ',
      'Szenario-Wert des variierten Parameters',
      'Monatliche Kosten (€)',
      'Volumenbasierte Kosten (€)',
      'KI-Score-basierte Kosten (€)',
      'Simulationsbeschreibung' // From individual simulation run
    ]);

    this.latestSeriesSimulationRun.forEach(runPart => {
      runPart.scenarios.forEach(scenario => {
        if (scenario.result) {
          const monthlyCost = scenario.result.results.find(r => r.modelName === 'monthly')?.cost ?? 'N/V';
          const volumeCost = scenario.result.results.find(r => r.modelName === 'volume')?.cost ?? 'N/V';
          const aiScoreCost = scenario.result.results.find(r => r.modelName === 'aiScore')?.cost ?? 'N/V';
          
          dataToExport.push([
            '', // Varied parameter label only in header or first row of group
            runPart.inputValue, // Original value for the series parameter for this group of scenarios
            scenario.type,
            scenario.value, // Actual value of the varied parameter used in this scenario
            monthlyCost,
            volumeCost,
            aiScoreCost,
            scenario.result.description || '-'
          ]);
        }
      });
      dataToExport.push([]); // Add an empty row between groups of scenarios for different input values
    });

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(dataToExport);
     // Set column widths
    ws['!cols'] = [
        { wch: 30 }, { wch: 20 }, { wch: 15 }, { wch: 20 }, 
        { wch: 20 }, { wch: 25 }, { wch: 25 }, { wch: 40 }
    ];
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Seriensimulation Ergebnisse');
    XLSX.writeFile(wb, `Pricing_Series_Simulation_${new Date().toISOString().substring(0,10)}.xlsx`);
  }
}
