import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken =
  'pk.eyJ1IjoieXVsaWJldGgiLCJhIjoiY2xybHlhMW56MG94cTJrcWVzMDBqYjhkcCJ9.qTmjUmUd0TP1fQROHjxj7A';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by your browser');
  throw new Error('Geolocation is not supported by your browser');
}

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
