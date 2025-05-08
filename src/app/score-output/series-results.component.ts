import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScoreService } from '../score.service';
import { SeriesSimulationRun, Dimension, Criterion } from '../models/score.model';

@Component({
  selector: 'app-series-results',
  standalone: false,
  templateUrl: './series-results.component.html',
  styleUrls: ['./series-results.component.css']
})
export class SeriesResultsComponent implements OnInit {
  seriesRuns$: Observable<SeriesSimulationRun[]>;
  dimensions: Dimension[] = []; // To hold dimensions for easy lookup

  constructor(private scoreService: ScoreService) {
    this.seriesRuns$ = this.scoreService.getSeriesSimulationRuns();
    this.scoreService.getDimensions().subscribe(dims => this.dimensions = dims);
  }

  ngOnInit(): void {
    // Subscription to seriesRuns$ will be handled by the async pipe in the template
  }

  // Helper function to get criterion name for display
  getCriterionName(dimensionId: string, criterionId: string): string {
    const dimension = this.dimensions.find(d => d.id === dimensionId);
    if (dimension) {
      const criterion = dimension.criteria.find(c => c.id === criterionId);
      return criterion ? criterion.name : 'Unknown Criterion';
    }
    return 'Unknown Dimension';
  }

  // Helper to get dimension name
  getDimensionName(dimensionId: string): string {
    const dimension = this.dimensions.find(d => d.id === dimensionId);
    return dimension ? dimension.name : 'Unknown Dimension';
  }

} 