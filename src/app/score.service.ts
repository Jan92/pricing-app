import { Injectable } from '@angular/core';
import { Dimension, ScoreInput, ScoreResult, Criterion, SCORING_DIMENSIONS, SeriesScenarioResult, SeriesSimulationRun } from './models/score.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  // BehaviorSubject for dimensions, initialized with the imported constant
  private dimensionsSubject = new BehaviorSubject<Dimension[]>(SCORING_DIMENSIONS);

  // In-memory storage for score inputs and results (replace with backend later)
  private scoreInputs = new BehaviorSubject<ScoreInput[]>([]);
  private scoreResults = new BehaviorSubject<ScoreResult[]>([]);
  private seriesSimulationRuns = new BehaviorSubject<SeriesSimulationRun[]>([]);

  // Default scale labels used when no custom labels are defined
  private defaultScaleLabels = {
    1: 'Niedrig',
    2: 'Unterdurchschnittlich',
    3: 'Durchschnittlich',
    4: 'Überdurchschnittlich',
    5: 'Hoch'
  };

  constructor(private languageService: LanguageService) { 
    // Preconfigured scores
    const preconfiguredScores: ScoreInput[] = [
      {
        evaluationId: 'ct-befundung',
        name: 'CT-Befundung',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 3,
            dataIntegrity: 5,
            dataComplexityLevel: 4,
            dataLinking: 2,
            dataVolume: 4
          },
          diseaseComplexity: {
            diseaseRarity: 3,
            diagnosticAmbiguity: 3,
            prognosticUncertainty: 4,
            multimorbidity: 3,
            diseaseSeverity: 4
          },
          questionDifficulty: {
            differentialDepth: 4,
            prognosticPrecision: 3,
            realtimeRequirement: 4,
            interdisciplinaryRelevance: 3,
            dynamicAdaptability: 2
          },
          aiSupportExtent: {
            automationLevel: 3,
            analysisLevel: 4,
            recommendationComplexity: 3,
            guidelineIntegration: 3,
            patientIndividualization: 4
          }
        }
      },
      {
        evaluationId: 'befundung-endokrinologie',
        name: 'Befundung Endokrinologie',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 2,
            dataIntegrity: 4,
            dataComplexityLevel: 2,
            dataLinking: 3,
            dataVolume: 3
          },
          diseaseComplexity: {
            diseaseRarity: 3,
            diagnosticAmbiguity: 4,
            prognosticUncertainty: 3,
            multimorbidity: 4,
            diseaseSeverity: 3
          },
          questionDifficulty: {
            differentialDepth: 4,
            prognosticPrecision: 4,
            realtimeRequirement: 2,
            interdisciplinaryRelevance: 3,
            dynamicAdaptability: 3
          },
          aiSupportExtent: {
            automationLevel: 3,
            analysisLevel: 3,
            recommendationComplexity: 3,
            guidelineIntegration: 4,
            patientIndividualization: 4
          }
        }
      },
      {
        evaluationId: 'befundung-gerinnung',
        name: 'Befundung Gerinnung',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 2,
            dataIntegrity: 5,
            dataComplexityLevel: 2,
            dataLinking: 3,
            dataVolume: 2
          },
          diseaseComplexity: {
            diseaseRarity: 2,
            diagnosticAmbiguity: 3,
            prognosticUncertainty: 3,
            multimorbidity: 3,
            diseaseSeverity: 4
          },
          questionDifficulty: {
            differentialDepth: 3,
            prognosticPrecision: 3,
            realtimeRequirement: 3,
            interdisciplinaryRelevance: 2,
            dynamicAdaptability: 3
          },
          aiSupportExtent: {
            automationLevel: 4,
            analysisLevel: 3,
            recommendationComplexity: 3,
            guidelineIntegration: 4,
            patientIndividualization: 3
          }
        }
      },
      {
        evaluationId: 'befundung-mikrobiologie',
        name: 'Befundung Mikrobiologie (Sepsisdiagnostik)',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 3,
            dataIntegrity: 4,
            dataComplexityLevel: 4,
            dataLinking: 4,
            dataVolume: 3
          },
          diseaseComplexity: {
            diseaseRarity: 2,
            diagnosticAmbiguity: 4,
            prognosticUncertainty: 5,
            multimorbidity: 5,
            diseaseSeverity: 5
          },
          questionDifficulty: {
            differentialDepth: 4,
            prognosticPrecision: 3,
            realtimeRequirement: 5,
            interdisciplinaryRelevance: 4,
            dynamicAdaptability: 5
          },
          aiSupportExtent: {
            automationLevel: 4,
            analysisLevel: 5,
            recommendationComplexity: 5,
            guidelineIntegration: 5,
            patientIndividualization: 5
          }
        }
      },
      {
        evaluationId: 'befundung-kardiologie',
        name: 'Befundung Kardiologie (EKG-Analyse)',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 2,
            dataIntegrity: 5,
            dataComplexityLevel: 3,
            dataLinking: 3,
            dataVolume: 3
          },
          diseaseComplexity: {
            diseaseRarity: 2,
            diagnosticAmbiguity: 3,
            prognosticUncertainty: 3,
            multimorbidity: 4,
            diseaseSeverity: 4
          },
          questionDifficulty: {
            differentialDepth: 3,
            prognosticPrecision: 3,
            realtimeRequirement: 5,
            interdisciplinaryRelevance: 3,
            dynamicAdaptability: 4
          },
          aiSupportExtent: {
            automationLevel: 4,
            analysisLevel: 4,
            recommendationComplexity: 4,
            guidelineIntegration: 4,
            patientIndividualization: 3
          }
        }
      },
      {
        evaluationId: 'radiologische-tumorbefundung',
        name: 'Radiologische Tumorbefundung',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 4,
            dataIntegrity: 4,
            dataComplexityLevel: 5,
            dataLinking: 4,
            dataVolume: 5
          },
          diseaseComplexity: {
            diseaseRarity: 3,
            diagnosticAmbiguity: 4,
            prognosticUncertainty: 5,
            multimorbidity: 4,
            diseaseSeverity: 5
          },
          questionDifficulty: {
            differentialDepth: 5,
            prognosticPrecision: 4,
            realtimeRequirement: 4,
            interdisciplinaryRelevance: 5,
            dynamicAdaptability: 4
          },
          aiSupportExtent: {
            automationLevel: 3,
            analysisLevel: 5,
            recommendationComplexity: 4,
            guidelineIntegration: 5,
            patientIndividualization: 5
          }
        }
      },
      {
        evaluationId: 'genetische-diagnostik',
        name: 'Genetische Diagnostik (z.B. Erbkrankheiten)',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 5,
            dataIntegrity: 4,
            dataComplexityLevel: 5,
            dataLinking: 5,
            dataVolume: 5
          },
          diseaseComplexity: {
            diseaseRarity: 5,
            diagnosticAmbiguity: 4,
            prognosticUncertainty: 4,
            multimorbidity: 3,
            diseaseSeverity: 5
          },
          questionDifficulty: {
            differentialDepth: 4,
            prognosticPrecision: 4,
            realtimeRequirement: 2,
            interdisciplinaryRelevance: 4,
            dynamicAdaptability: 3
          },
          aiSupportExtent: {
            automationLevel: 2,
            analysisLevel: 5,
            recommendationComplexity: 4,
            guidelineIntegration: 4,
            patientIndividualization: 5
          }
        }
      },
      {
        evaluationId: 'allergiediagnostik',
        name: 'Allergiediagnostik',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 2,
            dataIntegrity: 4,
            dataComplexityLevel: 2,
            dataLinking: 2,
            dataVolume: 2
          },
          diseaseComplexity: {
            diseaseRarity: 2,
            diagnosticAmbiguity: 2,
            prognosticUncertainty: 2,
            multimorbidity: 3,
            diseaseSeverity: 2
          },
          questionDifficulty: {
            differentialDepth: 2,
            prognosticPrecision: 3,
            realtimeRequirement: 3,
            interdisciplinaryRelevance: 2,
            dynamicAdaptability: 2
          },
          aiSupportExtent: {
            automationLevel: 3,
            analysisLevel: 2,
            recommendationComplexity: 2,
            guidelineIntegration: 4,
            patientIndividualization: 3
          }
        }
      },
      {
        evaluationId: 'infektionsdiagnostik-covid19',
        name: 'Infektionsdiagnostik (Covid-19-PCR)',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 1,
            dataIntegrity: 5,
            dataComplexityLevel: 1,
            dataLinking: 1,
            dataVolume: 1
          },
          diseaseComplexity: {
            diseaseRarity: 1,
            diagnosticAmbiguity: 2,
            prognosticUncertainty: 2,
            multimorbidity: 2,
            diseaseSeverity: 3
          },
          questionDifficulty: {
            differentialDepth: 1,
            prognosticPrecision: 2,
            realtimeRequirement: 4,
            interdisciplinaryRelevance: 1,
            dynamicAdaptability: 1
          },
          aiSupportExtent: {
            automationLevel: 4,
            analysisLevel: 2,
            recommendationComplexity: 2,
            guidelineIntegration: 4,
            patientIndividualization: 2
          }
        }
      },
      {
        evaluationId: 'neurologische-befundung',
        name: 'Neurologische Befundung (z.B. Schlaganfall)',
        dimensionValues: {
          dataComplexity: {
            sourceVariety: 4,
            dataIntegrity: 4,
            dataComplexityLevel: 4,
            dataLinking: 5,
            dataVolume: 4
          },
          diseaseComplexity: {
            diseaseRarity: 2,
            diagnosticAmbiguity: 4,
            prognosticUncertainty: 4,
            multimorbidity: 4,
            diseaseSeverity: 5
          },
          questionDifficulty: {
            differentialDepth: 4,
            prognosticPrecision: 4,
            realtimeRequirement: 5,
            interdisciplinaryRelevance: 5,
            dynamicAdaptability: 5
          },
          aiSupportExtent: {
            automationLevel: 3,
            analysisLevel: 5,
            recommendationComplexity: 5,
            guidelineIntegration: 5,
            patientIndividualization: 5
          }
        }
      }
    ];

    // Add preconfigured scores to the service
    preconfiguredScores.forEach(input => {
      this.saveScoreInput(input);
    });
  }

  getDimensions(): Observable<Dimension[]> {
    // Return a copy to prevent direct modification
    return this.dimensionsSubject.asObservable();
  }

  getDimensionById(dimensionId: string): Observable<Dimension | undefined> {
    return this.dimensionsSubject.pipe(
      map(dimensions => dimensions.find(d => d.id === dimensionId))
    );
  }

  getCriterionById(dimensionId: string, criterionId: string): Observable<Criterion | undefined> {
    return this.getDimensionById(dimensionId).pipe(
      map(dimension => dimension?.criteria.find(c => c.id === criterionId))
    );
  }

  // Update a criterion's scale labels
  updateCriterionScaleLabels(dimensionId: string, criterionId: string, updatedScale: { [key: number]: string }): void {
    const dimensions = this.dimensionsSubject.getValue();
    const dimensionIndex = dimensions.findIndex(d => d.id === dimensionId);
    
    if (dimensionIndex === -1) return;
    
    const criterionIndex = dimensions[dimensionIndex].criteria.findIndex(c => c.id === criterionId);
    
    if (criterionIndex === -1) return;
    
    // Create a new copy of the dimensions array to maintain immutability
    const updatedDimensions = [...dimensions];
    const updatedDimension = {...updatedDimensions[dimensionIndex]};
    updatedDimensions[dimensionIndex] = updatedDimension;
    
    const updatedCriteria = [...updatedDimension.criteria];
    updatedDimension.criteria = updatedCriteria;
    
    const updatedCriterion = {...updatedCriteria[criterionIndex]};
    updatedCriteria[criterionIndex] = updatedCriterion;
    
    // Update the scale
    updatedCriterion.scale = {...updatedScale};
    
    // Update the subject
    this.dimensionsSubject.next(updatedDimensions);
  }

  // Reset a criterion's scale labels to defaults
  resetCriterionScaleLabels(dimensionId: string, criterionId: string): void {
    this.updateCriterionScaleLabels(dimensionId, criterionId, {...this.defaultScaleLabels});
  }

  // Get the default scale labels
  getDefaultScaleLabels(): {[key: number]: string} {
    return {...this.defaultScaleLabels};
  }

  saveScoreInput(input: ScoreInput): void {
    const currentInputs = this.scoreInputs.getValue();
    // Simple way to add/update based on evaluationId
    const existingIndex = currentInputs.findIndex(i => i.evaluationId === input.evaluationId);
    if (existingIndex > -1) {
      currentInputs[existingIndex] = input;
    } else {
      currentInputs.push(input);
    }
    this.scoreInputs.next(currentInputs);

    // Decide whether to run a single calculation or a series simulation
    if (input.seriesValues && input.seriesValues.length > 0 && input.seriesParameterDimensionId && input.seriesParameterCriterionId) {
      this.calculateAndSaveSeriesSimulation(input);
    } else {
      const result = this.calculateScoreInternal(input);
      this.saveSingleScoreResult(result);
    }
  }

  getScoreInputs(): Observable<ScoreInput[]> {
    return this.scoreInputs.asObservable();
  }

  getScoreResults(): Observable<ScoreResult[]> {
    return this.scoreResults.asObservable();
  }

  getSeriesSimulationRuns(): Observable<SeriesSimulationRun[]> {
    return this.seriesSimulationRuns.asObservable();
  }

  getScoreResult(evaluationId: string): Observable<ScoreResult | undefined> {
    return this.scoreResults.pipe(
      map(results => results.find(r => r.evaluationId === evaluationId))
    );
  }

  // Simple calculation: Sum scores for each dimension
  private calculateAndSaveScore(input: ScoreInput): void {
    const result = this.calculateScoreInternal(input);
    this.saveSingleScoreResult(result);
  }

  private saveSingleScoreResult(result: ScoreResult): void {
    const currentResults = this.scoreResults.getValue();
    const existingIndex = currentResults.findIndex(r => r.evaluationId === result.evaluationId);
    if (existingIndex > -1) {
      currentResults[existingIndex] = result;
    } else {
      currentResults.push(result);
    }
    this.scoreResults.next(currentResults);
  }

  private calculateScoreInternal(input: ScoreInput): ScoreResult {
    const dimensionScores: { [dimensionId: string]: number } = {};
    let totalScore = 0;

    const dimensions = this.dimensionsSubject.getValue();
    dimensions.forEach(dim => {
      let dimScore = 0;
      dim.criteria.forEach((crit: Criterion) => {
        // Use a default of 0 if the value is not found, null, or undefined
        const value = input.dimensionValues[dim.id]?.[crit.id];
        dimScore += (typeof value === 'number' && !isNaN(value)) ? value : 0;
      });
      dimensionScores[dim.id] = dimScore;
      totalScore += dimScore;
    });

    return {
      evaluationId: input.evaluationId,
      name: input.name,
      dimensionScores,
      totalScore
    };
  }

  private calculateAndSaveSeriesSimulation(originalInput: ScoreInput): void {
    if (!originalInput.seriesParameterDimensionId || !originalInput.seriesParameterCriterionId || !originalInput.seriesValues) {
      console.error('Series simulation input is missing necessary parameters.');
      return;
    }

    const seriesRunId = `series-${originalInput.evaluationId}-${Date.now()}`;
    const allScenarioResults: SeriesScenarioResult[] = [];

    const { seriesParameterDimensionId, seriesParameterCriterionId, seriesValues, dimensionValues, evaluationId: originalEvaluationId } = originalInput;

    seriesValues.forEach(originalSeriesValue => {
      const scenarios: { type: 'original' | 'half' | 'double' | 'triple', multiplier: number }[] = [
        { type: 'original', multiplier: 1 },
        { type: 'half', multiplier: 0.5 },
        { type: 'double', multiplier: 2 },
        { type: 'triple', multiplier: 3 },
      ];

      scenarios.forEach(scenario => {
        const scenarioValue = Math.round(originalSeriesValue * scenario.multiplier); // Ensure integer values if applicable, or adjust as needed

        // Deep clone the original dimensionValues to avoid modification issues
        const scenarioDimensionValues = JSON.parse(JSON.stringify(dimensionValues));
        
        // Ensure the dimension and criterion exist before trying to set them
        if (!scenarioDimensionValues[seriesParameterDimensionId]) {
          scenarioDimensionValues[seriesParameterDimensionId] = {};
        }
        scenarioDimensionValues[seriesParameterDimensionId][seriesParameterCriterionId] = scenarioValue;

        const scenarioInput: ScoreInput = {
          ...originalInput, // Spread originalInput to carry over any other relevant fields
          evaluationId: `${originalEvaluationId}-${seriesParameterCriterionId}-${originalSeriesValue}-${scenario.type}`, // Unique ID for this specific scenario
          dimensionValues: scenarioDimensionValues,
          seriesValues: undefined, // Clear series values for internal calculation
          seriesParameterCriterionId: undefined,
          seriesParameterDimensionId: undefined,
        };
        
        const scoreResult = this.calculateScoreInternal(scenarioInput);

        const scenarioResult: SeriesScenarioResult = {
          ...scoreResult,
          originalSeriesValue,
          scenarioType: scenario.type,
          scenarioValue,
        };
        allScenarioResults.push(scenarioResult);
      });
    });

    const seriesRun: SeriesSimulationRun = {
      seriesRunId,
      originalEvaluationId: originalInput.evaluationId,
      seriesParameterDimensionId,
      seriesParameterCriterionId,
      inputSeriesValues: seriesValues,
      results: allScenarioResults,
    };

    const currentRuns = this.seriesSimulationRuns.getValue();
    currentRuns.push(seriesRun);
    this.seriesSimulationRuns.next(currentRuns);
  }

  deleteScore(evaluationId: string): void {
    // Filter out the input with the matching ID
    const currentInputs = this.scoreInputs.getValue();
    const updatedInputs = currentInputs.filter(i => i.evaluationId !== evaluationId);
    this.scoreInputs.next(updatedInputs);

    // Filter out the result with the matching ID
    const currentResults = this.scoreResults.getValue();
    const updatedResults = currentResults.filter(r => r.evaluationId !== evaluationId);
    this.scoreResults.next(updatedResults);

    console.log('Deleted evaluation:', evaluationId);
  }

  // Helper to get a descriptive label for a score value
  getScoreLabel(dimensionId: string, criterionId: string, score: number): string {
    const dimensions = this.dimensionsSubject.getValue();
    const dimension = dimensions.find(d => d.id === dimensionId);
    const criterion = dimension?.criteria.find((c: Criterion) => c.id === criterionId);
    
    // Try to get translated label first
    const translatedLabel = this.getTranslatedScoreLabel(dimensionId, criterionId, score);
    if (translatedLabel) {
      return translatedLabel;
    }
    
    // Fallback to original scale or default labels
    return criterion?.scale[score] || this.defaultScaleLabels[score as keyof typeof this.defaultScaleLabels] || `Score ${score}`;
  }

  // Helper to get translated score labels
  private getTranslatedScoreLabel(dimensionId: string, criterionId: string, score: number): string | null {
    const currentLang = this.languageService.getCurrentLanguage();
    const scoreLabels = this.languageService.translate('input.scoreLabels') as any;
    
    if (scoreLabels && typeof scoreLabels === 'object' && scoreLabels[score.toString()]) {
      return scoreLabels[score.toString()];
    }
    
    return null;
  }
}
