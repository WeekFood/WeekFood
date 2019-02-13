import { Router } from '@angular/router';
import { Injector, Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-desautorizado',
  templateUrl: './desautorizado.component.html',
  styleUrls: ['./desautorizado.component.scss']
})
export class DesautorizadoComponent {
  constructor(
    private injector: Injector,
    private auth: AuthService,
  ) { }

  //https://stackoverflow.com/questions/39767019/app-initializer-raises-cannot-instantiate-cyclic-dependency-applicationref-w
  public get router(): Router {
    return this.injector.get(Router);
  }
  cerrarSesion() {
    this.auth.logout()
  }
}
