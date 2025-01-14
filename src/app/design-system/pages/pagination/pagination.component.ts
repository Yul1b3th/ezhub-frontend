import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DsPaginationComponent } from '@design-system/components/ds-pagination/ds-pagination.component';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'pagination',
  imports: [CommonModule, DsPaginationComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaginationComponent {
  public readonly themeService = inject(ThemeService);
  currentPage = 1;

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }
}
