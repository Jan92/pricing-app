import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingCalculatorComponent } from './pricing-calculator.component';

describe('PricingCalculatorComponent', () => {
  let component: PricingCalculatorComponent;
  let fixture: ComponentFixture<PricingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PricingCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
