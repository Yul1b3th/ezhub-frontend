import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  private themeService = inject(ThemeService);

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() btnClass: string = 'btn-primary'; // Valores validados mediante mixins
  @Input() size: 'btn-sm' | 'btn-md' | 'btn-lg' = 'btn-md';
  @Input() block: boolean = false;
  @Input() outline: boolean = false;
  @Input() disabled: boolean = false;
  @Input() ariaLabel: string = '';

  get buttonClasses(): string[] {
    const themeClass = this.themeService.dsTheme(); // 'dark-mode' / 'light-mode' / 'dark-like'
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
