import { Router } from '@angular/router';
import { Injector, Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { AuthProviderService } from 'src/app/providers/authprovider.service';
@Component({
  selector: 'app-desautorizado',
  templateUrl: './desautorizado.component.html',
  styleUrls: ['./desautorizado.component.scss']
})
export class DesautorizadoComponent {
  constructor(
    private injector: Injector,
    private authService: AuthService,
    private authProvi: AuthProviderService
  ) { }

  //https://stackoverflow.com/questions/39767019/app-initializer-raises-cannot-instantiate-cyclic-dependency-applicationref-w
  public get router(): Router {
    return this.injector.get(Router);
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
        this.authService.setPreparando()
        this.authProvi.comprobarToken()
      })
  }
}
