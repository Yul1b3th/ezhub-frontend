import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsNumberInputComponent } from './ds-number-input.component';

describe('DsNumberInputComponent', () => {
  let component: DsNumberInputComponent;
  let fixture: ComponentFixture<DsNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsNumberInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
