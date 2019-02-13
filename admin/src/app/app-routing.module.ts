import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from './views/productos/productos.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { NoEncontradoComponent } from './views/no-encontrado/no-encontrado.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { SubcategoriasComponent } from './views/subcategorias/subcategorias.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'productos',
    component: ProductosComponent
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
    component: NoEncontradoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
