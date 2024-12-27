import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';

import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'ds-button',
  imports: [CommonModule],
  templateUrl: './ds-button.component.html',
  styleUrl: './ds-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsButtonComponent {
  private themeService = inject(ThemeService);

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() btnClass: string = 'btn-primary';
  @Input() size: 'btn-sm' | 'btn-md' | 'btn-lg' = 'btn-md';
  @Input() block: boolean = false;
  @Input() outline: boolean = false;
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';

  get buttonClasses(): string[] {
    const themeClass = this.themeService.theme();
    const baseClass = this.outline
      ? `btn-outline-${this.btnClass.replace('btn-', '')}`
      : this.btnClass;
    return [
      'btn',
      baseClass,
      this.size,
      themeClass,
      this.block ? 'btn-block' : '',
    ].filter(Boolean);
  }
}
