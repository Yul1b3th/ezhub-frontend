import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsCardSkeletonComponent } from './ds-card-skeleton.component';

describe('DsCardSkeletonComponent', () => {
  let component: DsCardSkeletonComponent;
  let fixture: ComponentFixture<DsCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsCardSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
