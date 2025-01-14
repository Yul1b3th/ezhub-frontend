import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  Provider,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { ThemeService } from '@design-system/services/theme.service';

const SELECT_INPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsSelectInputComponent),
  multi: true,
};

@Component({
  selector: 'ds-select-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ds-select-input.component.html',
  styleUrls: ['./ds-select-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SELECT_INPUT_VALUE_ACCESSOR],
})
export class DsSelectInputComponent
  implements ControlValueAccessor, AfterViewInit
{
  public readonly themeService = inject(ThemeService);
  private readonly renderer = inject(Renderer2);

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() ariaRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() errorMessage: string | null = null;
  @Input() options: { label: string; value: any }[] = [];

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
    const select = event.target as HTMLSelectElement;
    this.onChange(select.value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  ngAfterViewInit(): void {}
}
