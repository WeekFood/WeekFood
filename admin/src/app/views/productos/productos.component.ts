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

  modoEditar: boolean = false;
  modalAbierto: boolean = false;

  constructor(private productosService: ProductosService) {}
  
  async ngOnInit() {
    this.productos = await this.productosService.getProductos();
  }

  abrirModalVer(producto: Producto) {
    this.modalAbierto = true;
    this.modoEditar = false;

    this.productoActual = producto;
  }

  abrirModalEditar(producto: Producto) {
    this.modalAbierto = true;
    this.modoEditar = true;

    this.productoActual = producto;
  }

  destruirModal() {
    this.modalAbierto = false;
    this.modoEditar = false;
    this.productoActual = null;
  }

  editarProducto(productoEditado) {
    console.log('recibido producto editado', productoEditado);
    // TODO: mandar a ProductosService
  }
}
