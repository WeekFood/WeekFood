import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductosService } from 'src/app/services/productos.service';

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

  constructor(private productosService: ProductosService) { }

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
    this.productosService.editarProducto(this.productoEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al editar Producto');
        console.log('Producto:', this.productoEditado);
        console.log('XHR:', xhr);
      });
  }

  crear() {
    this.productosService.crearProducto(this.productoEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al crear Producto');
        console.log('Producto:', this.productoEditado);
        console.log('XHR:', xhr);
      });
  }

  borrar() {
    this.productosService.borrarProducto(this.productoEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al borrar Producto');
        console.log('Producto:', this.productoEditado);
        console.log('XHR:', xhr);
      });
  }
}
