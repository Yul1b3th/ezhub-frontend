import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  // imports: [ModalComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export default class LegalNoticeComponent {
  isModalActive = false;
  modalTitle = 'Dynamic Modal Title';

  openModal() {
    this.isModalActive = true;
  }
}
