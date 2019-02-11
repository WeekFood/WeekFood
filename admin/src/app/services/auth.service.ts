import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private permiso: number = undefined
  private logueado: boolean = undefined
  private preparado: boolean = undefined
  private static API_AUTH = `http://${window.location.hostname}:${environment.API_PUERTO}/api/auth`;

  constructor(private injector: Injector) { this.setPreparando() }

  //https://stackoverflow.com/questions/39767019/app-initializer-raises-cannot-instantiate-cyclic-dependency-applicationref-w
  public get router(): Router {
    return this.injector.get(Router);
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

  setLogueado() {
    this.logueado = true
  }

  setPermiso() {
    this.permiso = 9
  }
  setPreparado() {
    this.preparado = true
    this.router.navigate([''])
  }

  setPreparando() {
    this.preparado = false
    this.logueado = undefined
    this.permiso = undefined
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

  getAPI() {
    return AuthService.API_AUTH
  }
  getPreparado() {
    return this.preparado
  }
}
