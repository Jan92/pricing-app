import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PricingCalculatorComponent } from './pricing-calculator/pricing-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    PricingCalculatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
