import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CargarInformacionTarjetaComponent } from './menus/empleador/cargar-informacion-tarjeta/cargar-informacion-tarjeta.component';
import { BsDatepickerModule,BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComponenteModalComponent } from './menus/solicitante/componente-modal/componente-modal.component';
import { PerfilEmpresaComponent } from './menus/solicitante/perfil-empresa/perfil-empresa.component';
import { SolicitanteCargarOfertaInfoComponent } from './menus/solicitante/solicitante-cargar-oferta-info/solicitante-cargar-oferta-info.component';
import { ReportesComponent } from './menus/solicitante/reportes/reportes.component';
import { NavbarEmpleadorComponent } from './menus/navbars/navbar-empleador/navbar-empleador.component';
import { CompletarInformacionEmpleadorComponent } from './menus/empleador/completar-informacion-empleador/completar-informacion-empleador.component';
import { GestionComponent } from './menus/empleador/gestion/gestion.component';
import { CrearOfertaComponent } from './menus/empleador/crear-oferta/crear-oferta.component';
import { ActualizarOfertaComponent } from './menus/empleador/actualizar-oferta/actualizar-oferta.component';
import { RevisarPostulacionesComponent } from './menus/empleador/revisar-postulaciones/revisar-postulaciones.component';
import { PostulantesOfertaComponent } from './menus/empleador/postulantes-oferta/postulantes-oferta.component';
import { DatosPostulanteComponent } from './menus/empleador/datos-postulante/datos-postulante.component';
import { GenerarEntrevistaComponent } from './menus/empleador/generar-entrevista/generar-entrevista.component';
import { RevisionEntrevistasComponent } from './menus/empleador/revision-entrevistas/revision-entrevistas.component';
import { RealizarEntrevistaComponent } from './menus/empleador/realizar-entrevista/realizar-entrevista.component';
import { EmpleadorReportesComponent } from './menus/empleador/empleador-reportes/empleador-reportes.component';
import { AdminDashboardComponent } from './menus/administrador/admin-dashboard/admin-dashboard.component';
import { AdminGestionComponent } from './menus/administrador/admin-gestion/admin-gestion.component';
import { EditarCategoriaComponent } from './menus/administrador/editar-categoria/editar-categoria.component';
import { CrearCategoriaComponent } from './menus/administrador/crear-categoria/crear-categoria.component';
import { AdminComisionComponent } from './menus/administrador/admin-comision/admin-comision.component';
import { AdminReportesComponent } from './menus/administrador/admin-reportes/admin-reportes.component';
import { CrearUsuarioComponent } from './menus/general/crear-usuario/crear-usuario.component';
import { RestablecerContrasenaComponent } from './menus/general/restablecer-contrasena/restablecer-contrasena.component';
import { CargarDatosComponent } from './menus/general/cargar-datos/cargar-datos.component';
import { AdminUsuariosComponent } from './menus/administrador/admin-usuarios/admin-usuarios.component';
import { AdminEditarUsuarioComponent } from './menus/administrador/admin-editar-usuario/admin-editar-usuario.component';
import { AdminCrearUsuarioComponent } from './menus/administrador/admin-crear-usuario/admin-crear-usuario.component';
import { SugerenciaOfertasComponent } from './menus/solicitante/sugerencia-ofertas/sugerencia-ofertas.component';
import { BuscadorOfertaComponent } from './menus/solicitante/buscador-oferta/buscador-oferta.component';
import { PerfilUsuarioComponent } from './menus/general/perfil-usuario/perfil-usuario.component';
import { PerfilAdminComponent } from './menus/administrador/perfil-admin/perfil-admin.component';
import { PerfilSolicitanteComponent } from './menus/solicitante/perfil-solicitante/perfil-solicitante.component';
import { PerfilEmpleadorComponent } from './menus/empleador/perfil-empleador/perfil-empleador.component';
import { PaginaNoPermitidaComponent } from './menus/general/pagina-no-permitida/pagina-no-permitida.component';
import { PaginaErrorComponent } from './menus/general/pagina-error/pagina-error.component';
import { CargarPdfsComponent } from './menus/general/cargar-pdfs/cargar-pdfs.component';
import { EmpleosComponent } from './menus/general/empleos/empleos.component';
import { EmpleosMasInfoComponent } from './menus/general/empleos-mas-info/empleos-mas-info.component';
import { PerfilEmpresaGeneralComponent } from './menus/general/perfil-empresa-general/perfil-empresa-general.component';
import { PostulantesEntrevistaComponent } from './menus/empleador/postulantes-entrevista/postulantes-entrevista.component';
import { ContratacionComponent } from './menus/empleador/contratacion/contratacion.component';

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
    ReportesComponent,
    NavbarEmpleadorComponent,
    CompletarInformacionEmpleadorComponent,
    GestionComponent,
    CrearOfertaComponent,
    ActualizarOfertaComponent,
    RevisarPostulacionesComponent,
    PostulantesOfertaComponent,
    DatosPostulanteComponent,
    GenerarEntrevistaComponent,
    RevisionEntrevistasComponent,
    RealizarEntrevistaComponent,
    EmpleadorReportesComponent,
    AdminDashboardComponent,
    AdminGestionComponent,
    EditarCategoriaComponent,
    CrearCategoriaComponent,
    AdminComisionComponent,
    AdminReportesComponent,
    AdminUsuariosComponent,
    CrearUsuarioComponent,
    RestablecerContrasenaComponent,
    CargarDatosComponent,
    AdminEditarUsuarioComponent,
    AdminCrearUsuarioComponent,
    SugerenciaOfertasComponent,
    BuscadorOfertaComponent,
    PerfilUsuarioComponent,
    PerfilAdminComponent,
    PerfilSolicitanteComponent,
    PerfilEmpleadorComponent,
    PaginaNoPermitidaComponent,
    PaginaErrorComponent,
    CargarPdfsComponent,
    EmpleosComponent,
    EmpleosMasInfoComponent,
    PerfilEmpresaGeneralComponent,
    PostulantesEntrevistaComponent,
    ContratacionComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TimepickerModule.forRoot(),
    FormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
