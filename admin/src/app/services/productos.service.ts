import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';

import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private static API_PRODUCTOS = `http://${window.location.hostname}:${environment.API_PUERTO}/api/productos`;

  constructor(private http: HttpClient) { }

  getProductos() {
    return this.http.get(ProductosService.API_PRODUCTOS).pipe(map((array: any[]) => {
      return array.map(producto => {
        return new Producto(
          parseInt(producto.id),
          producto.nombre,
          producto.categoria.split(','),
          producto.descripcion,
          producto.foto,
          Boolean(producto.destacado),
          parseInt(producto.precio)
        );
      })
    }
    ));
  }
}
