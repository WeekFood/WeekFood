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
  nuevaContra: string;
  fotoSeBorrara: boolean = false;

  constructor(private usuariosService: UsuariosService) { this.nuevaContra = "Generar nueva" }

  ngOnInit() {
    // clonar usuario para no tocar el verdadero usuario
    this.usuarioEditado = Object.assign({}, this.usuario);
    if (this.modo == 'crear') {
      this.generarNuevaContra()
    }
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
    this.usuarioEditado.contraseña = this.nuevaContra
    this.usuariosService.crearUsuario(this.usuarioEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al crear Usuario');
      });
  }

  editar() {
    this.usuarioEditado.contraseña = this.nuevaContra
    this.usuariosService.editarUsuario(this.usuarioEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al editar Usuario');
      });
  }

  borrar() {
    this.usuariosService.borrarUsuario(this.usuarioEditado)
      .then(res => {
        this.cerrarse(true);
      })
      .catch((xhr: any) => {
        console.error('Error AJAX al borrar Usuario');
      });
  }
  // https://stackoverflow.com/questions/1497481/javascript-password-generator
  generarNuevaContra() {
    var length = 15,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    this.nuevaContra = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      this.nuevaContra += charset.charAt(Math.floor(Math.random() * n));
    }
  }

  borrarFoto() {
    this.fotoSeBorrara = true
  }

  deshacerBorrarFoto() {
    this.fotoSeBorrara = false
  }
}