import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DsSliderComponent } from '@design-system/components/ds-slider/ds-slider.component';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'slider',
  imports: [CommonModule, ReactiveFormsModule, DsSliderComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SliderComponent implements OnInit {
  public readonly themeService = inject(ThemeService);
  private readonly fb = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      sliderValue: [50],
    });
  }
}
