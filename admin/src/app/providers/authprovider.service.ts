import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {

  constructor(private auth: AuthService, private injector: Injector) { }
  validacionInicial() {
    return $.when(this.comprobarToken())
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
  public get router(): Router { //this creates router property on your service.
    return this.injector.get(Router);
  }
  comprobarToken() {
    var token = this.leerToken()
    if (token != undefined) {
      return $.ajax({
        type: 'GET',
        url: this.auth.getAPI() + `/renovar_login`,
        contentType: 'application/x-www-form-urlencoded',
        xhrFields: {
          withCredentials: true
        }
      }).done(() => {
        this.auth.setLogueado()
        var idUsuario = token.split(".")[0]
        return $.ajax({
          type: 'GET',
          url: `http://${window.location.hostname}:${environment.API_PUERTO}/api/usuarios/` + idUsuario + '/nivelPrivilegio',
          contentType: 'application/x-www-form-urlencoded',
          xhrFields: {
            withCredentials: true
          }
        }).done((respuesta) => {
          if (respuesta.length > 0
            && respuesta[0].hasOwnProperty("nivelprivilegio")
            && respuesta[0].nivelprivilegio > 0
          ) {
            setTimeout(
              ()=>{
                this.auth.setPermiso()
                this.auth.setPreparado()
                this.router.navigate([''])
              },5000
            )
          }
        })
      }).fail(() => {
        document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/"
      })
    }
  }
}