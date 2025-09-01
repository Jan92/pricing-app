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
      systemName: ['', Validators.required],
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
      supportIntensity: [3]
    });
  }

  ngOnInit(): void {
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

  updatePhaseDisplay() {
    const phases = document.querySelectorAll('.phase');
    phases.forEach((phase, index) => {
      if (index === this.currentPhase) {
        phase.classList.add('active');
        (phase as HTMLElement).style.display = 'block';
      } else {
        phase.classList.remove('active');
        (phase as HTMLElement).style.display = 'none';
      }
    });
  }

  updateProgress() {
    const progressPercent = ((this.currentPhase + 1) / this.totalPhases) * 100;
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
      (progressFill as HTMLElement).style.width = `${progressPercent}%`;
    }

    document.querySelectorAll('.step').forEach((step, index) => {
      step.classList.remove('active', 'completed');
      
      if (index === this.currentPhase) {
        step.classList.add('active');
      } else if (index < this.currentPhase) {
        step.classList.add('completed');
      }
    });
  }

  updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
      prevBtn.style.visibility = this.currentPhase === 0 ? 'hidden' : 'visible';
    }
    
    if (nextBtn) {
      if (this.currentPhase === this.totalPhases - 1) {
        nextBtn.style.display = 'none';
      } else if (this.currentPhase === this.totalPhases - 2) {
        nextBtn.textContent = 'Empfehlung generieren';
      } else {
        nextBtn.textContent = 'Weiter →';
      }
    }
  }

  validateCurrentPhase(): boolean {
    // Wenn wir auf der Ergebnisseite sind, ist die Validierung immer erfolgreich
    if (this.currentPhase === this.totalPhases - 1) {
      return true;
    }

    const currentPhaseElement = document.querySelector(`[data-phase="${this.currentPhase}"]`);
    if (!currentPhaseElement) return true;

    let isValid = true;
    const requiredInputs = currentPhaseElement.querySelectorAll('input[required], select[required], textarea[required]');
    const validatedFields = new Set<string>();
    
    requiredInputs.forEach(input => {
      if (input instanceof HTMLInputElement) {
        const name = input.name;
        if (!name) return;

        // Vermeide Doppelvalidierung für Radio-Buttons
        if (validatedFields.has(name)) return;
        validatedFields.add(name);

        if (input.type === 'radio') {
          const checked = currentPhaseElement.querySelector(`input[name="${name}"]:checked`);
          if (!checked) {
            isValid = false;
            this.showValidationError(input);
          }
        } else if (!input.value || input.value.trim() === '') {
          isValid = false;
          this.showValidationError(input);
        }
      }
    });

    if (!isValid) {
      this.snackBar.open('Bitte füllen Sie alle Pflichtfelder aus, bevor Sie fortfahren.', 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
    }

    return isValid;
  }

  showValidationError(input: HTMLInputElement) {
    input.classList.add('error');
    setTimeout(() => input.classList.remove('error'), 3000);
  }

  saveFormData() {
    if (this.pricingForm.valid) {
      this.formData = { ...this.pricingForm.value };
    } else {
      // Sammle die Werte aus dem Formular
      const formElements = document.querySelectorAll('input, select, textarea');
      const newFormData: any = {};
      
      formElements.forEach(element => {
        if (element instanceof HTMLInputElement) {
          const name = element.name;
          if (!name) return;

          if (element.type === 'checkbox') {
            if (element.checked) {
              if (!newFormData[name]) {
                newFormData[name] = [];
              }
              newFormData[name].push(element.value);
            }
          } else if (element.type === 'radio') {
            if (element.checked) {
              newFormData[name] = element.value;
            }
          } else if (element.value.trim() !== '') {
            newFormData[name] = element.value;
          }
        }
      });

      this.formData = { ...this.formData, ...newFormData };
    }
  }

  generateRecommendations() {
    if (!this.validateCurrentPhase()) {
      return;
    }

    this.saveFormData();

    // Überprüfe, ob alle notwendigen Daten vorhanden sind
    const requiredFields = [
      'systemName', 'autonomy', 'measurability', 'inferenceCosts',
      'sector', 'reimbursement', 'salesEffort', 'implementation',
      'competition', 'customerFencing', 'upgradePath'
    ];

    const missingFields = requiredFields.filter(field => !this.formData[field]);
    
    if (missingFields.length > 0) {
      this.snackBar.open('Bitte füllen Sie alle notwendigen Felder aus.', 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['error-snackbar']
      });
      return;
    }

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

  calculatePricingRecommendations() {
    const data = this.formData;
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
    const resultsContent = document.querySelector('.results-container');
    if (!resultsContent) {
      this.snackBar.open('Keine Ergebnisse zum Exportieren verfügbar.', 'OK', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['warning-snackbar']
      });
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
      <html>
      <head>
        <title>DDSS Pricing Strategy - ${this.formData.systemName || 'Report'}</title>
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
          <p><strong>System:</strong> ${this.formData.systemName || 'Unbekannt'}</p>
        </div>
        ${resultsContent.innerHTML}
      </body>
      </html>
    `);
      
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  }

  exportJSON() {
    const exportData = {
      timestamp: new Date().toISOString(),
      systemName: this.formData.systemName || 'Unnamed System',
      formData: this.formData,
      recommendations: this.results
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `ddss-pricing-${(this.formData.systemName || 'report').replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }
}
