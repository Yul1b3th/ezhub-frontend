import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  Renderer2,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-design-system',
  templateUrl: './design-system.component.html',
  styleUrls: ['./design-system.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DesignSystemComponent implements OnInit {
  @ViewChild('navbarMenu', { static: false }) navbarMenu!: ElementRef;
  menuOpen = false;
  isDarkMode = false;
  selectedTab = 'tab1';
  notificationVisible = false;

  // Propiedades para la paginación
  currentPage = 1;
  totalPages = 10; // Puedes ajustar esto según tus necesidades
  pages: number[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeTheme();
    this.showNotification();
    this.initializePagination();
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
    }
    this.applyTheme();
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

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  applyTheme() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
      this.renderer.removeClass(document.body, 'light-mode');
    } else {
      this.renderer.addClass(document.body, 'light-mode');
      this.renderer.removeClass(document.body, 'dark-mode');
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
