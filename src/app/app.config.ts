import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import mapboxgl from 'mapbox-gl';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { authInterceptor } from './interceptors/auth-interceptor.interceptor';

mapboxgl.accessToken = environment.mapbox_key;

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    //provideHttpClient(withInterceptors([authInterceptor, tokenInterceptor])),
    //provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(HttpClientModule),
    provideAnimationsAsync(),
  ],
};
