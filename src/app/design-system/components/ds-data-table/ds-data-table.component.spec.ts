import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsDataTableComponent } from './ds-data-table.component';

describe('DsDataTableComponent', () => {
  let component: DsDataTableComponent;
  let fixture: ComponentFixture<DsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsDataTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
