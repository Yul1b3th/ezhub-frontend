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

const RADIO_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsRadioComponent),
  multi: true,
};

@Component({
  selector: 'ds-radio',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ds-radio.component.html',
  styleUrls: ['./ds-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RADIO_VALUE_ACCESSOR],
})
export class DsRadioComponent implements ControlValueAccessor {
  public readonly themeService = inject(ThemeService);

  @Input() id: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() ariaRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() checked: boolean = false;
  @Input() errorMessage: string | null = null;

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
