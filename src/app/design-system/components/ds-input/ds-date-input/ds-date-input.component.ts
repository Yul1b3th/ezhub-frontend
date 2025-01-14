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

const DATE_INPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsDateInputComponent),
  multi: true,
};

@Component({
  selector: 'ds-date-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ds-date-input.component.html',
  styleUrls: ['./ds-date-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DATE_INPUT_VALUE_ACCESSOR],
})
export class DsDateInputComponent
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
  @Input() iconSvg: string | null = null;

  @ViewChild('iconContainer', { static: false }) iconContainer!: ElementRef;
  @ViewChild('inputDate', { static: false }) inputDate!: ElementRef;

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

  openCalendar(): void {
    this.inputDate.nativeElement.showPicker();
  }

  ngAfterViewInit(): void {
    if (this.iconSvg && this.iconContainer) {
      this.iconContainer.nativeElement.innerHTML = this.iconSvg;
    }
  }

  get hasIcon(): boolean {
    return !!this.iconSvg;
  }
}
