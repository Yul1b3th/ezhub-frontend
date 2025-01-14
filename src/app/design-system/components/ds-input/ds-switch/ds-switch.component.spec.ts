import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSwitchComponent } from './ds-switch.component';

describe('DsSwitchComponent', () => {
  let component: DsSwitchComponent;
  let fixture: ComponentFixture<DsSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
