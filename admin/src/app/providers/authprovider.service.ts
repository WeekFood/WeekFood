import { Injectable, Injector } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {

  constructor(private injector: Injector) { }
  validacionInicial(auth) {
    return this.comprobarToken(auth)
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

  comprobarToken(auth) {
    var token = this.leerToken()
    if (token != undefined) {
      return $.ajax({
        type: 'GET',
        url: auth.getAPI() + `/renovar_login`,
        contentType: 'application/x-www-form-urlencoded',
        xhrFields: {
          withCredentials: true
        }

      })
        .done(() => {

          auth.setLogueado()
          var idUsuario = token.split(".")[0]
          return $.ajax({
            type: 'GET',
            url: `http://${window.location.hostname}:${environment.API_PUERTO}/api/usuarios/` + idUsuario + '/nivelPrivilegio',
            contentType: 'application/x-www-form-urlencoded',
            xhrFields: {
              withCredentials: true
            }

          })

            .done((respuesta) => {
              if (respuesta.length > 0
                && respuesta[0].hasOwnProperty("nivelprivilegio")
                && respuesta[0].nivelprivilegio > 0
              ) {
                auth.setPermiso()
                auth.setPreparado()
              }
            })

            .fail(() => {
              auth.setPreparado()
            })

        })

        .fail(() => {
          document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/"
          auth.setPreparado()
        })
    } else {
      auth.setPreparado()
    }
  }
}