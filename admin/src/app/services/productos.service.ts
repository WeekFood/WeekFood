import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

import { Producto } from '../models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private static API_PRODUCTOS = `http://${window.location.hostname}:${environment.API_PUERTO}/api/productos`;

  constructor() { }

  getProductos() {
    return $.get(ProductosService.API_PRODUCTOS).then((array: any[]) => {
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
      });
    });
  }

  crearProducto(producto: Producto) {
    delete producto.id;

    return $.ajax({
      type: 'POST',
      url: ProductosService.API_PRODUCTOS,
      contentType: 'application/json',
      data: producto,
      xhrFields: {
        withCredentials: true
      }
    });
  }
}
