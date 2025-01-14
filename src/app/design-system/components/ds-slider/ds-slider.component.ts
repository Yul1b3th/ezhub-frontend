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

const SLIDER_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsSliderComponent),
  multi: true,
};

@Component({
  selector: 'ds-slider',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ds-slider.component.html',
  styleUrls: ['./ds-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SLIDER_VALUE_ACCESSOR],
})
export class DsSliderComponent implements ControlValueAccessor {
  public readonly themeService = inject(ThemeService);

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() ariaRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: number = 0;
  @Input() errorMessage: string | null = null;

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
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
    this.onChange(Number(input.value));
  }

  handleBlur(): void {
    this.onTouched();
  }
}
