import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsBreadcrumbComponent } from './ds-breadcrumb.component';

describe('DsBreadcrumbComponent', () => {
  let component: DsBreadcrumbComponent;
  let fixture: ComponentFixture<DsBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
