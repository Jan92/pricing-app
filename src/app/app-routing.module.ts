import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataInputComponent } from './data-input/data-input.component';
import { ScoreManagementComponent } from './score-management/score-management.component';
import { ScoreOutputComponent } from './score-output/score-output.component';
import { ScorePropertiesComponent } from './score-properties/score-properties.component';
import { PricingCalculatorComponent } from './pricing-calculator/pricing-calculator.component';
import { SeriesResultsComponent } from './score-output/series-results.component';

const routes: Routes = [
  { path: 'input', component: DataInputComponent },
  { path: 'manage', component: ScoreManagementComponent },
  { path: 'manage/:evaluationId', component: ScoreOutputComponent },
  { path: 'properties', component: ScorePropertiesComponent },
  { path: 'pricing', component: PricingCalculatorComponent },
  { path: 'series-results', component: SeriesResultsComponent },
  { path: '', redirectTo: '/input', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { } 