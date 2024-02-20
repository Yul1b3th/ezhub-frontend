import { Component, OnInit } from '@angular/core';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export default class AddComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const city = 'Barcelona';
    const street = 'Ferlandina 29';

    this.geocodeAddress(city, street).subscribe((result: any) => {
      const latitude = result.features[0].geometry.coordinates[1];
      const longitude = result.features[0].geometry.coordinates[0];

      // Aquí puedes guardar las coordenadas en tu base de datos
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    });
  }

  geocodeAddress(city: string, street: string): Observable<any> {
    const accessToken =
      'pk.eyJ1IjoieXVsaWJldGgiLCJhIjoiY2xybHlvZjVjMHgxYzJrazBnOHV2M2JxNCJ9.KAW0_8Te5N3Jgq2n42Fo7Q';
    const query = encodeURIComponent(`${street}, ${city}, España`);

    return this.http.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}`
    );
  }
}
