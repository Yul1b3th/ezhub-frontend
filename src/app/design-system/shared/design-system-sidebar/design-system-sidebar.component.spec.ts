import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemSidebarComponent } from './design-system-sidebar.component';

describe('DesignSystemSidebarComponent', () => {
  let component: DesignSystemSidebarComponent;
  let fixture: ComponentFixture<DesignSystemSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignSystemSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSystemSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
