import { Component } from '@angular/core';

import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor() { }
  ngOnInit(): void {
    $(".js-entrar").click(this.acceder)
  }
  acceder() {
    var valido = true

    $(".js-error-usuario").html("")
    $(".js-error-contra").html("")
    $(".js-nick").removeClass("c-login__error-campo")
    $(".js-contra").removeClass("c-login__error-campo")

    if ($(".js-nick").val().length == 0) {
      $(".js-nick").addClass("c-login__error-campo")
      $(".js-error-usuario").html("Está vacio")
      valido = false
    }

    if ($(".js-contra").val().length == 0) {
      $(".js-contra").addClass("c-login__error-campo")
      $(".js-error-contra").html("Está vacio")
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
          window.location.href = "/admin"
        })

        .fail((respuesta) => {
          switch (respuesta.responseJSON.error) {
            case "USUARIO_NO_ENCONTRADO":
              $(".js-nick").addClass("c-login__error-campo")
              $(".js-error-usuario").html("No existe")
              break

            case "CONTRASEÑA_INCORRECTA":
              $(".js-contra").addClass("c-login__error-campo")
              $(".js-error-contra").html("Incorrecta")
              break

            case "CAMPOS_VACIOS":
              $(".js-nick,.js-contra").addClass("c-login__error-campo")
              $(".js-error-usuario").html("Está vacio")
              $(".js-error-contra").html("Está vacio")
          }

        })
    }
  }
}
