import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemFooterComponent } from './design-system-footer.component';

describe('DesignSystemFooterComponent', () => {
  let component: DesignSystemFooterComponent;
  let fixture: ComponentFixture<DesignSystemFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignSystemFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSystemFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
