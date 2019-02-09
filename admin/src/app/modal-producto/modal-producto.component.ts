import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../models/Producto';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {

  @Input() producto: Producto;
  @Input() modo: string;

  @Output() cerrado = new EventEmitter();

  productoEditado: Producto;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    $('.js-modal-producto').modal('show');
    // clonar producto para no tocar el verdadero producto
    this.productoEditado = Object.assign({}, this.producto);
  }

  cerrarse() {
    $('.js-modal-producto').modal('hide').one('hidden.bs.modal', () => {
      // destuir modal solo cuando se haya ocultado visualmente
      this.cerrado.emit();
    });
  }

  cerrarseOverlay(evento) {
    // solo cerrar si se ha hecho click en el overlay, no en el modal como tal
    if (evento.target === document.querySelector('.modal')) {
      this.cerrarse();
    }
  }

  cerrarseEsc(evento) {
    if (evento.key === 'Escape') {
      this.cerrarse();
    }
  }

  guardar() {
    // TODO: enlazar con service
    $('.js-modal-producto').modal('hide').one('hidden.bs.modal', () => {
      // destuir modal solo cuando se haya ocultado visualmente
      this.cerrado.emit();
    });
  }

  crear() {
    // TODO: enlazar con service
    $('.js-modal-producto').modal('hide').one('hidden.bs.modal', () => {
      // destuir modal solo cuando se haya ocultado visualmente
      this.cerrado.emit();
    });
  }

  borrar() {
    // TODO: enlazar con service
    $('.js-modal-producto').modal('hide').one('hidden.bs.modal', () => {
      // destuir modal solo cuando se haya ocultado visualmente
      this.cerrado.emit();
    });
  }
}
