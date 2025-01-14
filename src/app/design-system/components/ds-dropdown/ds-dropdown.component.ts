import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  Renderer2,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ThemeService } from '@design-system/services/theme.service';

interface DropdownOption {
  label: string;
  icon?: string | SafeHtml | undefined;
  dropdownClass?: string;
  size?: 'dropdown-sm' | 'dropdown-md' | 'dropdown-lg';
  block?: boolean;
  outline?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  bgColor?: string | null;
  textColor?: string | null;
  borderRadius?: string | null;
}

@Component({
  selector: 'ds-dropdown',
  imports: [CommonModule],
  templateUrl: './ds-dropdown.component.html',
  styleUrls: ['./ds-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDropdownComponent implements AfterViewInit, OnChanges {
  private themeService = inject(ThemeService);
  private renderer = inject(Renderer2);
  private sanitizer = inject(DomSanitizer);

  @Input() label: string = '';
  @Input() options: DropdownOption[] = [];
  @Input() selectedOption: DropdownOption | null = null;
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() iconSvg: string | null = null;

  // Nuevas entradas para personalización
  @Input() bgColor: string | null = null;
  @Input() textColor: string | null = null;
  @Input() borderRadius: string | null = null;
  @Input() size: 'dropdown-sm' | 'dropdown-md' | 'dropdown-lg' = 'dropdown-md';
  @Input() block: boolean = false;
  @Input() outline: boolean = false;
  @Input() dropdownClass: string = 'dropdown-primary';

  @ViewChild('dropdownElement', { static: false }) dropdownElement!: ElementRef;
  @ViewChild('iconContainer', { static: false }) iconContainer!: ElementRef;
  @ViewChild('selectedIconContainer', { static: false })
  selectedIconContainer!: ElementRef;
  @ViewChildren('iconContainer') iconContainers!: QueryList<ElementRef>;

  isOpen: boolean = false;

  ngAfterViewInit(): void {
    this.setIconSvg();
    this.setSelectedIconSvg();
    this.applyCustomStyles();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.sanitizeOptions();
    }
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: DropdownOption): void {
    this.selectedOption = option;
    this.isOpen = false;
    this.setSelectedIconSvg();
  }

  get dropdownClasses(): string[] {
    const themeClass = this.themeService.theme();
    const baseClass = this.outline
      ? `dropdown-outline-${this.dropdownClass.replace('dropdown-', '')}`
      : this.dropdownClass;
    return [
      'dropdown-toggle',
      baseClass,
      this.size,
      themeClass,
      this.block ? 'dropdown-block' : '',
      this.disabled ? 'disabled' : '',
    ].filter(Boolean);
  }

  private setIconSvg(): void {
    if (this.iconSvg && this.iconContainer) {
      this.iconContainer.nativeElement.innerHTML = this.iconSvg;
    }
    this.iconContainers.forEach((container, index) => {
      const option = this.options[index];
      if (option.icon) {
        container.nativeElement.innerHTML = option.icon;
      }
    });
  }

  private setSelectedIconSvg(): void {
    if (this.selectedOption?.icon && this.selectedIconContainer) {
      this.selectedIconContainer.nativeElement.innerHTML =
        this.selectedOption.icon;
    }
  }

  private applyCustomStyles(): void {
    const dropdownElement = this.dropdownElement.nativeElement;
    this.setStyle(dropdownElement, 'background-color', this.bgColor);
    this.setStyle(dropdownElement, 'border-color', this.bgColor);
    this.setStyle(dropdownElement, 'color', this.textColor);
    this.setStyle(dropdownElement, 'border-radius', this.borderRadius);
  }

  private setStyle(
    element: any,
    styleName: string,
    value: string | null,
  ): void {
    if (value) {
      this.renderer.setStyle(element, styleName, value);
    }
  }

  private sanitizeOptions(): void {
    this.options = this.options.map((option) => ({
      ...option,
      icon: option.icon
        ? this.sanitizer.bypassSecurityTrustHtml(option.icon as string)
        : undefined,
    }));
  }
}
