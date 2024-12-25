import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsEmailInputComponent } from './ds-email-input.component';

describe('DsEmailInputComponent', () => {
  let component: DsEmailInputComponent;
  let fixture: ComponentFixture<DsEmailInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsEmailInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsEmailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
