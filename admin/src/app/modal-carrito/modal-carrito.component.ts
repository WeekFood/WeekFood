import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Carrito } from '../models/Carrito';

import { CarritosService } from '../services/carritos.service';

@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal-carrito.component.html',
  styleUrls: ['./modal-carrito.component.scss']
})
export class ModalCarritoComponent implements OnInit {
  @Input() carrito: Carrito;
  @Input() modo: string;

  @Output() cerrado = new EventEmitter<boolean>();

  carritoEditado: Carrito;

  constructor(private carritosService: CarritosService) { }
  
  ngOnInit() {
    // clonar carrito para no tocar el verdadero carrito
    this.carritoEditado = Object.assign({}, this.carrito);
    
    $('.js-modal-carrito').modal('show');
  }

  cerrarse(actualizarVista: boolean = false) {
    $('.js-modal-carrito').modal('hide').one('hidden.bs.modal', () => {
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

    this.carritosService.crearCarrito(this.carritoEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al crear Carrito');
        console.log('Carrito:', this.carritoEditado);
        console.log('XHR:', xhr);
      });
  }

  editar() {
    if (!this.formularioEsValido()) {
      return;
    }

    this.carritosService.editarCarrito(this.carritoEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al editar Carrito');
        console.log('Carrito:', this.carritoEditado);
        console.log('XHR:', xhr);
      });
  }

  borrar() {
    this.carritosService.borrarCarrito(this.carritoEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al borrar Carrito');
        console.log('Carrito:', this.carritoEditado);
        console.log('XHR:', xhr);
      });
  }

  formularioEsValido(): boolean {
    return ($('.js-formulario')[0] as HTMLFormElement).reportValidity();
  }
}
