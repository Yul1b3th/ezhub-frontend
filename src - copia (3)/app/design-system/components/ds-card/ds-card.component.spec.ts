import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsCardComponent } from './ds-card.component';

describe('DsCardComponent', () => {
  let component: DsCardComponent;
  let fixture: ComponentFixture<DsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
