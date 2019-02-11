import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-desautorizado',
  templateUrl: './desautorizado.component.html',
  styleUrls: ['./desautorizado.component.scss']
})
export class DesautorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(".js-boton-cerrar").click(this.cerrarSesion)
  }

  cerrarSesion() {
    $.ajax({
      type: 'GET',
      url: `http://${window.location.hostname}:${environment.API_PUERTO}/api/auth/logout`,
      contentType: 'application/x-www-form-urlencoded',
      xhrFields: {
        withCredentials: true
      }
    })
      .always(() => {
        window.location.href = "/admin"
      })
  }
}
