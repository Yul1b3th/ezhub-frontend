import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsRadioComponent } from './ds-radio.component';

describe('DsRadioComponent', () => {
  let component: DsRadioComponent;
  let fixture: ComponentFixture<DsRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsRadioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
