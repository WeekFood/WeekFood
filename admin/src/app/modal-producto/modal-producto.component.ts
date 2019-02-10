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

  @Output() cerrado = new EventEmitter<boolean>();

  productoEditado: Producto;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    $('.js-modal-producto').modal('show');
    // clonar producto para no tocar el verdadero producto
    this.productoEditado = Object.assign({}, this.producto);
  }

  cerrarse(actualizarVista: boolean = false) {
    $('.js-modal-producto').modal('hide').one('hidden.bs.modal', () => {
      // destuir modal solo cuando se haya ocultado visualmente
      this.cerrado.emit(actualizarVista);
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
    this.productosService.editarProducto(this.productoEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any, status, err) => {
        console.error('TCL: ModalProductoComponent -> crear -> xhr', xhr.responseJSON);
      })
  }

  crear() {
    this.productosService.crearProducto(this.productoEditado)
    .then(res => {
      this.cerrarse(true);
    })
    .catch((xhr:any, status, err) => {
			console.error('TCL: ModalProductoComponent -> crear -> xhr', xhr.responseJSON);
    })
  }

  borrar() {
    // TODO: enlazar con service
    this.cerrarse(true);
  }
}
