import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsAlertComponent } from './ds-alert.component';

describe('DsAlertComponent', () => {
  let component: DsAlertComponent;
  let fixture: ComponentFixture<DsAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
