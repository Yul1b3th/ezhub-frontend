import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsCheckboxComponent } from './ds-checkbox.component';

describe('DsCheckboxComponent', () => {
  let component: DsCheckboxComponent;
  let fixture: ComponentFixture<DsCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
