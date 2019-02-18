import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SubcategoriasService } from 'src/app/services/subcategorias.service';
import { CategoriasService } from 'src/app/services/categorias.service';

import { Subcategoria } from 'src/app/models/Subcategoria';
import { Categoria } from 'src/app/models/Categoria';

@Component({
  selector: 'app-modal-subcategoria',
  templateUrl: './modal-subcategoria.component.html',
  styleUrls: ['./modal-subcategoria.component.scss']
})
export class ModalSubcategoriaComponent implements OnInit {
  @Input() subcategoria: Subcategoria;
  @Input() modo: string;

  @Output() cerrado = new EventEmitter<boolean>();

  subcategoriaEditada: Subcategoria;
  categorias: Categoria[];

  constructor(private subcategoriasService: SubcategoriasService, private categoriasService: CategoriasService) { }

  ngOnInit() {
    // clonar subcategoria para no tocar la verdadera subcategoria
    this.subcategoriaEditada = Object.assign({}, this.subcategoria);
    
    this.categoriasService.getCategorias()
      .then((categorias: Categoria[]) => {
        this.categorias = categorias;

        // asignar referencia de objeto Categoria del array que tenemos (en vez de Categoria que se creó al vuelo)
        // de forma que pueda ser relacionado en el <select>
        // esto idealmente se haría con un array global de categorías o algo así
        this.subcategoriaEditada.subCategoriaDe = this.categorias.find(categoria => categoria.nombre === this.subcategoriaEditada.subCategoriaDe.nombre);
        
        // mostrar el modal solo cuando se hayan descargado las categorias (evitar flash de select vacío)
        $('.js-modal-subcategoria').modal('show');
      });
  }

  cerrarse(actualizarVista: boolean = false) {
    $('.js-modal-subcategoria').modal('hide').one('hidden.bs.modal', () => {
      // destuir modal solo cuando se haya ocultado visualmente
      this.cerrado.emit(actualizarVista);
    });
  }

  cerrarseOverlay(evento: MouseEvent) {
    // solo cerrar si se ha hecho click en el overlay, no en el modal como tal
    if (evento.target === document.querySelector('.modal')) {
      this.cerrarse();
    }
  }

  cerrarseEsc(evento: KeyboardEvent) {
    if (evento.key === 'Escape') {
      this.cerrarse();
    }
  }

  crear() {
    if (!this.formularioEsValido()) {
      return;
    }
    
    this.subcategoriasService.crearSubcategoria(this.subcategoriaEditada)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al crear Subcategoria');
        console.log('Categoria:', this.subcategoriaEditada);
        console.log('XHR:', xhr);
      });
  }

  editar() {
    if (!this.formularioEsValido()) {
      return;
    }

    this.subcategoriasService.editarSubcategoria(this.subcategoriaEditada, this.subcategoria.nombre)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al editar Subcategoría');
        console.log('Categoria:', this.subcategoriaEditada);
        console.log('XHR:', xhr);
      });
  }

  borrar() {
    this.subcategoriasService.borrarSubcategoria(this.subcategoriaEditada)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al borrar Subcategoria');
        console.log('Producto:', this.subcategoriaEditada);
        console.log('XHR:', xhr);
      });
  }

  formularioEsValido(): boolean {
    return ($('.js-formulario')[0] as HTMLFormElement).reportValidity();
  }
}
