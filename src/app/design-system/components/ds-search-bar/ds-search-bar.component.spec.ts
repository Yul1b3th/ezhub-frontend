import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSearchBarComponent } from './ds-search-bar.component';

describe('DsSearchBarComponent', () => {
  let component: DsSearchBarComponent;
  let fixture: ComponentFixture<DsSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
