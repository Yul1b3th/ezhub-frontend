import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsCarouselComponent } from './ds-carousel.component';

describe('DsCarouselComponent', () => {
  let component: DsCarouselComponent;
  let fixture: ComponentFixture<DsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
