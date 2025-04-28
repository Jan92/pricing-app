import { Injectable } from '@angular/core';
import { Dimension, ScoreInput, ScoreResult, Criterion, SCORING_DIMENSIONS } from './models/score.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  // BehaviorSubject for dimensions, initialized with the imported constant
  private dimensionsSubject = new BehaviorSubject<Dimension[]>(SCORING_DIMENSIONS);

  // In-memory storage for score inputs and results (replace with backend later)
  private scoreInputs = new BehaviorSubject<ScoreInput[]>([]);
  private scoreResults = new BehaviorSubject<ScoreResult[]>([]);

  // Default scale labels used when no custom labels are defined
  private defaultScaleLabels = {
    1: 'Niedrig',
    2: 'Unterdurchschnittlich',
    3: 'Durchschnittlich',
    4: 'Überdurchschnittlich',
    5: 'Hoch'
  };

  constructor() { }

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
    this.calculateAndSaveScore(input); // Calculate score immediately after saving input
  }

  getScoreInputs(): Observable<ScoreInput[]> {
    return this.scoreInputs.asObservable();
  }

  getScoreResults(): Observable<ScoreResult[]> {
    return this.scoreResults.asObservable();
  }

  getScoreResult(evaluationId: string): Observable<ScoreResult | undefined> {
    return this.scoreResults.pipe(
      map(results => results.find(r => r.evaluationId === evaluationId))
    );
  }

  // Simple calculation: Sum scores for each dimension
  private calculateAndSaveScore(input: ScoreInput): void {
    const dimensionScores: { [dimensionId: string]: number } = {};
    let totalScore = 0;

    const dimensions = this.dimensionsSubject.getValue();
    dimensions.forEach(dim => {
      let dimScore = 0;
      dim.criteria.forEach((crit: Criterion) => {
        dimScore += input.dimensionValues[dim.id]?.[crit.id] || 0;
      });
      dimensionScores[dim.id] = dimScore;
      totalScore += dimScore;
    });

    const result: ScoreResult = {
      evaluationId: input.evaluationId,
      dimensionScores,
      totalScore
    };

    const currentResults = this.scoreResults.getValue();
     const existingIndex = currentResults.findIndex(r => r.evaluationId === result.evaluationId);
    if (existingIndex > -1) {
      currentResults[existingIndex] = result;
    } else {
      currentResults.push(result);
    }
    this.scoreResults.next(currentResults);
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
    return criterion?.scale[score] || this.defaultScaleLabels[score as keyof typeof this.defaultScaleLabels] || `Score ${score}`;
  }
}
