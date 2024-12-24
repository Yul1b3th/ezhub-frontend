import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsCarouselListComponent } from './ds-carousel-list.component';

describe('DsCarouselListComponent', () => {
  let component: DsCarouselListComponent;
  let fixture: ComponentFixture<DsCarouselListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCarouselListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsCarouselListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
