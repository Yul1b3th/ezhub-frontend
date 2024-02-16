import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HostListener } from '@angular/core';
import { ViewChildren, QueryList, ElementRef } from '@angular/core';

import { SearchBarComponent } from '../../search-bar/search-bar.component';

@Component({
  selector: 'nav',
  standalone: true,
  imports: [RouterModule, CommonModule, SearchBarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @ViewChildren('menuItems') menuItems!: QueryList<ElementRef>;

  helpContact = false;
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleHelpContact() {
    this.helpContact = !this.helpContact;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.menuOpen = false;
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
}
