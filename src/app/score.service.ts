import { Injectable } from '@angular/core';
import { Dimension, ScoreInput, ScoreResult, Criterion } from './models/score.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  // BehaviorSubject for dimensions to allow editing
  private dimensionsSubject = new BehaviorSubject<Dimension[]>([
    // 1. Datenkomplexität und -vielfalt
    {
      id: 'dataComplexity',
      name: 'Datenkomplexität und -vielfalt',
      criteria: [
        { id: 'sourceVariety', name: 'Datenquellenvielfalt', description: 'Anzahl der genutzten Datentypen.', scale: { 1: 'Nur ein Datentyp', 5: 'Fünf oder mehr Datentypen' } },
        { id: 'integrity', name: 'Datenintegrität', description: 'Grad der Vollständigkeit und Konsistenz.', scale: { 1: 'Nur ein Teil verarbeitbar', 5: 'Nahezu vollständig verarbeitbar' } },
        { id: 'complexity', name: 'Datenkomplexität', description: 'Schwierigkeitsgrad bei der Interpretation.', scale: { 1: 'Strukturiert, leicht', 5: 'Unstrukturiert, hochkomplex' } },
        { id: 'linking', name: 'Datenverknüpfung', description: 'Fähigkeit zur Kombination von Quellen.', scale: { 1: 'Keine Verknüpfung', 5: 'Vollständig integriert' } },
        { id: 'volume', name: 'Datenvolumen', description: 'Menge der Daten pro Analyse.', scale: { 1: 'Gering', 5: 'Sehr groß (Millionen Parameter)' } }
      ]
    },
    // 2. Komplexität der Erkrankung
    {
      id: 'diseaseComplexity',
      name: 'Komplexität der Erkrankung',
      criteria: [
        { id: 'rarity', name: 'Seltenheit der Erkrankung', description: 'Prävalenz in der Bevölkerung.', scale: { 1: 'Häufig', 5: 'Sehr selten' } },
        { id: 'ambiguity', name: 'Diagnostische Mehrdeutigkeit', description: 'Schwierigkeit der Abgrenzung.', scale: { 1: 'Einfach abzugrenzen', 5: 'Hochgradig mehrdeutig' } },
        { id: 'uncertainty', name: 'Prognostische Unsicherheit', description: 'Vorhersehbarkeit des Verlaufs.', scale: { 1: 'Gut vorhersagbar', 5: 'Unvorhersehbar' } },
        { id: 'multimorbidity', name: 'Multimorbidität', description: 'Einfluss anderer Erkrankungen.', scale: { 1: 'Kaum beeinflusst', 5: 'Stark beeinflusst' } },
        { id: 'decisionVariety', name: 'Klinische Entscheidungsvielfalt', description: 'Anzahl möglicher Strategien.', scale: { 1: 'Standardisiert', 5: 'Vielzahl komplexer Entscheidungen' } }
      ]
    },
    // 3. Schwierigkeitsgrad der Fragestellung
    {
      id: 'questionDifficulty',
      name: 'Schwierigkeitsgrad der Fragestellung',
      criteria: [
        { id: 'differentialDepth', name: 'Differenzialdiagnostische Tiefe', description: 'Anzahl möglicher Diagnosen.', scale: { 1: '< 3 Diagnosen', 5: '> 10 Diagnosen' } },
        { id: 'prognosticPrecision', name: 'Prognostische Präzision', description: 'Genauigkeit/Langfristigkeit der Vorhersage.', scale: { 1: 'Kurzfristige Trends', 5: 'Hochpräzise, langfristig' } },
        { id: 'therapeuticComplexity', name: 'Therapeutische Komplexität', description: 'Individualisierungsgrad der Empfehlungen.', scale: { 1: 'Generisch', 5: 'Stark personalisiert' } },
        { id: 'interdisciplinaryRelevance', name: 'Interdisziplinäre Relevanz', description: 'Anzahl der Fachbereiche.', scale: { 1: 'Ein Fachbereich', 5: '> 3 Fachbereiche' } },
        { id: 'dynamicAdaptability', name: 'Dynamische Anpassungsfähigkeit', description: 'Reaktion auf Parameteränderungen.', scale: { 1: 'Keine Anpassung', 5: 'Echtzeit-Anpassung' } }
      ]
    },
    // 4. Ausmaß der KI-Unterstützung
    {
      id: 'aiSupportLevel',
      name: 'Ausmaß der KI-Unterstützung',
      criteria: [
        { id: 'automationLevel', name: 'Automatisierungsgrad', description: 'Grad der Autonomie der KI.', scale: { 1: 'Nur unterstützend', 5: 'Vollautomatisiert' } },
        { id: 'analysisLevel', name: 'Analyseebene', description: 'Tiefe der Analyse.', scale: { 1: 'Einzelparameterniveau', 5: 'Hochdimensional, integrativ' } },
        { id: 'recommendationComplexity', name: 'Empfehlungskomplexität', description: 'Umfang der Vorschläge.', scale: { 1: 'Einfach, generisch', 5: 'Detaillierte Handlungspläne' } },
        { id: 'guidelineIntegration', name: 'Integration von Leitlinien', description: 'Einbindung medizinischer Standards.', scale: { 1: 'Keine Berücksichtigung', 5: 'Vollständige Integration' } },
        { id: 'patientIndividualization', name: 'Patientenspezifische Individualisierung', description: 'Berücksichtigung individueller Merkmale.', scale: { 1: 'Keine Individualisierung', 5: 'Höchstgradig spezifisch' } }
      ]
    }
  ]);

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
