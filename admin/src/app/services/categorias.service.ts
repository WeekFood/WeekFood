import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Categoria } from 'src/app/models/Categoria';

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

  editarCategoria(categoria: Categoria, nombreAnterior: string) {
    return $.ajax({
      type: 'PUT',
      url: `${CategoriasService.API_CATEGORIAS}/${nombreAnterior}`,
      contentType: 'application/json',
      data: JSON.stringify(categoria),
      xhrFields: {
        withCredentials: true
      }
    });
  }

  crearCategoria(categoria: Categoria) {
    return $.ajax({
      type: 'POST',
      url: CategoriasService.API_CATEGORIAS,
      contentType: 'application/json',
      data: JSON.stringify(categoria),
      xhrFields: {
        withCredentials: true
      }
    });
  }
}
