import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'design-system-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './design-system-sidebar.component.html',
  styleUrl: './design-system-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DesignSystemSidebarComponent {
  @Output() linkClick = new EventEmitter<void>();

  onLinkClick() {
    this.linkClick.emit();
  }
}
