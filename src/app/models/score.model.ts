export interface Criterion {
  id: string;
  name: string;
  description: string;
  scale: { [key: number]: string }; // Represents scores 1-5 and their descriptions
  value?: number; // To store user input later
}

export interface Dimension {
  id: string;
  name: string;
  criteria: Criterion[];
}

// This will hold the user's input for a specific evaluation
export interface ScoreInput {
  evaluationId: string; // Identifier for this specific evaluation
  dimensionValues: {
    [dimensionId: string]: {
      [criterionId: string]: number;
    };
  };
}

// Structure to hold the calculated score
export interface ScoreResult {
  evaluationId: string;
  dimensionScores: {
    [dimensionId: string]: number;
  };
  totalScore: number;
} 