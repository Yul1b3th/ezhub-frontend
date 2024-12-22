import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsBootstrapComponent } from './ds-bootstrap.component';

describe('DsBootstrapComponent', () => {
  let component: DsBootstrapComponent;
  let fixture: ComponentFixture<DsBootstrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsBootstrapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
