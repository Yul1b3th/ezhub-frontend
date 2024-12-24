import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsThemeSwitchComponent } from './ds-theme-switch.component';

describe('DsThemeSwitchComponent', () => {
  let component: DsThemeSwitchComponent;
  let fixture: ComponentFixture<DsThemeSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsThemeSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsThemeSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
