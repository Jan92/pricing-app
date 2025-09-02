import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing-strategy',
  templateUrl: './pricing-strategy.component.html',
  styleUrls: ['./pricing-strategy.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatRadioModule, 
    MatCheckboxModule, 
    MatSliderModule, 
    MatDividerModule, 
    MatProgressBarModule, 
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PricingStrategyComponent implements OnInit {
  currentPhase = 0;
  totalPhases = 6;
  formData: any = {};
  results: any = {};
  pricingForm: FormGroup;
  
  phases = [
    'System-Übersicht',
    'Technische Komplexität',
    'Markt & Wettbewerb',
    'Implementierung & Vertrieb',
    'Geschäftsmodell',
    'Ergebnisse'
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.pricingForm = this.fb.group({
      systemName: ['', [Validators.required, Validators.minLength(3)]],
      autonomy: ['', Validators.required],
      measurability: ['', Validators.required],
      inferenceCosts: ['', Validators.required],
      sector: ['', Validators.required],
      reimbursement: ['', Validators.required],
      salesEffort: ['', Validators.required],
      implementation: ['', Validators.required],
      competition: ['', Validators.required],
      customerFencing: ['', Validators.required],
      upgradePath: ['', Validators.required],
      supportIntensity: [3, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    console.log('PricingStrategyComponent initialized, currentPhase:', this.currentPhase);
    this.updatePhaseDisplay();
    this.updateProgress();
    this.updateNavigation();
  }

  nextPhase() {
    if (!this.validateCurrentPhase()) {
      return;
    }
    
    this.saveFormData();
    
    if (this.currentPhase === this.totalPhases - 2) {
      this.generateRecommendations();
    } else if (this.currentPhase < this.totalPhases - 1) {
      this.currentPhase++;
      this.updatePhaseDisplay();
      this.updateProgress();
      this.updateNavigation();
    }
  }

  previousPhase() {
    if (this.currentPhase > 0) {
      this.currentPhase--;
      this.updatePhaseDisplay();
      this.updateProgress();
      this.updateNavigation();
    }
  }

  jumpToPhase(phaseIndex: number) {
    // Erlaube nur Sprünge zu bereits besuchten Phasen oder der nächsten Phase
    if (phaseIndex <= this.currentPhase || phaseIndex === this.currentPhase + 1) {
      if (this.currentPhase === this.totalPhases - 1 && phaseIndex < this.currentPhase) {
        // Wenn wir von den Ergebnissen zurückspringen, speichern wir die aktuellen Ergebnisse
        const savedResults = { ...this.results };
        this.currentPhase = phaseIndex;
        this.updatePhaseDisplay();
        this.updateProgress();
        this.updateNavigation();
        this.results = savedResults; // Stelle die Ergebnisse wieder her
      } else {
        this.currentPhase = phaseIndex;
        this.updatePhaseDisplay();
        this.updateProgress();
        this.updateNavigation();
      }
    }
  }

  isPhaseVisible(index: number): boolean {
    console.log('isPhaseVisible called with index:', index, 'currentPhase:', this.currentPhase);
    return index === this.currentPhase;
  }

  isPhaseActive(index: number): boolean {
    return index === this.currentPhase;
  }

  isPhaseCompleted(index: number): boolean {
    return index < this.currentPhase;
  }

  updatePhaseDisplay() {
    // Diese Methode bleibt für Kompatibilität, aber die Logik wurde in die Template-Methoden verschoben
  }

  getProgressPercent(): number {
    return ((this.currentPhase + 1) / this.totalPhases) * 100;
  }

  updateProgress() {
    // Diese Methode bleibt für Kompatibilität, aber die Logik wurde in die Template-Methoden verschoben
  }

  isPrevButtonVisible(): boolean {
    return this.currentPhase !== 0;
  }

  isNextButtonVisible(): boolean {
    return this.currentPhase !== this.totalPhases - 1;
  }

  getNextButtonText(): string {
    if (this.currentPhase === this.totalPhases - 2) {
      return 'Empfehlung generieren';
    }
    return 'Weiter →';
  }

  updateNavigation() {
    // Diese Methode bleibt für Kompatibilität, aber die Logik wurde in die Template-Methoden verschoben
  }

  validateCurrentPhase(): boolean {
    // Wenn wir auf der Ergebnisseite sind, ist die Validierung immer erfolgreich
    if (this.currentPhase === this.totalPhases - 1) {
      return true;
    }

    // Prüfe die Validität des Formulars für die aktuelle Phase
    const currentPhaseControls = this.getCurrentPhaseControls();
    const invalidControls = currentPhaseControls.filter(control => {
      const formControl = this.pricingForm.get(control);
      if (formControl?.invalid) {
        formControl.markAsTouched();
        return true;
      }
      return false;
    });

    if (invalidControls.length > 0) {
      const errorMessages = invalidControls.map(control => {
        const formControl = this.pricingForm.get(control);
        if (formControl?.hasError('required')) {
          return `${this.getFieldLabel(control)} ist erforderlich`;
        } else if (formControl?.hasError('minlength')) {
          return `${this.getFieldLabel(control)} muss mindestens ${formControl.errors?.['minlength'].requiredLength} Zeichen lang sein`;
        } else if (formControl?.hasError('min')) {
          return `${this.getFieldLabel(control)} muss mindestens ${formControl.errors?.['min'].min} sein`;
        } else if (formControl?.hasError('max')) {
          return `${this.getFieldLabel(control)} darf maximal ${formControl.errors?.['max'].max} sein`;
        }
        return `${this.getFieldLabel(control)} ist ungültig`;
      });

      this.snackBar.open(errorMessages.join('\n'), 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });

      return false;
    }

    return true;
  }

  private getFieldLabel(control: string): string {
    const labels: { [key: string]: string } = {
      systemName: 'Name des DDSS-Systems',
      autonomy: 'Autonomie-Level',
      measurability: 'Messbarkeit des Nutzens',
      inferenceCosts: 'AI-Inferenzkosten',
      sector: 'Primärer Zielsektor',
      reimbursement: 'Erstattungsintegration',
      salesEffort: 'Vertriebskomplexität',
      implementation: 'Implementierungskomplexität',
      competition: 'Wettbewerbsintensität',
      customerFencing: 'Kundenbindung',
      upgradePath: 'Upgrade-Pfad',
      supportIntensity: 'Support-Intensität'
    };
    return labels[control] || control;
  }

  private getCurrentPhaseControls(): string[] {
    // Definiere die Formularfelder für jede Phase
    const phaseControls = {
      0: ['systemName', 'autonomy'],
      1: ['measurability', 'inferenceCosts'],
      2: ['sector', 'reimbursement', 'competition'],
      3: ['salesEffort', 'implementation'],
      4: ['customerFencing', 'upgradePath', 'supportIntensity']
    };

    return phaseControls[this.currentPhase as keyof typeof phaseControls] || [];
  }

  // Diese Methode wird nicht mehr benötigt, da wir jetzt Angular Forms Validierung verwenden

  saveFormData() {
    // Speichere die Formulardaten aus dem ReactiveForm
    if (this.pricingForm.valid) {
      this.formData = { ...this.pricingForm.value };
      this.snackBar.open('Daten erfolgreich gespeichert', 'OK', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    }
  }

  generateRecommendations() {
    if (!this.validateCurrentPhase()) {
      return;
    }

    this.saveFormData();

    if (this.pricingForm.valid) {
      this.results = this.calculatePricingRecommendations();
      this.currentPhase = this.totalPhases - 1;
      this.updatePhaseDisplay();
      this.updateProgress();
      this.updateNavigation();

      // Bestätige die erfolgreiche Generierung
      this.snackBar.open('Pricing-Empfehlung wurde erfolgreich generiert!', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    }
  }

  calculatePricingRecommendations() {
    const data = this.pricingForm.value;
    let recommendations: {
      systemType: string;
      pricingModel: string;
      structure: string;
      primaryMetric: string;
      billingModel: string;
      basePrice: string;
      variableComponent: string;
      risks: string[];
      implementation: {
        contractLength?: string;
        billing?: string;
        reimbursement?: string;
        scoring?: string;
        pricing?: string;
        scalability?: string;
        setupFee?: string;
        minimumTerm?: string;
        deployment?: string;
        tiers?: {
          basic: string;
          standard: string;
          premium: string;
        };
      };
    } = {
      systemType: 'Nicht klassifiziert',
      pricingModel: 'Standard-Modell',
      structure: 'Hybride Struktur',
      primaryMetric: 'Nutzer-basiert',
      billingModel: 'SaaS-Modell',
      basePrice: 'Individuell',
      variableComponent: 'Nach Nutzung',
      risks: [],
      implementation: {}
    };

    // Determine system type based on autonomy
    switch (data.autonomy) {
      case 'assistive':
        recommendations.systemType = 'Assistive System (Score 1-2)';
        recommendations.pricingModel = 'Jahreslizenzen mit Wartung';
        recommendations.structure = '80% fix, 20% variabel';
        recommendations.primaryMetric = 'Per-Seat oder Flat-Rate';
        recommendations.basePrice = '1.000-5.000€ Jahreslizenz';
        recommendations.variableComponent = '200-500€ Wartung/Jahr';
        break;
      case 'augmentative':
        recommendations.systemType = 'Augmentative System (Score 3-4)';
        recommendations.pricingModel = 'SaaS mit Volume-Discounts';
        recommendations.structure = 'User-based oder Case-based';
        recommendations.primaryMetric = 'Per-User oder Per-Case';
        recommendations.basePrice = '200-800€ pro Nutzer/Monat';
        recommendations.variableComponent = 'Volume-basierte Rabatte ab 10+ Nutzer';
        break;
      case 'autonomous':
        recommendations.systemType = 'Autonomous System (Score 5)';
        recommendations.pricingModel = 'Hybrid aus Per-Case + Performance-Bonus';
        recommendations.structure = '70% nutzungsbasiert, 30% Performance-basiert';
        recommendations.primaryMetric = 'Hybrid (Cases + Performance)';
        recommendations.basePrice = '50-150€ pro Fall';
        recommendations.variableComponent = '10-30€ Performance-Bonus';
        recommendations.risks.push('Höhere Haftungsrisiken bei autonomen Entscheidungen');
        break;
    }

    // Sector-specific adjustments
    if (data.sector === 'public') {
      recommendations.billingModel = 'Enterprise License mit SLAs';
      recommendations.implementation.contractLength = 'Mehrjährige Verträge (3-5 Jahre)';
      recommendations.implementation.billing = 'Jährliche Vorauszahlung';
      recommendations.risks.push('Budgetplanungszyklen beachten');
      recommendations.risks.push('Ausschreibungsprozesse berücksichtigen');
    } else if (data.sector === 'private') {
      recommendations.implementation.contractLength = 'Flexible Laufzeiten';
      recommendations.implementation.billing = 'Monatlich oder quartalsweise';
    }

    // Reimbursement considerations
    if (data.reimbursement === 'yes') {
      recommendations.implementation.reimbursement = 'Integration in GOÄ/EBM möglich';
      recommendations.implementation.scoring = 'AI-Score basierte Abrechnung';
      recommendations.risks.push('Erstattungsrichtlinien beachten');
    } else {
      recommendations.risks.push('ROI-Nachweis für Klinikfinanzierung erforderlich');
    }

    // Sales effort impact
    if (data.salesEffort === 'high') {
      recommendations.risks.push('Hohe Vertriebskosten einkalkulieren (>25% vom Umsatz)');
      recommendations.implementation.pricing = 'Hochpreisige, langfristige Verträge';
    } else if (data.salesEffort === 'low') {
      recommendations.implementation.scalability = 'Skalierbare, niedrigpreisige Modelle';
    }

    // Implementation complexity
    if (data.implementation === 'extensive') {
      recommendations.implementation.setupFee = '20-40% des Jahresumsatzes als Setup-Fee';
      recommendations.implementation.minimumTerm = '3-5 Jahre Mindestvertragslaufzeit';
      recommendations.risks.push('Hohe Implementierungskosten berücksichtigen');
    } else if (data.implementation === 'standard') {
      recommendations.implementation.deployment = 'Plug-and-Play SaaS-Modell';
    }

    // Additional risk factors
    if (data.measurability === 'low') {
      recommendations.risks.push('Schwer quantifizierbarer Nutzen - Service-Komponenten wichtig');
    }

    if (data.inferenceCosts === 'high') {
      recommendations.risks.push('Hohe laufende AI-Inferenzkosten berücksichtigen');
    }

    if (data.competition === 'high') {
      recommendations.risks.push('Starke Konkurrenz - Preisdruck beachten');
    }

    if (data.customerFencing === 'weak') {
      recommendations.risks.push('Arbitrage-Risiko zwischen Kundensegmenten');
    }

    // Upgrade path considerations
    if (data.upgradePath === 'tiered') {
      recommendations.implementation.tiers = {
        basic: 'AI-101 Level (50 Punkte) - Basis-DDSS',
        standard: 'AI-201 Level (100 Punkte) - Erweiterte Analyse', 
        premium: 'AI-301 Level (150 Punkte) - Autonome Systeme'
      };
    }

    return recommendations;
  }

  // Helper methods for labels
  getAutonomyLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'assistive': 'Assistive (Score 1-2)',
      'augmentative': 'Augmentative (Score 3-4)', 
      'autonomous': 'Autonomous (Score 5)'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  getMeasurabilityLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'high': 'Hoch messbar',
      'medium': 'Mittel messbar',
      'low': 'Schwer messbar'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  getInferenceCostsLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'low': 'Niedrig',
      'medium': 'Mittel', 
      'high': 'Hoch'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  getSectorLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'public': 'Öffentlich',
      'private': 'Privat',
      'hybrid': 'Hybrid'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  getSalesEffortLabel(value: string): string {
    const labels: { [key: string]: string } = {
      'low': 'Niedrig (<10%)',
      'medium': 'Mittel (10-25%)',
      'high': 'Hoch (>25%)'
    };
    return labels[value] || 'Nicht spezifiziert';
  }

  exportPDF() {
    if (!this.results || !this.pricingForm.valid) {
      this.snackBar.open('Keine Ergebnisse zum Exportieren verfügbar.', 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['warning-snackbar']
      });
      return;
    }

    try {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const htmlContent = this.generatePDFContent();
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
          this.snackBar.open('PDF-Export erfolgreich gestartet', 'OK', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
        }, 500);
      } else {
        throw new Error('Popup wurde blockiert');
      }
    } catch (error) {
      this.snackBar.open('Fehler beim PDF-Export: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'), 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }

  private generatePDFContent(): string {
    return `
      <html>
      <head>
        <title>DDSS Pricing Strategy - ${this.pricingForm.get('systemName')?.value || 'Report'}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
          }
          .result-section { 
            margin: 20px 0; 
            padding: 15px; 
            border-left: 4px solid #0891b2; 
            background: #f8f9fa; 
            page-break-inside: avoid;
          }
          .recommendation-box { 
            background: #f0f9f0; 
            border: 1px solid #22c55e; 
            padding: 20px; 
            margin: 15px 0; 
          }
          .risk-factors { 
            background: #fef3f3; 
            border: 1px solid #f59e0b; 
            padding: 15px; 
            margin: 15px 0; 
          }
          .result-label { font-weight: bold; margin-right: 10px; }
          .result-item { margin: 8px 0; }
          .pricing-details { display: flex; gap: 15px; flex-wrap: wrap; }
          .pricing-card { 
            border: 1px solid #ddd; 
            padding: 15px; 
            background: white;
            flex: 1;
            min-width: 200px;
          }
          .system-type-badge { 
            padding: 8px 15px; 
            border-radius: 20px; 
            background: #e0f2fe; 
            border: 1px solid #0891b2;
            display: inline-block;
            margin-bottom: 15px;
            font-weight: bold;
          }
          h3, h4, h5 { color: #0891b2; margin-bottom: 10px; }
          h1 { text-align: center; color: #0891b2; }
          .meta-info { text-align: center; color: #666; margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <h1>DDSS Pricing Strategy Report</h1>
        <div class="meta-info">
          <p><strong>Generiert am:</strong> ${new Date().toLocaleDateString('de-DE')}</p>
          <p><strong>System:</strong> ${this.pricingForm.get('systemName')?.value || 'Unbekannt'}</p>
        </div>
        ${this.generateResultsHTML()}
      </body>
      </html>
    `;
  }

  private generateResultsHTML(): string {
    return `
      <div class="results-container">
        <div class="result-section">
          <div class="system-type-badge">${this.results.systemType}</div>
          <h3>Empfohlenes Pricing-Modell</h3>
          <div class="recommendation-box">
            <div class="result-item"><span class="result-label">Modell:</span> ${this.results.pricingModel}</div>
            <div class="result-item"><span class="result-label">Struktur:</span> ${this.results.structure}</div>
            <div class="result-item"><span class="result-label">Primäre Metrik:</span> ${this.results.primaryMetric}</div>
          </div>
          
          <h4>Preisdetails</h4>
          <div class="pricing-details">
            <div class="pricing-card">
              <h5>Basispreis</h5>
              <p>${this.results.basePrice}</p>
            </div>
            <div class="pricing-card">
              <h5>Variable Komponente</h5>
              <p>${this.results.variableComponent}</p>
            </div>
          </div>

          ${this.results.implementation ? `
            <h4>Implementierungsdetails</h4>
            <div class="recommendation-box">
              ${Object.entries(this.results.implementation)
                .filter(([key, value]) => value && key !== 'tiers')
                .map(([key, value]) => `<div class="result-item"><span class="result-label">${this.formatLabel(key)}:</span> ${value}</div>`)
                .join('')}
              
              ${this.results.implementation.tiers ? `
                <h5>Verfügbare Tiers</h5>
                ${Object.entries(this.results.implementation.tiers)
                  .map(([tier, desc]) => `<div class="result-item"><span class="result-label">${this.formatLabel(tier)}:</span> ${desc}</div>`)
                  .join('')}
              ` : ''}
            </div>
          ` : ''}

          ${this.results.risks && this.results.risks.length > 0 ? `
            <h4>Risikofaktoren</h4>
            <div class="risk-factors">
              ${this.results.risks.map((risk: string) => `<div class="result-item">• ${risk}</div>`).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  private formatLabel(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
  }

  exportJSON() {
    if (!this.results || !this.pricingForm.valid) {
      this.snackBar.open('Keine Ergebnisse zum Exportieren verfügbar.', 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['warning-snackbar']
      });
      return;
    }

    try {
      const exportData = {
        timestamp: new Date().toISOString(),
        systemName: this.pricingForm.get('systemName')?.value || 'Unnamed System',
        formData: this.pricingForm.value,
        recommendations: this.results
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `ddss-pricing-${(this.pricingForm.get('systemName')?.value || 'report').replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);

      this.snackBar.open('JSON-Export erfolgreich', 'OK', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    } catch (error) {
      this.snackBar.open('Fehler beim JSON-Export: ' + (error instanceof Error ? error.message : 'Unbekannter Fehler'), 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }
  }
}
