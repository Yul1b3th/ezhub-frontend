import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DsDatePickerComponent } from '@design-system/components/ds-date-picker/ds-date-picker.component';
import { ThemeService } from '@design-system/services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'page-date-picker',
  imports: [CommonModule, ReactiveFormsModule, DsDatePickerComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatePickerComponent implements OnInit {
  public readonly themeService = inject(ThemeService);
  private readonly fb = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      datePicker: [''],
    });
  }
}
