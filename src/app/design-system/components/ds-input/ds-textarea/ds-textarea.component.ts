import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  inject,
  Input,
  Provider,
  ViewChild,
  ElementRef,
  Renderer2,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

import { ThemeService } from '@design-system/services/theme.service';

const TEXTAREA_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsTextareaComponent),
  multi: true,
};

@Component({
  selector: 'ds-textarea',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ds-textarea.component.html',
  styleUrls: ['./ds-textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TEXTAREA_VALUE_ACCESSOR],
})
export class DsTextareaComponent implements ControlValueAccessor {
  public readonly themeService = inject(ThemeService);
  private readonly renderer = inject(Renderer2);

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() ariaRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() errorMessage: string | null = null;

  @ViewChild('textarea', { static: false }) textarea!: ElementRef;

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
    const input = event.target as HTMLTextAreaElement;
    this.onChange(input.value);
  }

  handleBlur(): void {
    this.onTouched();
  }
}
