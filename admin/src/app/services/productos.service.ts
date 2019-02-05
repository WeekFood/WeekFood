import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private static API_PRODUCTOS = `http://${window.location.hostname}:${environment.API_PUERTO}/api/productos`;

  constructor(private http: HttpClient) {}

  async getProductos() {
    let productos;

    try {
      productos = await this.http.get(ProductosService.API_PRODUCTOS).toPromise();  
    } catch(res) {
      throw new Error('ERR AWAIT' + res.error);
    }

    return productos;
  }
}
