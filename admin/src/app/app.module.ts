import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
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

import { AuthProviderService } from './providers/authprovider.service';
import { CargandoComponent } from './views/cargando/cargando.component';

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
    CargandoComponent
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
      useFactory: jokesProviderFactory,
      deps: [AuthProviderService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function jokesProviderFactory(provider: AuthProviderService) {
  return () => provider.validacionInicial();
}