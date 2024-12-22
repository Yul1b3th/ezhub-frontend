import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsCarousel2Component } from './ds-carousel2.component';

describe('DsCarousel2Component', () => {
  let component: DsCarousel2Component;
  let fixture: ComponentFixture<DsCarousel2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCarousel2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsCarousel2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
