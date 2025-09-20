import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from './language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'pricing-app';
  isMobile = false;
  currentLanguage: Language = 'de';
  private breakpointSub: Subscription | undefined;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.breakpointSub = this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 900px)'])
      .subscribe(result => {
        this.isMobile = result.matches;
      });
    
    // Subscribe to language changes
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  ngOnDestroy() {
    this.breakpointSub?.unsubscribe();
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  changeLanguage(language: Language): void {
    this.languageService.setLanguage(language);
  }
}
