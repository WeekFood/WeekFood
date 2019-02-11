import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private permiso: number = undefined
  private logueado: boolean = undefined
  private static API_AUTH = `http://${window.location.hostname}:${environment.API_PUERTO}/api/auth`;

  constructor() { }

  login(nick: string, contraseña: string) {
    return $.ajax({
      type: 'POST',
      url: `${AuthService.API_AUTH}/login`,
      contentType: 'application/x-www-form-urlencoded',
      data: {
        nick,
        contraseña
      },
      xhrFields: {
        withCredentials: true // cors: necesario para enviar Y RECIBIR cookies
      }
    });
  }
  getAPI() {
    return AuthService.API_AUTH
  }

  setLogueado() {
    this.logueado = true
  }

  setPermiso() {
    this.permiso = 9
  }

  getEsAdmin() {
    return this.permiso > 0
  }

  getEstaAutorizado() {
    if (!this.getEstaLogueado() && this.permiso != undefined) {
      this.permiso = 0
      console.error("LOGIN_INCOHERENTE")
    }
    return this.getEstaLogueado() && this.getEsAdmin()
  }

  getEstaLogueado() {
    return this.logueado
  }

}
