import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsNavigationComponent } from './rooms-navigation.component';

describe('RoomsNavigationComponent', () => {
  let component: RoomsNavigationComponent;
  let fixture: ComponentFixture<RoomsNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
