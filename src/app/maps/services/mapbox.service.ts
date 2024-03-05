import { Injectable } from '@angular/core';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  private geocodingClient;

  constructor() {
    this.geocodingClient = mbxGeocoding({
      accessToken: 'tu-token-de-acceso-de-mapbox',
    });
  }

  getCoordinates(address: string, postalCode: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.geocodingClient
        .forwardGeocode({
          query: `${address}, ${postalCode}`,
          limit: 1,
        })
        .send()
        .then((response) => {
          const { features } = response.body;
          if (features.length > 0) {
            const { center } = features[0];
            resolve({ longitude: center[0], latitude: center[1] });
          } else {
            reject('No se encontraron resultados');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
