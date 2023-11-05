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
import { CargarOfertaComponent } from './menus/solicitante/cargar-oferta/cargar-oferta.component';
import { AplicarEmpleoComponent } from './menus/solicitante/aplicar-empleo/aplicar-empleo.component';
import { CargarInformacionTarjetaComponent } from './menus/solicitante/cargar-informacion-tarjeta/cargar-informacion-tarjeta.component';
import { BsDatepickerModule,BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComponenteModalComponent } from './menus/solicitante/componente-modal/componente-modal.component';
import { PerfilEmpresaComponent } from './menus/solicitante/perfil-empresa/perfil-empresa.component';
import { SolicitanteCargarOfertaInfoComponent } from './menus/solicitante/solicitante-cargar-oferta-info/solicitante-cargar-oferta-info.component';
import { ReportesComponent } from './menus/solicitante/reportes/reportes.component';


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
    EntrevistasComponent,
    CargarOfertaComponent,
    AplicarEmpleoComponent,
    CargarInformacionTarjetaComponent,
    ComponenteModalComponent,
    PerfilEmpresaComponent,
    SolicitanteCargarOfertaInfoComponent,
    ReportesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
