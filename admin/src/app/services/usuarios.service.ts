import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private static API_USUARIOS = `http://${window.location.hostname}:${environment.API_PUERTO}/api/usuarios`;

  constructor() { }

  getUsuarios() {
    return $.ajax({
      type: 'GET',
      url: UsuariosService.API_USUARIOS,
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true
      }
    })
      .then((array: any[]) => {
        return array.map(usuario => {
          return new Usuario(
            usuario.id,
            usuario.nick,
            usuario.nombre,
            usuario.apellidos,
            usuario.foto,
            usuario.sexo,
            usuario.telefono,
            usuario.nacimiento,
            usuario.nivelprivilegio
          );
        });
      });
  }

  crearUsuario(usuario: Usuario) {
    return $.ajax({
      type: 'POST',
      url: UsuariosService.API_USUARIOS,
      contentType: 'application/json',
      data: JSON.stringify(usuario),
      xhrFields: {
        withCredentials: true
      }
    });
  }

  editarUsuario(usuario: Usuario) {
    return $.ajax({
      type: 'PUT',
      url: `${UsuariosService.API_USUARIOS}/${usuario.id}`,
      contentType: 'application/json',
      data: JSON.stringify(usuario),
      xhrFields: {
        withCredentials: true
      }
    });
  }

  borrarUsuario(usuario: Usuario) {
    return $.ajax({
      type: 'DELETE',
      url: `${UsuariosService.API_USUARIOS}/${usuario.id}`,
      contentType: 'application/json',
      data: JSON.stringify(usuario),
      xhrFields: {
        withCredentials: true
      }
    });
  }
}