import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UsuariosService } from 'src/app/services/usuarios.service';

import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent implements OnInit {
  @Input() usuario: Usuario;
  @Input() modo: string;

  @Output() cerrado = new EventEmitter<boolean>();

  usuarioEditado: Usuario;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    // clonar usuario para no tocar el verdadero usuario
    this.usuarioEditado = Object.assign({}, this.usuario);

    $('.js-modal-usuario').modal('show');
  }

  cerrarse(actualizarVista: boolean = false) {
    $('.js-modal-usuario').modal('hide').one('hidden.bs.modal', () => {
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
    this.usuariosService.crearUsuario(this.usuarioEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al crear Usuario');
        console.log('Categoria:', this.usuarioEditado);
        console.log('XHR:', xhr);
      });
  }

  editar() {
    this.usuariosService.editarUsuario(this.usuarioEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al editar Usuario');
        console.log('Categoria:', this.usuarioEditado);
        console.log('XHR:', xhr);
      });
  }

  borrar() {
    this.usuariosService.borrarUsuario(this.usuarioEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al borrar Usuario');
        console.log('Producto:', this.usuarioEditado);
        console.log('XHR:', xhr);
      });
  }
}
