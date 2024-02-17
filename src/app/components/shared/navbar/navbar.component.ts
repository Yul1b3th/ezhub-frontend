import {
  Component,
  HostListener,
  ViewChildren,
  QueryList,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchBarComponent } from '../../search-bar/search-bar.component';

@Component({
  selector: 'nav',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchBarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @ViewChildren('menuItems') menuItems!: QueryList<ElementRef>;

  menuOpen = false;
  helpContact = false;
  accessibility = false;
  ezhub = false;
  darkMode = false;
  fontSize = 16; // Tamaño de fuente inicial en px

  ngOnInit() {
    // ... tu código existente ...

    // Recuperar la preferencia del usuario del almacenamiento local
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.darkMode = savedTheme === 'dark';
      if (this.darkMode) {
        // Aplicar el tema oscuro si el usuario lo ha seleccionado previamente
        document.documentElement.classList.add('dark');
      }
    }

    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      this.fontSize = Number(savedFontSize);
      document.documentElement.style.fontSize = `${this.fontSize}px`;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.helpContact = false;
    this.accessibility = false;
    this.ezhub = false;
    const button = document.getElementById('toggleButton');
    if (button) {
      button.setAttribute('aria-expanded', this.menuOpen ? 'true' : 'false');
    }

    // Si el menú está abierto, mueve el enfoque al primer elemento del menú
    if (this.menuOpen) {
      // Espera a que la vista se actualice
      setTimeout(() => {
        const menuItemsArray = this.menuItems.toArray();
        if (menuItemsArray.length > 0) {
          menuItemsArray[0].nativeElement.focus();
        }
      });
    }
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
      this.menuOpen = false;
      this.helpContact = false;
      this.accessibility = false;
      this.ezhub = false;
      const button = document.getElementById('toggleButton');
      if (button) {
        button.setAttribute('aria-expanded', 'false');
      }
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
      // Agregar la clase CSS para el modo oscuro
      document.documentElement.classList.add('dark');
    } else {
      // Remover la clase CSS para el modo oscuro
      document.documentElement.classList.remove('dark');
    }
    // Guardar la preferencia del usuario en el almacenamiento local
    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
  }

  increaseFontSize() {
    if (this.fontSize < 40) {
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

  closeMenu() {
    this.menuOpen = false;
    this.helpContact = false;
    this.accessibility = false;
    this.ezhub = false;
    const button = document.getElementById('toggleButton');
    if (button) {
      button.setAttribute('aria-expanded', 'false');
    }
  }
}
