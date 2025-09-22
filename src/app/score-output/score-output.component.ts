import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScoreService } from '../score.service';
import { LanguageService } from '../language.service';
import { ScoreResult, Dimension, ScoreInput, Criterion } from '../models/score.model';
import { Observable, switchMap, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

interface DisplayCriterion extends Criterion {
    scoreValue?: number;
    scoreLabel?: string;
}

interface DisplayDimension {
    id: string;
    name: string;
    criteria: DisplayCriterion[];
    dimensionScore?: number;
}

@Component({
  selector: 'app-score-output',
  standalone: false,
  templateUrl: './score-output.component.html',
  styleUrl: './score-output.component.css'
})
export class ScoreOutputComponent implements OnInit {
  scoreDetails$!: Observable<{ result: ScoreResult, input: ScoreInput, dimensions: DisplayDimension[] } | null>;

  constructor(
    private route: ActivatedRoute,
    private scoreService: ScoreService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.scoreDetails$ = this.route.paramMap.pipe(
      switchMap(params => {
        const evaluationId = params.get('evaluationId');
        if (!evaluationId) {
          // When no ID is provided, fetch the latest score result
          console.log('No evaluationId provided, showing latest result if available');
          return this.scoreService.getScoreResults().pipe(
            switchMap(results => {
              if (results.length === 0) {
                console.warn('No score results found');
                return of(null);
              }
              
              // Get the last result (most recent)
              const latestResult = results[results.length - 1];
              const latestId = latestResult.evaluationId;
              
              // Now use the same logic as below but with the latest ID
              return combineLatest([
                of(latestResult),
                this.scoreService.getScoreInputs().pipe(
                  map(inputs => inputs.find(i => i.evaluationId === latestId))
                ),
                this.scoreService.getDimensions()
              ]).pipe(
                map(([result, input, baseDimensions]) => {
                  if (!result || !input) {
                    console.error(`Result or Input not found for latest evaluationId: ${latestId}`);
                    return null;
                  }
                  
                  const displayDimensions: DisplayDimension[] = this.createDisplayDimensions(result, input, baseDimensions);
                  return { result, input, dimensions: displayDimensions };
                })
              );
            })
          );
        }

        // Combine fetching score result, score input, and base dimensions
        return combineLatest([
          this.scoreService.getScoreResult(evaluationId),
          this.scoreService.getScoreInputs().pipe(
              map(inputs => inputs.find(i => i.evaluationId === evaluationId))
          ),
          this.scoreService.getDimensions()
        ]).pipe(
          map(([result, input, baseDimensions]) => {
            if (!result || !input) {
              console.error(`Result or Input not found for evaluationId: ${evaluationId}`);
              return null;
            }
            
            // Use helper method for creating display dimensions
            const displayDimensions: DisplayDimension[] = this.createDisplayDimensions(result, input, baseDimensions);
            return { result, input, dimensions: displayDimensions };
          })
        );
      })
    );
  }

  // Helper method to create display dimensions
  private createDisplayDimensions(result: ScoreResult, input: ScoreInput, baseDimensions: Dimension[]): DisplayDimension[] {
    return baseDimensions.map(dim => ({
      id: dim.id,
      name: dim.name,
      dimensionScore: result.dimensionScores[dim.id],
      criteria: dim.criteria.map((crit): DisplayCriterion => {
        const scoreValue = input.dimensionValues[dim.id]?.[crit.id];
        return {
          ...crit,
          scoreValue: scoreValue,
          scoreLabel: scoreValue ? this.getTranslatedScoreLabel(scoreValue) : 'N/A'
        };
      })
    }));
  }

  // Translation helper
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  getTranslatedDimensionName(dimensionName: string): string {
    // Map dimension names to translation keys
    const dimensionTranslationMap: { [key: string]: string } = {
      'Datenkomplexität und -vielfalt': 'dimensions.dataComplexity',
      'Komplexität der Erkrankung': 'dimensions.diseaseComplexity',
      'Schwierigkeitsgrad der Fragestellung': 'dimensions.questionDifficulty',
      'Ausmaß der KI-Unterstützung': 'dimensions.aiSupportExtent'
    };
    
    const translationKey = dimensionTranslationMap[dimensionName] || dimensionName;
    return this.languageService.translate(translationKey);
  }

  getTranslatedCriterionName(criterionName: string): string {
    // Map criterion names to translation keys
    const criterionTranslationMap: { [key: string]: string } = {
      'Datenquellenvielfalt': 'criteria.sourceVariety',
      'Datenintegrität': 'criteria.dataIntegrity',
      'Datenkomplexität': 'criteria.dataComplexityLevel',
      'Datenverknüpfung': 'criteria.dataLinking',
      'Datenvolumen': 'criteria.dataVolume',
      'Seltenheit der Erkrankung': 'criteria.diseaseRarity',
      'Diagnostische Mehrdeutigkeit': 'criteria.diagnosticAmbiguity',
      'Prognostische Unsicherheit': 'criteria.prognosticUncertainty',
      'Multimorbidität': 'criteria.multimorbidity',
      'Schweregrad der Erkrankung': 'criteria.diseaseSeverity',
      'Differenzialdiagnostische Tiefe': 'criteria.differentialDepth',
      'Prognostische Präzision': 'criteria.prognosticPrecision',
      'Echtzeitanforderung': 'criteria.realtimeRequirement',
      'Interdisziplinäre Relevanz': 'criteria.interdisciplinaryRelevance',
      'Dynamische Anpassungsfähigkeit': 'criteria.dynamicAdaptability',
      'Automatisierungsgrad': 'criteria.automationLevel',
      'Analyseebene': 'criteria.analysisLevel',
      'Empfehlungskomplexität': 'criteria.recommendationComplexity',
      'Leitlinienintegration': 'criteria.guidelineIntegration',
      'Patientenspezifische Individualisierung': 'criteria.patientIndividualization'
    };
    
    const translationKey = criterionTranslationMap[criterionName] || criterionName;
    return this.languageService.translate(translationKey);
  }

  getTranslatedScoreLabel(score: number): string {
    return this.languageService.translate(`common.scoreLabels.${score}`);
  }

  getTranslatedCriterionDescription(criterionName: string): string {
    // Map criterion names to description translation keys
    const criterionDescriptionMap: { [key: string]: string } = {
      'Datenquellenvielfalt': 'criteria.sourceVarietyDesc',
      'Datenintegrität': 'criteria.dataIntegrityDesc',
      'Datenkomplexität': 'criteria.dataComplexityLevelDesc',
      'Datenverknüpfung': 'criteria.dataLinkingDesc',
      'Datenvolumen': 'criteria.dataVolumeDesc',
      'Seltenheit der Erkrankung': 'criteria.diseaseRarityDesc',
      'Diagnostische Mehrdeutigkeit': 'criteria.diagnosticAmbiguityDesc',
      'Prognostische Unsicherheit': 'criteria.prognosticUncertaintyDesc',
      'Multimorbidität': 'criteria.multimorbidityDesc',
      'Schweregrad der Erkrankung': 'criteria.diseaseSeverityDesc',
      'Differenzialdiagnostische Tiefe': 'criteria.differentialDepthDesc',
      'Prognostische Präzision': 'criteria.prognosticPrecisionDesc',
      'Echtzeitanforderung': 'criteria.realtimeRequirementDesc',
      'Interdisziplinäre Relevanz': 'criteria.interdisciplinaryRelevanceDesc',
      'Dynamische Anpassungsfähigkeit': 'criteria.dynamicAdaptabilityDesc',
      'Automatisierungsgrad': 'criteria.automationLevelDesc',
      'Analyseebene': 'criteria.analysisLevelDesc',
      'Empfehlungskomplexität': 'criteria.recommendationComplexityDesc',
      'Leitlinienintegration': 'criteria.guidelineIntegrationDesc',
      'Patientenspezifische Individualisierung': 'criteria.patientIndividualizationDesc'
    };
    
    const translationKey = criterionDescriptionMap[criterionName] || '';
    return this.languageService.translate(translationKey);
  }
}
