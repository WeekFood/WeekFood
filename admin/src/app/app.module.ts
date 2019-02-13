import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductosComponent } from './views/productos/productos.component';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { NoEncontradoComponent } from './views/no-encontrado/no-encontrado.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { ModalCategoriaComponent } from './modal-categoria/modal-categoria.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    SidebarComponent,
    ProductosComponent,
    ModalProductoComponent,
    InicioComponent,
    NoEncontradoComponent,
    CategoriasComponent,
    ModalCategoriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
