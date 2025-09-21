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
          scoreLabel: scoreValue ? this.scoreService.getScoreLabel(dim.id, crit.id, scoreValue) : 'N/A'
        };
      })
    }));
  }

  // Translation helper
  translate(key: string): string {
    return this.languageService.translate(key);
  }

  getTranslatedDimensionName(dimensionName: string): string {
    // Try to translate the dimension name, fallback to original if no translation exists
    const translated = this.languageService.translate(dimensionName);
    return translated !== dimensionName ? translated : dimensionName;
  }

  getTranslatedCriterionName(criterionName: string): string {
    // Try to translate the criterion name, fallback to original if no translation exists
    const translated = this.languageService.translate(criterionName);
    return translated !== criterionName ? translated : criterionName;
  }
}
