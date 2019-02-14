import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Carrito } from 'src/app/models/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CarritosService {

  private static API_CARRITOS = `http://${window.location.hostname}:${environment.API_PUERTO}/api/carritos`;

  constructor() { }

  getCarritos() {
    return $.get(CarritosService.API_CARRITOS).then((array: any[]) => {
      return array.map(carrito => {
        return new Carrito(
          carrito.id,
          carrito.idUsuario,
          new Date(carrito.fecha)
        );
      });
    });
  }
}
