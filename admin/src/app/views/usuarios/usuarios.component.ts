import { Component, OnInit } from '@angular/core';

import { UsuariosService } from 'src/app/services/usuarios.service';

import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  usuarioActual: Usuario;
  usuarios: Usuario[];

  modalAbierto: boolean = false;
  modoModal: string = '';

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios()
      .then((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      });
  }

  abrirModalVer(usuario: Usuario) {
    this.modalAbierto = true;
    this.modoModal = 'ver';

    this.usuarioActual = usuario;
  }

  abrirModalEditar(usuario: Usuario) {
    this.modalAbierto = true;
    this.modoModal = 'editar';

    this.usuarioActual = usuario;
  }

  abrirModalNuevo() {
    this.modalAbierto = true;
    this.modoModal = 'crear';

    this.usuarioActual = new Usuario(null, '', 'Nuevo Usuario','','','','',null,'',0);
  }

  abrirModalBorrar(usuario: Usuario) {
    this.modalAbierto = true;
    this.modoModal = 'borrar';

    this.usuarioActual = usuario;
  }

  alCerrarseModal(actualizarse: boolean) {
    this.modalAbierto = false;
    this.modoModal = '';

    this.usuarioActual = null;

    if (actualizarse) {
      this.getUsuarios();
    }
  }
}
