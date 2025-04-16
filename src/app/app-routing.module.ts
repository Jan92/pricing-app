import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataInputComponent } from './data-input/data-input.component';
import { ScoreManagementComponent } from './score-management/score-management.component';
import { ScoreOutputComponent } from './score-output/score-output.component';
import { ScorePropertiesComponent } from './score-properties/score-properties.component';

const routes: Routes = [
  { path: 'input', component: DataInputComponent },
  { path: 'manage', component: ScoreManagementComponent },
  { path: 'manage/:evaluationId', component: ScoreOutputComponent },
  { path: 'properties', component: ScorePropertiesComponent },
  { path: '', redirectTo: '/input', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 