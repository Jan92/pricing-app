import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';
import { ScoreResult } from '../models/score.model'; // We'll display results here
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LanguageService } from '../language.service';

@Component({
  selector: 'app-score-management',
  standalone: false,
  templateUrl: './score-management.component.html',
  styleUrl: './score-management.component.css'
})
export class ScoreManagementComponent implements OnInit {
  scoreResults$: Observable<ScoreResult[]>;
  isMobile = false;

  constructor(
    private scoreService: ScoreService,
    private router: Router,
    private languageService: LanguageService
  ) { 
    this.scoreResults$ = this.scoreService.getScoreResults();
  }

  ngOnInit(): void {
     // Data is fetched via the async pipe in the template
     this.isMobile = window.matchMedia('(max-width: 600px)').matches;
     window.addEventListener('resize', () => {
       this.isMobile = window.matchMedia('(max-width: 600px)').matches;
     });
  }

  // Navigate to details view
  viewDetails(evaluationId: string): void {
    console.log('Navigating to details for:', evaluationId);
    this.router.navigate(['/manage', evaluationId]);
  }

  deleteEvaluation(evaluationId: string): void {
    if (confirm(this.languageService.translate('common.confirmDelete') + ' ' + evaluationId + '?')) {
      this.scoreService.deleteScore(evaluationId);
      alert(this.languageService.translate('common.deleted') + ' ' + evaluationId + '.');
    }
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  editScore(evaluationId: string): void {
    this.router.navigate(['/input', { evaluationId }]);
  }
}
