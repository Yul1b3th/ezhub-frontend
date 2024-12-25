import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSliderComponent } from './ds-slider.component';

describe('DsSliderComponent', () => {
  let component: DsSliderComponent;
  let fixture: ComponentFixture<DsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
