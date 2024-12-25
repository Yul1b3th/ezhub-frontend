import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStylesComponent } from './base-styles.component';

describe('BaseStylesComponent', () => {
  let component: BaseStylesComponent;
  let fixture: ComponentFixture<BaseStylesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseStylesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseStylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
