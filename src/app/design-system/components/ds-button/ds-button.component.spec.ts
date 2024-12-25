import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsButtonComponent } from './ds-button.component';

describe('DsButtonComponent', () => {
  let component: DsButtonComponent;
  let fixture: ComponentFixture<DsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
