import { Component, OnInit } from '@angular/core';

import { Categoria } from 'src/app/models/Categoria';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categoriaActual: Categoria;
  categorias: Categoria[];

  modalAbierto: boolean = false;
  modoModal: string = '';

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriasService.getCategorias()
      .then((categorias: Categoria[]) => {
        this.categorias = categorias;
      });
  }

  abrirModalVer(categoria: Categoria) {
    this.modalAbierto = true;
    this.modoModal = 'ver';

    this.categoriaActual = categoria;
  }

  abrirModalEditar(categoria: Categoria) {
    this.modalAbierto = true;
    this.modoModal = 'editar';

    this.categoriaActual = categoria;
  }

  abrirModalNuevo() {
    this.modalAbierto = true;
    this.modoModal = 'crear';

    this.categoriaActual = new Categoria('');
  }

  abrirModalBorrar(categoria: Categoria) {
    this.modalAbierto = true;
    this.modoModal = 'borrar';

    this.categoriaActual = categoria;
  }

  alCerrarseModal(actualizarse: boolean) {
    this.modalAbierto = false;
    this.modoModal = '';

    this.categoriaActual = null;

    if (actualizarse) {
      this.getCategorias();
    }
  }
}
