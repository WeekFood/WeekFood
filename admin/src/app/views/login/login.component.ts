import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { AuthProviderService } from 'src/app/providers/authprovider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private errorUsuario: String = ""
  private errorContra: String = ""

  constructor(
    private injector: Injector,
    private authService: AuthService,
    private authProvi: AuthProviderService
  ) { }

  //https://stackoverflow.com/questions/39767019/app-initializer-raises-cannot-instantiate-cyclic-dependency-applicationref-w
  public get router(): Router {
    return this.injector.get(Router);
  }

  acceder() {
    var valido = true

    this.errorUsuario = ""
    this.errorContra = ""

    if ($(".js-nick").val().toString().length == 0) {
      this.errorUsuario = "Está vacio"
      valido = false
    }

    if ($(".js-contra").val().toString().length == 0) {
      this.errorContra = "Está vacio"
      valido = false
    }

    if (valido) {
      $.ajax({
        type: 'POST',
        url: `http://${window.location.hostname}:${environment.API_PUERTO}/api/auth/login`,
        contentType: "application/x-www-form-urlencoded",
        data: "nick=" + $(".js-nick").val() + "&contraseña=" + $(".js-contra").val(),
        xhrFields: {
          withCredentials: true // cors: necesario para enviar Y RECIBIR cookies
        }
      })
        .done(() => {
          this.authService.setPreparando()
          this.authProvi.comprobarToken()
        })

        .fail((respuesta) => {
          switch (respuesta.responseJSON.error) {
            case "USUARIO_NO_ENCONTRADO":
              this.errorUsuario = "No existe"
              break

            case "CONTRASEÑA_INCORRECTA":
              this.errorContra = "Incorrecta"
              break

            case "CAMPOS_VACIOS":
              this.errorUsuario = "Está vacio"
              this.errorContra = "Está vacio"
          }
        })
    }
  }
}
