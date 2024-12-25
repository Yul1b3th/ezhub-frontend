import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSelectInputComponent } from './ds-select-input.component';

describe('DsSelectInputComponent', () => {
  let component: DsSelectInputComponent;
  let fixture: ComponentFixture<DsSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSelectInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
