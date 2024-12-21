import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsMapComponent } from './rooms-map.component';

describe('RoomsMapComponent', () => {
  let component: RoomsMapComponent;
  let fixture: ComponentFixture<RoomsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
