import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DsThemeSwitchComponent } from '../ds-theme-switch/ds-theme-switch.component';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DsThemeSwitchComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  isLoggedIn = false;
  isUserMenuOpen = false;
  isSideMenuOpen = false;

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  toggleSideMenu() {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.isUserMenuOpen = false;
  }
}
