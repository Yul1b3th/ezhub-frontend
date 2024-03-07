import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AuthService } from './services/auth.service';
import { AuthStatus } from './components/auth/interfaces/auth-status.enum';
import { CommonModule } from '@angular/common';
import { PlacesService } from './maps/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'authApp';

  private authService = inject(AuthService);
  private router = inject(Router);

  // con esta variable sabremos si el usuario ya termino de autenticarse
  public finishedAuthCheck = computed<boolean>(() => {
    // console.log(this.authService.authStatus())
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  constructor(private placesServices: PlacesService) {
    // console.log('constructor');
    // console.log(this.finishedAuthCheck());
    console.log(this.placesServices.useLocation);
  }

  ngOnInit(): void {
    // console.log('ngOnInit');
    // console.log(this.finishedAuthCheck());
  }

  // Aqui hacemos la peticion http
  // Se dispara automáticamente cuando cambia el estado de autenticación (authStatus).
  public authStatusChangedEffect = effect(() => {
    //console.log('first');
    //console.log('authStatus', this.authService.authStatus());
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        console.log(AuthStatus.checking);
        //console.log(this.finishedAuthCheck());
        return;

      case AuthStatus.authenticated:
        console.log(AuthStatus.authenticated);
        //console.log(this.finishedAuthCheck());
        //this.router.navigateByUrl('/dashboard');
        return;

      case AuthStatus.notAuthenticated:
        console.log(AuthStatus.notAuthenticated);
        //console.log(this.finishedAuthCheck());
        //this.router.navigateByUrl('/auth/login');
        return;
    }
  });
}
