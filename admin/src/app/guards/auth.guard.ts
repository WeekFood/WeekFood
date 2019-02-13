import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url !== "/desautorizado" && !this.auth.getEstaAutorizado()) {
      if (this.router.url !== "/login") {
        this.router.navigate(['login'])
      } else {
        this.router.navigate(['desautorizado'])
      }
    }
    if (state.url === "/desautorizado" && this.auth.getEstaAutorizado()) {
      this.router.navigate([''])
    }
    return true;
  }

}
