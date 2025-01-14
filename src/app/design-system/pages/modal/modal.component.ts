import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DsModalComponent } from '@design-system/components/ds-modal/ds-modal.component';
import { DsButtonComponent } from '@design-system/components/ds-button/ds-button.component';
import { ThemeService } from '@design-system/services/theme.service';

@Component({
  selector: 'modal',
  imports: [CommonModule, DsModalComponent, DsButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ModalComponent {
  public readonly themeService = inject(ThemeService);
  isModalOpen = false;

  handleClose() {
    this.isModalOpen = false;
  }

  handleSave() {
    console.log('Modal saved');
    this.isModalOpen = false;
  }
}
