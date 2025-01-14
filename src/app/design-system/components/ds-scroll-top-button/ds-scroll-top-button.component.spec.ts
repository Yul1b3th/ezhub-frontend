import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsScrollTopButtonComponent } from './ds-scroll-top-button.component';

describe('DsScrollTopButtonComponent', () => {
  let component: DsScrollTopButtonComponent;
  let fixture: ComponentFixture<DsScrollTopButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsScrollTopButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsScrollTopButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
