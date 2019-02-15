import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosComponent } from 'src/app/views/productos/productos.component';
import { InicioComponent } from 'src/app/views/inicio/inicio.component';
import { NoEncontradoComponent } from 'src/app/views/no-encontrado/no-encontrado.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { DesautorizadoComponent } from 'src/app/views/desautorizado/desautorizado.component';
import { CargandoComponent } from 'src/app/views/cargando/cargando.component';
import { CategoriasComponent } from 'src/app/views/categorias/categorias.component';
import { SubcategoriasComponent } from 'src/app/views/subcategorias/subcategorias.component';
import { UsuariosComponent } from 'src/app/views/usuarios/usuarios.component';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { LoginGuard } from 'src/app/guards/login.guard';
import { CargandoGuard } from 'src/app/guards/cargando.guard';
import { CarritosComponent } from 'src/app/views/carritos/carritos.component';

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
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'carritos',
    component: CarritosComponent
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
