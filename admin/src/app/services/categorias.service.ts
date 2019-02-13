import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Categoria } from '../models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private static API_CATEGORIAS = `http://${window.location.hostname}:${environment.API_PUERTO}/api/productos/categorias`;

  constructor() { }

  getCategorias() {
    return $.get(CategoriasService.API_CATEGORIAS).then((array: any[]) => {
      return array.map(categoria => {
        return new Categoria(
          categoria.nombre
        );
      });
    });
  }

  editarCategoria(categoria: Categoria) {
    // TODO
    return new Promise(() => {});
  }

  crearCategoria(categoria: Categoria) {
    // TODO
    return new Promise(() => {});
  }

  borrarCategoria(categoria: Categoria) {
    // TODO
    return new Promise(() => {});
  }
}
