import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() title: string = 'Modal Title';
  @Input() isActive: boolean = false;
  @Input() closeOnOverlay: boolean = true; // Nueva propiedad para controlar el cierre al hacer clic en el overlay
  @Output() isActiveChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  closeModal() {
    this.isActive = false;
    this.isActiveChange.emit(this.isActive);
    this.closed.emit();
  }

  closeOnOverlayClick(event: MouseEvent) {
    if (this.closeOnOverlay && (event.target as HTMLElement).classList.contains('modal__overlay')) {
      this.closeModal();
    }
  }
}
