import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static API_AUTH = 'http://localhost:7272/api/auth';

  constructor(private http: HttpClient) {}

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
