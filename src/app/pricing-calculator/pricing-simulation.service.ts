import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

// --- Interfaces ---

export interface SimulationInput {
  numberOfUsers: number;
  numberOfRequests: number;
  aiScore: number;
  pricePerUser: number;
  pricePerRequest: number;
  aiScoreReferencePrice: number;
  description?: string; // Optional
}

export interface PricingModelResult {
  modelName: 'monthly' | 'volume' | 'aiScore';
  cost: number | null; // Null if model was not selected
  calculation: string | null; // Added to store the formula string
}

export interface SimulationResult {
  id: string;
  timestamp: Date;
  input: SimulationInput;
  results: PricingModelResult[];
  description?: string;
}

// --- Configuration (Placeholder - could be loaded from elsewhere later) ---

@Injectable({
  providedIn: 'root' // Provide the service globally
})
export class PricingSimulationService {

  // Store simulations in memory for now
  private simulationHistory: SimulationResult[] = [];

  constructor() { }

  // --- Calculation Logic ---

  calculateMonthlyCost(input: SimulationInput): number {
    // Calculate Annual Cost
    return input.numberOfUsers * input.pricePerUser * 12;
  }

  calculateVolumeCost(input: SimulationInput): number {
    // Calculate Annual Cost
    return input.numberOfRequests * input.pricePerRequest * 12;
  }

  calculateAiScoreCost(input: SimulationInput): number {
    // Calculate Annual Cost using Reference Price
    return input.aiScore * input.numberOfRequests * input.aiScoreReferencePrice * 12;
  }

  // --- Simulation Execution ---

  runSimulation(
    input: SimulationInput,
    calculateMonthly: boolean,
    calculateVolume: boolean,
    calculateAiScore: boolean
  ): SimulationResult {

    const results: PricingModelResult[] = [
      {
        modelName: 'monthly',
        cost: calculateMonthly ? this.calculateMonthlyCost(input) : null,
        calculation: calculateMonthly ? `(${input.numberOfUsers} Nutzer * ${input.pricePerUser} €/Nutzer/Monat * 12 Monate)` : null
      },
      {
        modelName: 'volume',
        cost: calculateVolume ? this.calculateVolumeCost(input) : null,
        calculation: calculateVolume ? `(${input.numberOfRequests} Anfragen/Monat * ${input.pricePerRequest} €/Anfrage * 12 Monate)` : null
      },
      {
        modelName: 'aiScore',
        cost: calculateAiScore ? this.calculateAiScoreCost(input) : null,
        calculation: calculateAiScore ? `(${input.aiScore} Score * ${input.numberOfRequests} Anfragen/Monat * ${input.aiScoreReferencePrice} €/Anfrage/Score * 12 Monate)` : null
      }
    ];

    const simulation: SimulationResult = {
      id: uuidv4(), // Generate unique ID
      timestamp: new Date(),
      input: input,
      results: results,
      description: input.description
    };

    this.simulationHistory.push(simulation);
    // Keep history manageable (e.g., last 50 simulations) - adjust as needed
    if (this.simulationHistory.length > 50) {
      this.simulationHistory.shift();
    }

    return simulation;
  }

  // --- Data Access ---

  getSimulationHistory(): SimulationResult[] {
    // Return a copy to prevent direct modification
    return [...this.simulationHistory];
  }

  // --- Helper ---
  // Could add methods here later for filtering, duplicating, etc.
} 