import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDatePickerComponent } from './ds-date-picker.component';

describe('DsDatePickerComponent', () => {
  let component: DsDatePickerComponent;
  let fixture: ComponentFixture<DsDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsDatePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
