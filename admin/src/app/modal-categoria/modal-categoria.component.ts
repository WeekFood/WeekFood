import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Categoria } from '../models/Categoria';
import { CategoriasService } from '../services/categorias.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.scss']
})
export class ModalCategoriaComponent implements OnInit {

  @Input() categoria: Categoria;
  @Input() modo: string;

  @Output() cerrado = new EventEmitter<boolean>();

  categoriaEditada: Categoria;

  constructor(private categoriasService: CategoriasService) { }

  ngOnInit() {
    $('.js-modal-categoria').modal('show');
    // clonar categoria para no tocar la verdadera categoria
    this.categoriaEditada = Object.assign({}, this.categoria);
  }

  cerrarse(actualizarVista: boolean = false) {
    $('.js-modal-categoria').modal('hide').one('hidden.bs.modal', () => {
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

  editar() {
    this.categoriasService.editarCategoria(this.categoriaEditada)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al editar Categoria');
        console.log('Categoria:', this.categoriaEditada);
        console.log('XHR:', xhr);
      });
  }

  crear() {
    this.categoriasService.crearCategoria(this.categoriaEditada)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al crear Categoria');
        console.log('Categoria:', this.categoriaEditada);
        console.log('XHR:', xhr);
      });
  }

  borrar() {
    this.categoriasService.borrarCategoria(this.categoriaEditada)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al borrar Categoria');
        console.log('Categoria:', this.categoriaEditada);
        console.log('XHR:', xhr);
      });
  }

}