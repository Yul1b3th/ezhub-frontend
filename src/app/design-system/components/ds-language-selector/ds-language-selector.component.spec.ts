import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsLanguageSelectorComponent } from './ds-language-selector.component';

describe('DsLanguageSelectorComponent', () => {
  let component: DsLanguageSelectorComponent;
  let fixture: ComponentFixture<DsLanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsLanguageSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsLanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
