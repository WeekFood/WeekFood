import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosComponent } from './views/productos/productos.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { NoEncontradoComponent } from './views/no-encontrado/no-encontrado.component';
import { LoginComponent } from './views/login/login.component';
import { DesautorizadoComponent } from './views/desautorizado/desautorizado.component';
import { CargandoComponent } from './views/cargando/cargando.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { SubcategoriasComponent } from './views/subcategorias/subcategorias.component';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginGuard } from 'src/app/guards/login.guard';
import { CargandoGuard } from 'src/app/guards/cargando.guard';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    canActivate: [CargandoGuard, AuthGuard]
  },
  {
    path: 'productos',
    component: ProductosComponent,
    canActivate: [CargandoGuard, AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CargandoGuard, LoginGuard]
  },
  {
    path: 'desautorizado',
    component: DesautorizadoComponent,
    canActivate: [CargandoGuard, AuthGuard]
  },
  {
    path: 'cargando',
    component: CargandoComponent,
    canActivate: [CargandoGuard]
  },
  {
    path: 'categorias',
    component: CategoriasComponent
  },
  {
    path: 'subcategorias',
    component: SubcategoriasComponent
  },
  {
    path: '**',
    component: NoEncontradoComponent,
    canActivate: [CargandoGuard, AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
