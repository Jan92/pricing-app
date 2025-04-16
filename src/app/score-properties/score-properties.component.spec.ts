import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorePropertiesComponent } from './score-properties.component';

describe('ScorePropertiesComponent', () => {
  let component: ScorePropertiesComponent;
  let fixture: ComponentFixture<ScorePropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScorePropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
