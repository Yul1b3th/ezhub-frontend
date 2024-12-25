import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSpinnerComponent } from './ds-spinner.component';

describe('DsSpinnerComponent', () => {
  let component: DsSpinnerComponent;
  let fixture: ComponentFixture<DsSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSpinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
