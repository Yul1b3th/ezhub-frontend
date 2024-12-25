import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsTextareaComponent } from './ds-textarea.component';

describe('DsTextareaComponent', () => {
  let component: DsTextareaComponent;
  let fixture: ComponentFixture<DsTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
