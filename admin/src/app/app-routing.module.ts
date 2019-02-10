import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './views/productos/productos.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { NoEncontradoComponent } from './views/no-encontrado/no-encontrado.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: NoEncontradoComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
