import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Input,
  Provider,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { ThemeService } from '@design-system/services/theme.service';

const DATE_PICKER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsDatePickerComponent),
  multi: true,
};

@Component({
  selector: 'ds-date-picker',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ds-date-picker.component.html',
  styleUrls: ['./ds-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_PICKER_VALUE_ACCESSOR],
})
export class DsDatePickerComponent implements ControlValueAccessor {
  public readonly themeService = inject(ThemeService);

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() ariaRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() errorMessage: string | null = null;
  @Input() minDate: string | null = null;
  @Input() maxDate: string | null = null;
  @Input() disabledDates: string[] = [];

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.onChange(input.value);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
