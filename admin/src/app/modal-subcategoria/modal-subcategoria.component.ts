import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subcategoria } from '../models/Subcategoria';
import { SubcategoriasService } from '../services/subcategorias.service';

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

  constructor(private subcategoriasService: SubcategoriasService) { }

  ngOnInit() {
    $('.js-modal-subcategoria').modal('show');
    // clonar subcategoria para no tocar la verdadera subcategoria
    // deep copy para no tocar el objeto Categoria referenciado
    // TODO: no dará problemas al ser una copia sin clases? subCategoriaDe se copia como Object, no como Categoria
    this.subcategoriaEditada = JSON.parse(JSON.stringify(this.subcategoria));
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
}
