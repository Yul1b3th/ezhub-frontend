import {
  Component,
  HostListener,
  ViewChildren,
  ViewChild,
  QueryList,
  ElementRef,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @ViewChildren('menuItems') menuItems!: QueryList<ElementRef>;
  @ViewChild('toggleButton', { static: true }) toggleButton!: ElementRef;
  @ViewChild('userMenuButton', { static: true }) userMenuButton!: ElementRef;

  menuOpen = false;
  helpContact = false;
  accessibility = false;
  ezhub = false;
  darkMode = false;
  fontSize = 16; // Tamaño de fuente inicial en px

  userMenuOpen = false;

  public authService = inject(AuthService);
  public router = inject(Router);

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.darkMode = savedTheme === 'dark';
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      }
    }

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      this.fontSize = Number(savedFontSize);
      document.documentElement.style.fontSize = `${this.fontSize}px`;
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/rooms/list');
  }

  toggleHelpContact() {
    this.helpContact = !this.helpContact;
  }

  toggleAccessibility() {
    this.accessibility = !this.accessibility;
  }

  toggleEZHub() {
    this.ezhub = !this.ezhub;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeAllMenus();
    }

    if (event.key === 'Tab' && this.menuOpen) {
      const menuItemsArray = this.menuItems.toArray();
      const lastMenuItem = menuItemsArray[menuItemsArray.length - 1];

      if (document.activeElement === lastMenuItem.nativeElement) {
        event.preventDefault();
        menuItemsArray[0].nativeElement.focus();
      }
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  increaseFontSize() {
    if (this.fontSize < 32) {
      this.fontSize++;
      document.documentElement.style.fontSize = `${this.fontSize}px`;
      localStorage.setItem('fontSize', this.fontSize.toString());
    }
  }

  decreaseFontSize() {
    if (this.fontSize > 14) {
      this.fontSize--;
      document.documentElement.style.fontSize = `${this.fontSize}px`;
      localStorage.setItem('fontSize', this.fontSize.toString());
    }
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
    if (this.userMenuOpen) {
      this.menuOpen = false;
    }
    this.setAriaExpanded(this.userMenuButton, this.userMenuOpen);
  }

  closeUserMenu() {
    this.userMenuOpen = false;
    this.setAriaExpanded(this.userMenuButton, false);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.helpContact = false;
    this.accessibility = false;
    this.ezhub = false;
    this.setAriaExpanded(this.toggleButton, this.menuOpen);

    if (this.menuOpen) {
      this.userMenuOpen = false;
      setTimeout(() => {
        const menuItemsArray = this.menuItems.toArray();
        if (menuItemsArray.length > 0) {
          menuItemsArray[0].nativeElement.focus();
        }
      });
    }
  }

  onMenuClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.id === 'menu') {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.menuOpen = false;
    this.helpContact = false;
    this.accessibility = false;
    this.ezhub = false;
    this.setAriaExpanded(this.toggleButton, false);
  }

  closeAllMenus() {
    this.menuOpen = false;
    this.userMenuOpen = false;
    this.helpContact = false;
    this.accessibility = false;
    this.ezhub = false;
    this.setAriaExpanded(this.toggleButton, false);
    this.setAriaExpanded(this.userMenuButton, false);
  }

  setAriaExpanded(element: ElementRef, expanded: boolean) {
    if (element) {
      element.nativeElement.setAttribute('aria-expanded', expanded.toString());
    }
  }

  publish() {}
}
