import { Component, OnInit } from '@angular/core';

import { Producto } from '../../models/Producto';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productoActual: Producto;

  productos: Producto[];

  modalAbierto: boolean = false;
  modoModal: string = '';

  constructor(private productosService: ProductosService) {}
  
  ngOnInit() {
    this.productosService.getProductos()
      .subscribe((productos: Producto[]) => {
        this.productos = productos;
      })
  }

  abrirModalVer(producto: Producto) {
    this.modalAbierto = true;
    this.modoModal = 'ver';

    this.productoActual = producto;
  }

  abrirModalEditar(producto: Producto) {
    this.modalAbierto = true;
    this.modoModal = 'editar';

    this.productoActual = producto;
  }

  abrirModalNuevo() {
    this.modalAbierto = true;
    this.modoModal = 'crear';

    this.productoActual = new Producto(null, '', [], '', '', false, 0);
  }

  abrirModalBorrar(producto: Producto) {
    this.modalAbierto = true;
    this.modoModal = 'borrar';

    this.productoActual = producto;
  }

  destruirModal() {
    this.modalAbierto = false;
    this.modoModal = '';

    this.productoActual = null;
  }

  editarProducto(productoEditado) {
    console.log('recibido producto editado', productoEditado);
    // TODO: mandar a ProductosService
    this.destruirModal();
  }

  crearProducto(productoCreado) {
    console.log('recibido producto creado', productoCreado);
    // TODO: mandar a ProductosService
    this.destruirModal();
  }

  borrarProducto(productoBorrado) {
    console.log('recibido producto borrado', productoBorrado);
    // TODO: mandar a ProductosService
    this.destruirModal();
  }
}
