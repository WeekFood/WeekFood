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
    $.ajax({
      type: 'POST',
      url: `http://${window.location.hostname}:${environment.API_PUERTO}/api/auth/login`,
      contentType: "application/x-www-form-urlencoded",
      data: "nick=" + $(".js-nick").val() + "&contraseña=" + $(".js-contra").val(),
      xhrFields: {
        withCredentials: true // cors: necesario para enviar Y RECIBIR cookies
      }
    })
      .done(
        () => { window.location.href = "/admin" }
      )
  }
}
