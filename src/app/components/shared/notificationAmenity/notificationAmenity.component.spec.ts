import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAmenityComponent } from './notificationAmenity.component';

describe('NotificationAmenityComponent', () => {
  let component: NotificationAmenityComponent;
  let fixture: ComponentFixture<NotificationAmenityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationAmenityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
