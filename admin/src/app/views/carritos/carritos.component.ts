import { Component, OnInit } from '@angular/core';

import { CarritosService } from 'src/app/services/carritos.service';
import { Carrito } from 'src/app/models/Carrito';

@Component({
  selector: 'app-carritos',
  templateUrl: './carritos.component.html',
  styleUrls: ['./carritos.component.scss']
})
export class CarritosComponent implements OnInit {
  carritos: Carrito[];
  carritoActual: Carrito;

  modalAbierto: boolean = false;
  modoModal: string = '';

  constructor(private carritosService: CarritosService) { }

  ngOnInit() {
    this.getCarritos();
  }

  getCarritos() {
    this.carritosService.getCarritos()
      .then((carritos: Carrito[]) => {
        this.carritos = carritos;
      });
  }

  abrirModalVer(carrito: Carrito) {
		console.log('TCL: CarritosComponent -> abrirModalVer -> carrito', carrito)
    this.modalAbierto = true;
    this.modoModal = 'ver';

    this.carritoActual = carrito;
		console.log('TCL: CarritosComponent -> abrirModalVer -> this.carritoActual', this.carritoActual)
  }

  abrirModalEditar(carrito: Carrito) {
    this.modalAbierto = true;
    this.modoModal = 'editar';

    this.carritoActual = carrito;
  }

  abrirModalNuevo() {
    this.modalAbierto = true;
    this.modoModal = 'crear';

    this.carritoActual = new Carrito(null, null, new Date().toISOString().slice(0, 19).replace('T', ' '));
  }

  abrirModalBorrar(carrito: Carrito) {
    this.modalAbierto = true;
    this.modoModal = 'borrar';

    this.carritoActual = carrito;
  }

  alCerrarseModal(actualizarse: boolean) {
    this.modalAbierto = false;
    this.modoModal = '';

    this.carritoActual = null;

    if (actualizarse) {
      this.getCarritos();
    }
  }
}
