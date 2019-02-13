import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Subcategoria } from 'src/app/models/Subcategoria';
import { Categoria } from 'src/app/models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriasService {
  private static API_SUBCATEGORIAS = `http://${window.location.hostname}:${environment.API_PUERTO}/api/productos/categorias/subcategorias`;

  constructor() { }

  getSubcategorias() {
    return $.get(SubcategoriasService.API_SUBCATEGORIAS).then((array: any[]) => {
      return array.map(subcategoria => {
        return new Subcategoria(
          subcategoria.nombre,
          new Categoria(subcategoria.subCategoriaDe)
        );
      });
    });
  }
  
  crearSubcategoria(subcategoria: Subcategoria) {
    return $.ajax({
      type: 'POST',
      url: SubcategoriasService.API_SUBCATEGORIAS,
      contentType: 'application/json',
      data: JSON.stringify(subcategoria),
      xhrFields: {
        withCredentials: true
      }
    });
  }

  editarSubcategoria(subcategoria: Subcategoria, nombreAnterior: string) {
    return $.ajax({
      type: 'PUT',
      url: `${SubcategoriasService.API_SUBCATEGORIAS}/${nombreAnterior}`,
      contentType: 'application/json',
      data: JSON.stringify(subcategoria),
      xhrFields: {
        withCredentials: true
      }
    });
  }
}
