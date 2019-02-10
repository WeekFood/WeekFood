import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private permiso: boolean = undefined
  private static API_AUTH = `http://${window.location.hostname}:${environment.API_PUERTO}/api/auth`;

  constructor() {
    var cookies = document.cookie.split(";")
    var token = undefined
    cookies.forEach(cookie => {
      if (cookie.indexOf("token=") == 0) {
        token = cookie
      }
    })
    this.comprobarAdmin(token)
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
  comprobarAdmin(token) {
    // Todo: comprobar si es admin
    this.permiso = false
    console.log("Validado por la magia de nuestro señor jesucristo")
  }
  esAdmin() {
    return this.permiso
  }
}
