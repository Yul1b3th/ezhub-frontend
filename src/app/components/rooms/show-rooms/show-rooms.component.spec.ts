import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRoomsComponent } from './show-rooms.component';

describe('ShowRoomsComponent', () => {
  let component: ShowRoomsComponent;
  let fixture: ComponentFixture<ShowRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
