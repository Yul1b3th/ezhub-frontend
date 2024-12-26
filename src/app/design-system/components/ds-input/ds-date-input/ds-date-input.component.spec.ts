import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDateInputComponent } from './ds-date-input.component';

describe('DsDateInputComponent', () => {
  let component: DsDateInputComponent;
  let fixture: ComponentFixture<DsDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsDateInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
