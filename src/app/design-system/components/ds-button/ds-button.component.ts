import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  Renderer2,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'ds-button',
  imports: [CommonModule],
  templateUrl: './ds-button.component.html',
  styleUrls: ['./ds-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsButtonComponent implements AfterViewInit {
  public readonly themeService = inject(ThemeService);
  private readonly renderer = inject(Renderer2);

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() btnClass: string = 'btn-primary';
  @Input() block: boolean = false;
  @Input() tertiary: boolean = false;
  @Input() ghost: boolean = false;
  @Input() iconOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';
  @Input() href?: string;
  @Input() target?: '_self' | '_blank' | '_parent' | '_top' = '_self';
  @Input() iconSvg: string | null = null;
  @Input() btnIcon: string | null = null;

  // Nuevas entradas para personalización
  @Input() textColor: string | null = null;
  @Input() bgColor: string | null = null;
  @Input() padding: string | null = null;
  @Input() fontSize: string | null = null;
  @Input() fontWeight: string | null = null;
  @Input() lineHeight: string | null = null;
  @Input() border: string | null = null;
  @Input() borderRadius: string | null = null;

  @ViewChild('buttonElement', { static: false }) buttonElement!: ElementRef;
  @ViewChild('iconContainer', { static: false }) iconContainer!: ElementRef;

  private get customStyles(): { [key: string]: string | null } {
    return {
      'background-color': this.bgColor,
      'border-color': this.bgColor,
      color: this.textColor,
      padding: this.padding,
      'font-size': this.fontSize,
      'font-weight': this.fontWeight,
      'line-height': this.lineHeight,
      border: this.border,
      'border-radius': this.borderRadius,
    };
  }

  ngAfterViewInit(): void {
    if (this.iconSvg && this.iconContainer) {
      this.iconContainer.nativeElement.innerHTML = this.iconSvg;
    }
    if (Object.values(this.customStyles).some((style) => style)) {
      this.applyCustomStyles();
    }
  }

  get buttonClasses(): string[] {
    const themeClass = this.themeService.theme();
    const baseClass = this.tertiary
      ? `btn-tertiary-${this.btnClass.replace('btn-', '')}`
      : this.ghost
        ? `btn-ghost-${this.btnClass.replace('btn-', '')}`
        : this.btnClass;
    return [
      'btn',
      baseClass,
      themeClass,
      this.block ? 'btn-block' : '',
      this.iconOnly ? 'btn-icon' : '',
      this.btnIcon ? this.btnIcon : '',
      Object.values(this.customStyles).some((style) => style)
        ? 'btn-custom'
        : '',
    ].filter(Boolean);
  }

  private applyCustomStyles(): void {
    const buttonElement = this.buttonElement.nativeElement;
    Object.entries(this.customStyles).forEach(([style, value]) => {
      if (value) {
        this.renderer.setStyle(buttonElement, style, value);
      }
    });
  }
}
