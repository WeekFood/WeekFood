import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductosComponent } from './views/productos/productos.component';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { NoEncontradoComponent } from './views/no-encontrado/no-encontrado.component';
import { LoginComponent } from './views/login/login.component';
import { DesautorizadoComponent } from './views/desautorizado/desautorizado.component';
import { CategoriasComponent } from './views/categorias/categorias.component';
import { ModalCategoriaComponent } from './modal-categoria/modal-categoria.component';
import { SubcategoriasComponent } from './views/subcategorias/subcategorias.component';
import { ModalSubcategoriaComponent } from './modal-subcategoria/modal-subcategoria.component';

import { AuthProviderService } from './providers/authprovider.service';
import { AuthService } from './services/auth.service';
import { CargandoComponent } from './views/cargando/cargando.component';
import { CarritosComponent } from './views/carritos/carritos.component';
import { ModalCarritoComponent } from './modal-carrito/modal-carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    SidebarComponent,
    ProductosComponent,
    ModalProductoComponent,
    InicioComponent,
    NoEncontradoComponent,
    LoginComponent,
    DesautorizadoComponent,
    CargandoComponent,
    CategoriasComponent,
    ModalCategoriaComponent,
    SubcategoriasComponent,
    ModalSubcategoriaComponent,
    CarritosComponent,
    ModalCarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthProviderService,
    {
      provide: APP_INITIALIZER,
      useFactory: validacionInicial,
      deps: [AuthProviderService, AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function validacionInicial(provider: AuthProviderService, auth: AuthService) {
  return () => provider.validacionInicial(auth);
}