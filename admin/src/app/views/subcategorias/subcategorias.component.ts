import { Component, OnInit } from '@angular/core';

import { SubcategoriasService } from 'src/app/services/subcategorias.service';

import { Subcategoria } from 'src/app/models/Subcategoria';
import { Categoria } from 'src/app/models/Categoria';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.scss']
})
export class SubcategoriasComponent implements OnInit {
  subcategoriaActual: Subcategoria;
  subcategorias: Subcategoria[];
  
  modalAbierto: boolean = false;
  modoModal: string = '';

  constructor(private subcategoriasService: SubcategoriasService) { }

  ngOnInit() {
    this.getSubcategorias();
  }

  getSubcategorias() {
    this.subcategoriasService.getSubcategorias()
      .then((subcategorias: Subcategoria[]) => {
        this.subcategorias = subcategorias;
      });
  }

  abrirModalVer(subcategoria: Subcategoria) {
    this.modalAbierto = true;
    this.modoModal = 'ver';

    this.subcategoriaActual = subcategoria;
  }

  abrirModalEditar(subcategoria: Subcategoria) {
    this.modalAbierto = true;
    this.modoModal = 'editar';

    this.subcategoriaActual = subcategoria;
  }

  abrirModalNuevo() {
    this.modalAbierto = true;
    this.modoModal = 'crear';

    this.subcategoriaActual = new Subcategoria('', new Categoria(''));
  }

  abrirModalBorrar(subcategoria: Subcategoria) {
    this.modalAbierto = true;
    this.modoModal = 'borrar';

    this.subcategoriaActual = subcategoria;
  }

  alCerrarseModal(actualizarse: boolean) {
    this.modalAbierto = false;
    this.modoModal = '';

    this.subcategoriaActual = null;

    if (actualizarse) {
      this.getSubcategorias();
    }
  }
}