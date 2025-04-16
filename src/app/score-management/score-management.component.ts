import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';
import { ScoreResult } from '../models/score.model'; // We'll display results here
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-management',
  standalone: false,
  templateUrl: './score-management.component.html',
  styleUrl: './score-management.component.css'
})
export class ScoreManagementComponent implements OnInit {
  scoreResults$: Observable<ScoreResult[]>;

  constructor(
    private scoreService: ScoreService,
    private router: Router
  ) { 
    this.scoreResults$ = this.scoreService.getScoreResults();
  }

  ngOnInit(): void {
     // Data is fetched via the async pipe in the template
  }

  // Navigate to details view
  viewDetails(evaluationId: string): void {
    console.log('Navigating to details for:', evaluationId);
    this.router.navigate(['/manage', evaluationId]);
  }

  deleteEvaluation(evaluationId: string): void {
    if (confirm(`Sind Sie sicher, dass Sie die Bewertung ${evaluationId} löschen möchten?`)) {
      this.scoreService.deleteScore(evaluationId);
      alert(`Bewertung ${evaluationId} gelöscht.`);
    }
  }
}
