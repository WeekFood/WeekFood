import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static API_AUTH = `http://${window.location.hostname}:${environment.API_PUERTO}/api/auth`;

  constructor() {}

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
