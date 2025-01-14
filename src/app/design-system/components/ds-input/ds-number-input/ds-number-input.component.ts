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

const NUMBER_INPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsNumberInputComponent),
  multi: true,
};

@Component({
  selector: 'ds-number-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ds-number-input.component.html',
  styleUrls: ['./ds-number-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NUMBER_INPUT_VALUE_ACCESSOR],
})
export class DsNumberInputComponent
  implements ControlValueAccessor, AfterViewInit
{
  public readonly themeService = inject(ThemeService);
  private readonly renderer = inject(Renderer2);

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() ariaRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: number | null = null;
  @Input() errorMessage: string | null = null;
  @Input() iconSvg: string | null = null;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() step: number = 1;

  @ViewChild('iconContainer', { static: false }) iconContainer!: ElementRef;

  private onChange: (value: number | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
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
    this.onChange(input.valueAsNumber);
  }

  handleBlur(): void {
    this.onTouched();
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
