import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Register the German locale data
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

// Import Angular Material modules directly
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PricingCalculatorComponent } from './pricing-calculator/pricing-calculator.component';
import { ScoreOutputComponent } from './score-output/score-output.component';
import { DataInputComponent } from './data-input/data-input.component';
import { ScoreManagementComponent } from './score-management/score-management.component';
import { ScorePropertiesComponent } from './score-properties/score-properties.component';

// New component and pipe for series simulation results
import { SeriesResultsComponent } from './score-output/series-results.component';
import { FilterByOriginalValuePipe } from './score-output/filter-by-original-value.pipe';
import { PricingStrategyComponent } from './pricing-strategy/pricing-strategy.component';

@NgModule({
  declarations: [
    AppComponent,
    // PricingCalculatorComponent, // Removed because it is standalone
    ScoreOutputComponent,
    DataInputComponent,
    ScoreManagementComponent,
    ScorePropertiesComponent,
    SeriesResultsComponent,
    FilterByOriginalValuePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    // Material modules
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatSelectModule,
    MatTabsModule,
    MatDividerModule,
    MatMenuModule,
    MatSidenavModule,
    PricingStrategyComponent
  ],
  providers: [
    // Provide LOCALE_ID for German
    { provide: LOCALE_ID, useValue: 'de' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
