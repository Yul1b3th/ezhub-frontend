import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsThemeSelectorComponent } from './ds-theme-selector.component';

describe('DsThemeSelectorComponent', () => {
  let component: DsThemeSelectorComponent;
  let fixture: ComponentFixture<DsThemeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsThemeSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsThemeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
