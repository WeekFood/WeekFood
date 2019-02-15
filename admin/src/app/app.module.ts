import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { CabeceraComponent } from 'src/app/cabecera/cabecera.component';
import { SidebarComponent } from 'src/app/sidebar/sidebar.component';
import { ProductosComponent } from 'src/app/views/productos/productos.component';
import { ModalProductoComponent } from 'src/app/modal-producto/modal-producto.component';
import { InicioComponent } from 'src/app/views/inicio/inicio.component';
import { NoEncontradoComponent } from 'src/app/views/no-encontrado/no-encontrado.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { DesautorizadoComponent } from 'src/app/views/desautorizado/desautorizado.component';
import { CategoriasComponent } from 'src/app/views/categorias/categorias.component';
import { ModalCategoriaComponent } from 'src/app/modal-categoria/modal-categoria.component';
import { SubcategoriasComponent } from 'src/app/views/subcategorias/subcategorias.component';
import { ModalSubcategoriaComponent } from 'src/app/modal-subcategoria/modal-subcategoria.component';

import { AuthProviderService } from 'src/app/providers/authprovider.service';
import { AuthService } from 'src/app/services/auth.service';
import { CargandoComponent } from 'src/app/views/cargando/cargando.component';
import { CarritosComponent } from 'src/app/views/carritos/carritos.component';
import { ModalCarritoComponent } from 'src/app/modal-carrito/modal-carrito.component';
import { UsuariosComponent } from 'src/app/views/usuarios/usuarios.component';
import { ModalUsuarioComponent } from 'src/app/modal-usuario/modal-usuario.component';

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
    UsuariosComponent,
    ModalUsuarioComponent,
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