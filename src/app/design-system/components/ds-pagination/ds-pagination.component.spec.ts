import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsPaginationComponent } from './ds-pagination.component';

describe('DsPaginationComponent', () => {
  let component: DsPaginationComponent;
  let fixture: ComponentFixture<DsPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
