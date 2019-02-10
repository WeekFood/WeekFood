import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private permiso: boolean = undefined
  private logueado: boolean = undefined
  private static API_AUTH = `http://${window.location.hostname}:${environment.API_PUERTO}/api/auth`;

  constructor() {
    var token = this.leerToken()
    this.comprobarLogin(token)
  }
  esAdmin() {
    return this.permiso
  }

  estaAutorizado() {
    if (!this.logueado && this.permiso) {
      this.permiso = false
      console.error("INCOHERENCIA, NO ESTAS LOGUEADO PERO SI QUE TIENES PERMISO")
    }
    return this.logueado && this.permiso
  }

  estaLogueado() {
    return this.logueado
  }
  leerToken() {
    var cookies = document.cookie.split("; ")
    var token = undefined
    cookies.forEach(cookie => {
      if (cookie.startsWith("token=")) {
        token = cookie.split("token=")[1]
      }
    })
    return token
  }

  comprobarLogin(token) {
    this.logueado = false
    this.permiso = false
    if (token != undefined) {
      if (!this.renovadoToken()) {
        return false;
      }
    }
  }
  renovadoToken() {
    console.log("Mandando peticion")
    $.getJSON(AuthService.API_AUTH+"/renovar_login")
    return true
  }
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
}
