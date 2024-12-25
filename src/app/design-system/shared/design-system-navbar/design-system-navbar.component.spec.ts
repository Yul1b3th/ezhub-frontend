import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSystemNavbarComponent } from './design-system-navbar.component';

describe('DesignSystemNavbarComponent', () => {
  let component: DesignSystemNavbarComponent;
  let fixture: ComponentFixture<DesignSystemNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignSystemNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignSystemNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
