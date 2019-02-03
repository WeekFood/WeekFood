import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static API_AUTH = `http://${window.location.hostname}:${environment.PUERTO_API}/api/auth`;;

  constructor(private http: HttpClient) {
    console.log('@@ AuthService // env', environment);
    console.log('@@ AuthService // API_AUTH', AuthService.API_AUTH);
  }

  postLogin(nick: string, contraseña: string) {
    let cuerpo = new URLSearchParams();
    cuerpo.set('nick', nick);
    cuerpo.set('contraseña', contraseña);

    return this.http.post(`${AuthService.API_AUTH}/login`, cuerpo.toString(), {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      withCredentials: true // necesario para enviar Y RECIBIR cookies
    });
  }
}
