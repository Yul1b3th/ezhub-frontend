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
import { DsButtonComponent } from '@design-system/components/ds-button/ds-button.component';

@Component({
  selector: 'ds-modal',
  imports: [CommonModule, DsButtonComponent],
  templateUrl: './ds-modal.component.html',
  styleUrls: ['./ds-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsModalComponent {
  public readonly themeService = inject(ThemeService);

  @Input() title: string = '';
  @Input() show: boolean = false;
  @Input() showOverlay: boolean = true;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  saveChanges(): void {
    this.save.emit();
  }
}
