import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsPasswordInputComponent } from './ds-password-input.component';

describe('DsPasswordInputComponent', () => {
  let component: DsPasswordInputComponent;
  let fixture: ComponentFixture<DsPasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPasswordInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsPasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
