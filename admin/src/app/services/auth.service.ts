import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static API_AUTH = `http://${window.location.hostname}:${environment.API_PUERTO}/api/auth`;

  constructor(private http: HttpClient) {}

  login(nick: string, contraseña: string) {
    let cuerpo = new HttpParams()
                  .set('nick', nick)
                  .set('contraseña', contraseña);

    return this.http.post(`${AuthService.API_AUTH}/login`, cuerpo, {
      withCredentials: true // necesario para enviar Y RECIBIR cookies
    });
  }
}
