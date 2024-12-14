import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, ButtonComponent],
})
export class DesignSystemComponent implements OnInit {
  themeService = inject(ThemeService);
  @ViewChild('navbarMenu', { static: false }) navbarMenu!: ElementRef;
  menuOpen = false;
  isDarkMode = false;
  selectedTab = 'tab1';
  notificationVisible = false;

  // Propiedades para la paginación
  currentPage = 1;
  totalPages = 10; // Puedes ajustar esto según tus necesidades
  pages: number[] = [];

  ngOnInit() {
    this.showNotification();
    this.initializePagination();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.navbarMenu) {
      if (this.menuOpen) {
        this.navbarMenu.nativeElement.classList.add('open');
      } else {
        this.navbarMenu.nativeElement.classList.remove('open');
      }
    }
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  showNotification() {
    this.notificationVisible = true;
    setTimeout(() => {
      this.notificationVisible = false;
    }, 5000); // Ocultar la notificación después de 5 segundos
  }

  closeNotification() {
    this.notificationVisible = false;
  }

  // Métodos para la paginación
  initializePagination() {
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    // Lógica adicional para cargar los datos de la página seleccionada
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      // Lógica adicional para cargar los datos de la página anterior
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      // Lógica adicional para cargar los datos de la página siguiente
    }
  }
}
