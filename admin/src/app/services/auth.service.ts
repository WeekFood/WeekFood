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
    var cookies = document.cookie.split(";")
    var token = undefined
    cookies.forEach(cookie => {
      if (cookie.indexOf("token=") == 0) {
        token = cookie
      }
    })
    this.comprobarLogin(token)
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
  comprobarLogin(token) {
    // Todo: comprobar si es admin
    this.logueado = false
    this.permiso = false
    console.log("SALTADA LA COMPROBACION DE LOGIN,logueado",this.logueado,",permiso,",this.permiso)
  }
  esAdmin() {
    return this.permiso 
  }

  estaAutorizado (){
    if (!this.logueado && this.permiso){
      this.permiso = false
      console.error("INCOHERENCIA, NO ESTAS LOGUEADO PERO SI QUE TIENES PERMISO")
    }
    return this.logueado && this.permiso
  }

  estaLogueado(){
    return this.logueado
  }
}
