import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component'
import { RouterModule, Routes } from '@angular/router';
import { CompletarInformacionComponent } from './menus/solicitante/completar-informacion/completar-informacion.component';
import { AplicarOfertaComponent } from './menus/solicitante/aplicar-oferta/aplicar-oferta.component';
import { PostulacionesComponent } from './menus/solicitante/postulaciones/postulaciones.component';
import { EntrevistasComponent } from './menus/solicitante/entrevistas/entrevistas.component';
import { CargarOfertaComponent } from './menus/solicitante/cargar-oferta/cargar-oferta.component';
import { AplicarEmpleoComponent } from './menus/solicitante/aplicar-empleo/aplicar-empleo.component';
import { CargarInformacionTarjetaComponent } from './menus/solicitante/cargar-informacion-tarjeta/cargar-informacion-tarjeta.component';
import { SolicitanteCargarOfertaInfoComponent } from './menus/solicitante/solicitante-cargar-oferta-info/solicitante-cargar-oferta-info.component';
import { ReportesComponent } from './menus/solicitante/reportes/reportes.component';
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


const routes: Routes = [
  {
    path:"",
    redirectTo: "/cargar",
    pathMatch: "full"
  },
  {
    path: "cargar",
    title: "Cargar Datos",
    component: CargarDatosComponent
  },
  {
    path: "login",
    title: "Iniciar Sesion",
    component: LoginComponent
  },
  {
    path: "crear-usuario",
    title: "Creacion Usuarios",
    component: CrearUsuarioComponent
  },
  {
    path: "restablecer-contrasena",
    title: "Restablecer Contrasena",
    component: RestablecerContrasenaComponent
  },
  {
    path: "solicitante-completar-informacion",
    title: "Completar Informacion",
    component: CompletarInformacionComponent
  },
  {
    path: "empleador-completar-informacion",
    title: "Completar Informacion",
    component: CompletarInformacionEmpleadorComponent
  },
  {
    path: "solicitante-completar-tarjeta",
    title: "Completar Informacion",
    component: CargarInformacionTarjetaComponent
  },
  {
    path: "solicitante-aplicar-oferta",
    title: "Aplicar oferta",
    component: AplicarOfertaComponent
  },
  {
    path: "solicitante-cargar-oferta",
    title: "Cargar oferta",
    component: CargarOfertaComponent
  },
  {
    path: "solicitante-cargar-oferta-info",
    title: "Cargar oferta",
    component: SolicitanteCargarOfertaInfoComponent
  },
  {
    path: "solicitante-aplicar-empleo",
    title: "Alpicar Empleo",
    component: AplicarEmpleoComponent
  },
  {
    path: "solicitante-postulaciones",
    title: "Postulaciones",
    component: PostulacionesComponent
  },
  {
    path: "solicitante-entrevistas",
    title: "Entrevistas",
    component: EntrevistasComponent
  },
  {
    path: "solicitante-reportes",
    title: "Reportes",
    component: ReportesComponent
  },
  {
    path: "empleador-gestion",
    title: "Gestion",
    component: GestionComponent
  },
  {
    path: "crear-oferta",
    title: "Crear oferta",
    component: CrearOfertaComponent
  }
  ,
  {
    path: "actualizar-oferta",
    title: "Actualizar oferta",
    component: ActualizarOfertaComponent
  },
  {
    path: "revisar-postulaciones",
    title: "Revision de Postulaciones",
    component: RevisarPostulacionesComponent
  },
  {
    path: "empleador-postulantes",
    title: "Revision de Postulantes",
    component: PostulantesOfertaComponent
  },
  {
    path: "datos-postulantes",
    title: "Datos de Postulantes",
    component: DatosPostulanteComponent 
  },
  {
    path: "generar-entrevista",
    title: "Generar Entrevista",
    component: GenerarEntrevistaComponent 
  }
  ,
  {
    path: "revisar-entrevistas",
    title: "Revisar Entrevistas",
    component: RevisionEntrevistasComponent 
  },
  {
    path: "realizar-entrevista",
    title: "Realizar Entrevista",
    component: RealizarEntrevistaComponent 
  },
  {
    path: "empleador-reportes",
    title: "Reportes",
    component: EmpleadorReportesComponent 
  },
  {
    path: "admin-dashboard",
    title: "Admin Dashboard",
    component: AdminDashboardComponent
  },
  {
    path: "admin-gestion",
    title: "Admin Gestion",
    component: AdminGestionComponent
  },
  {
    path: "editar-categoria",
    title: "Admin Editar Categoria",
    component: EditarCategoriaComponent
  }
  ,
  {
    path: "crear-categoria",
    title: "Admin Crear Categoria",
    component: CrearCategoriaComponent
  },
  {
    path: "cambiar-comision",
    title: "Admin Cambiar Comision",
    component: AdminComisionComponent
  }
  ,
  {
    path: "admin-reportes",
    title: "Admin Reportes",
    component: AdminReportesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
