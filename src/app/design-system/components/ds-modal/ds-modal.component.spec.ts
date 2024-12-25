import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsModalComponent } from './ds-modal.component';

describe('DsModalComponent', () => {
  let component: DsModalComponent;
  let fixture: ComponentFixture<DsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
