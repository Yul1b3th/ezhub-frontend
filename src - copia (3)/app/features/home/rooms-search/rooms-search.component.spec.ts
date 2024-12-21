import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsSearchComponent } from './rooms-search.component';

describe('RoomsSearchComponent', () => {
  let component: RoomsSearchComponent;
  let fixture: ComponentFixture<RoomsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomsSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
