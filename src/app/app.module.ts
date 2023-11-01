import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarInicioComponent } from './navbars/navbar-inicio/navbar-inicio.component';
import { NavbarAdminComponent } from './navbars/navbar-admin/navbar-admin.component';
import { NavbarSolicitanteComponent } from './navbars/navbar-solicitante/navbar-solicitante.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompletarInformacionComponent } from './menus/solicitante/completar-informacion/completar-informacion.component';
import { AplicarOfertaComponent } from './menus/solicitante/aplicar-oferta/aplicar-oferta.component';
import { PostulacionesComponent } from './menus/solicitante/postulaciones/postulaciones.component';
import { EntrevistasComponent } from './menus/solicitante/entrevistas/entrevistas.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarInicioComponent,
    NavbarAdminComponent,
    NavbarSolicitanteComponent,
    CompletarInformacionComponent,
    AplicarOfertaComponent,
    PostulacionesComponent,
    EntrevistasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
