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

const PASSWORD_INPUT_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsPasswordInputComponent),
  multi: true,
};

@Component({
  selector: 'ds-password-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ds-password-input.component.html',
  styleUrls: ['./ds-password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PASSWORD_INPUT_VALUE_ACCESSOR],
})
export class DsPasswordInputComponent
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
  @Input() iconSvg: string =
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
  </svg>`;

  @ViewChild('iconContainer', { static: false }) iconContainer!: ElementRef;

  showPassword: boolean = false;

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

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
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
