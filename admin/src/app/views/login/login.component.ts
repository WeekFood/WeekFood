import { Component, Injector, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { AuthProviderService } from 'src/app/providers/authprovider.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public nick: string = ""
  public contra: string = ""

  public errorUsuario: String = ""
  public errorContra: String = ""

  constructor(
    private injector: Injector,
    private authService: AuthService,
    private authProvi: AuthProviderService
  ) { }

  //https://stackoverflow.com/questions/39767019/app-initializer-raises-cannot-instantiate-cyclic-dependency-applicationref-w
  public get router(): Router {
    return this.injector.get(Router);
  }

  acceder(evento) {
    if (evento != 'Enter') {
      return
    }
    var valido = true

    this.errorUsuario = ""
    this.errorContra = ""

    if (this.nick == "") {
      this.errorUsuario = "Está vacio"
      valido = false
    }

    if (this.contra == "") {
      this.errorContra = "Está vacio"
      valido = false
    }

    if (valido) {
      this.authService.login(this.nick, this.contra)
        .done(() => {
          this.authService.setPreparando()
          this.authProvi.comprobarToken(this.authService)
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
