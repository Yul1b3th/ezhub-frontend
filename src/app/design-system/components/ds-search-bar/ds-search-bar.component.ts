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
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { ThemeService } from '@design-system/services/theme.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

const SEARCH_BAR_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DsSearchBarComponent),
  multi: true,
};

@Component({
  selector: 'ds-search-bar',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ds-search-bar.component.html',
  styleUrls: ['./ds-search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SEARCH_BAR_VALUE_ACCESSOR],
})
export class DsSearchBarComponent implements ControlValueAccessor, OnInit {
  public readonly themeService = inject(ThemeService);
  private readonly renderer = inject(Renderer2);

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() ariaRequired: boolean = false;
  @Input() disabled: boolean = false;
  @Input() value: string = '';
  @Input() errorMessage: string | null = null;
  @Input() options: string[] = [];

  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef;

  searchControl = new FormControl();
  filteredOptions: string[] = [];
  showOptions: boolean = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => this.filterOptions(value)),
      )
      .subscribe((options) => {
        this.filteredOptions = options;
        this.onChange(this.searchControl.value);
      });

    // Manejar el estado disabled del FormControl
    if (this.disabled) {
      this.searchControl.disable();
    }
  }

  writeValue(value: string): void {
    this.value = value;
    this.searchControl.setValue(value, { emitEvent: false });
    console.log('Valor recibido en el hijo:', value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.searchControl.disable();
    } else {
      this.searchControl.enable();
    }
  }

  handleBlur(): void {
    this.onTouched();
    this.showOptions = false;
  }

  handleFocus(): void {
    this.showOptions = true;
    this.filteredOptions = this.options;
  }

  selectOption(option: string): void {
    console.log('Opción seleccionada:', option);
    this.searchControl.setValue(option, { emitEvent: true });
    this.onChange(option);
    this.showOptions = false;
  }

  private filterOptions(value: string) {
    if (!value) {
      return of(this.options);
    }
    const filterValue = value.toLowerCase();
    return of(
      this.options.filter((option) =>
        option.toLowerCase().includes(filterValue),
      ),
    );
  }
}
