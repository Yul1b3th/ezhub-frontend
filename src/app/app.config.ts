import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled', // Habilita la navegación por anclas
        scrollPositionRestoration: 'enabled', // Restaura la posición del desplazamiento
      })
    ),
  ],
};
