import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemHeaderComponent } from './design-system-header.component';

describe('DesignSystemHeaderComponent', () => {
  let component: DesignSystemHeaderComponent;
  let fixture: ComponentFixture<DesignSystemHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignSystemHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSystemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
