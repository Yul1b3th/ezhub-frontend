import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'ds-pagination',
  imports: [CommonModule],
  templateUrl: './ds-pagination.component.html',
  styleUrls: ['./ds-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsPaginationComponent {
  public readonly themeService = inject(ThemeService);

  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() currentPageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.currentPageChange.emit(this.currentPage);
    }
  }
}
