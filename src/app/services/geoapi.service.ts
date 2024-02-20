import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GeoApiService {
  private baseUrl = 'https://apiv1.geoapi.es';

  constructor(private http: HttpClient) {}

  getComunidades() {
    return this.http.get(`${this.baseUrl}/comunidades`);
  }

  getProvincias(comunidadId: string) {
    return this.http.get(`${this.baseUrl}/provincias?CCOM=${comunidadId}`);
  }

  getMunicipios(provinciaId: string) {
    return this.http.get(`${this.baseUrl}/municipios?CPRO=${provinciaId}`);
  }

  getPoblaciones(provinciaId: string, municipioId: string) {
    return this.http.get(
      `${this.baseUrl}/poblaciones?CPRO=${provinciaId}&CMUM=${municipioId}`
    );
  }

  getCalles(
    provinciaId: string,
    municipioId: string,
    nucleoId: string,
    codigoPostal: string
  ) {
    return this.http.get(
      `${this.baseUrl}/calles?CPRO=${provinciaId}&CMUM=${municipioId}&CUN=${nucleoId}&CPOS=${codigoPostal}`
    );
  }
}
