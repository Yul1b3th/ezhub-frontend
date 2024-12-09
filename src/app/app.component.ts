import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AuthService } from './services/auth.service';
import { AuthStatus } from './components/auth/interfaces/auth-status.enum';
import { PlacesService } from './maps/services';
import { NotificationComponent } from './components/shared/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'authApp';

  private authService = inject(AuthService);

  // con esta variable sabremos si el usuario ya termino de autenticarse
  public finishedAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  constructor(private placesServices: PlacesService) {
    // console.log('constructor');
    // console.log(this.finishedAuthCheck());
    // console.log(this.placesServices.useLocation);
  }

  // Aqui hacemos la peticion http
  // Se dispara automáticamente cuando cambia el estado de autenticación (authStatus).
  public authStatusChangedEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        console.log(AuthStatus.checking);
        return;

      case AuthStatus.authenticated:
        console.log(AuthStatus.authenticated);
        return;

      case AuthStatus.notAuthenticated:
        // console.log(AuthStatus.notAuthenticated);
        return;
    }
  });
}
