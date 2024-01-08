import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component'
import { RouterModule, Routes } from '@angular/router';
import { CompletarInformacionComponent } from './menus/solicitante/completar-informacion/completar-informacion.component';
import { AplicarOfertaComponent } from './menus/solicitante/aplicar-oferta/aplicar-oferta.component';
import { PostulacionesComponent } from './menus/solicitante/postulaciones/postulaciones.component';
import { EntrevistasComponent } from './menus/solicitante/entrevistas/entrevistas.component';
import { CargarOfertaComponent } from './menus/solicitante/cargar-oferta/cargar-oferta.component';
import { AplicarEmpleoComponent } from './menus/solicitante/aplicar-empleo/aplicar-empleo.component';
import { CargarInformacionTarjetaComponent } from './menus/empleador/cargar-informacion-tarjeta/cargar-informacion-tarjeta.component';
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
import { AdminUsuariosComponent } from './menus/administrador/admin-usuarios/admin-usuarios.component';
import { AdminCrearUsuarioComponent } from './menus/administrador/admin-crear-usuario/admin-crear-usuario.component';
import { AdminEditarUsuarioComponent } from './menus/administrador/admin-editar-usuario/admin-editar-usuario.component';
import { PerfilAdminComponent } from './menus/administrador/perfil-admin/perfil-admin.component';
import { PerfilSolicitanteComponent } from './menus/solicitante/perfil-solicitante/perfil-solicitante.component';
import { PerfilEmpleadorComponent } from './menus/empleador/perfil-empleador/perfil-empleador.component';
import { hasRole } from './auth/auth.guard';
import { PaginaNoPermitidaComponent } from './menus/general/pagina-no-permitida/pagina-no-permitida.component';
import { PaginaErrorComponent } from './menus/general/pagina-error/pagina-error.component';
import { CargarPdfsComponent } from './menus/general/cargar-pdfs/cargar-pdfs.component';


const routes: Routes = [
  {
    path:"",
    redirectTo: "/cargar",
    pathMatch: "full"
  },
  {
    path: "cargar",
    title: "Cargar Datos",
    component: CargarDatosComponent,
    canActivate: [hasRole(['Invitado', 'Administrador', 'Empleador', 'Solicitante'])]
  },
  {
    path: "cargar-pdf-usuario",
    title: "Cargar PDF",
    component: CargarPdfsComponent,
    canActivate: [hasRole(['Invitado', 'Administrador', 'Empleador', 'Solicitante'])]
  },
  {
    path: "login",
    title: "Iniciar Sesion",
    component: LoginComponent,
    canActivate: [hasRole(['Invitado', 'Administrador', 'Empleador', 'Solicitante'])]
  },
  {
    path: "crear-usuario",
    title: "Creacion Usuarios",
    component: CrearUsuarioComponent,
    canActivate: [hasRole(['Invitado', 'Administrador', 'Empleador', 'Solicitante'])]
  },
  {
    path: "restablecer-contrasena",
    title: "Restablecer Contrasena",
    component: RestablecerContrasenaComponent,
    canActivate: [hasRole(['Invitado', 'Administrador', 'Empleador', 'Solicitante'])]
  },
  {
    path: "solicitante-completar-informacion",
    title: "Completar Informacion",
    component: CompletarInformacionComponent,
    canActivate: [hasRole(['Solicitante'])]
  },
  {
    path: "empleador-completar-informacion",
    title: "Completar Informacion",
    component: CompletarInformacionEmpleadorComponent,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "empleador-completar-tarjeta",
    title: "Completar Informacion",
    component: CargarInformacionTarjetaComponent,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "solicitante-aplicar-oferta",
    title: "Aplicar oferta",
    component: AplicarOfertaComponent,
    canActivate: [hasRole(['Solicitante'])]
  },
  {
    path: "solicitante-cargar-oferta",
    title: "Cargar oferta",
    component: CargarOfertaComponent,
    canActivate: [hasRole(['Solicitante'])]
  },
  {
    path: "solicitante-cargar-oferta-info",
    title: "Cargar oferta",
    component: SolicitanteCargarOfertaInfoComponent,
    canActivate: [hasRole(['Solicitante'])]
  },
  {
    path: "solicitante-aplicar-empleo",
    title: "Alpicar Empleo",
    component: AplicarEmpleoComponent,
    canActivate: [hasRole(['Solicitante'])]

  },
  {
    path: "solicitante-postulaciones",
    title: "Postulaciones",
    component: PostulacionesComponent,
    canActivate: [hasRole(['Solicitante'])]
  },
  {
    path: "solicitante-entrevistas",
    title: "Entrevistas",
    component: EntrevistasComponent,
    canActivate: [hasRole(['Solicitante'])]
  },
  {
    path: "solicitante-reportes",
    title: "Reportes",
    component: ReportesComponent,
    canActivate: [hasRole(['Solicitante'])]
  },
  {
    path: "empleador-gestion",
    title: "Gestion",
    component: GestionComponent,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "crear-oferta",
    title: "Crear oferta",
    component: CrearOfertaComponent,
    canActivate: [hasRole(['Empleador'])]
  }
  ,
  {
    path: "actualizar-oferta",
    title: "Actualizar oferta",
    component: ActualizarOfertaComponent,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "revisar-postulaciones",
    title: "Revision de Postulaciones",
    component: RevisarPostulacionesComponent,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "empleador-postulantes",
    title: "Revision de Postulantes",
    component: PostulantesOfertaComponent,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "datos-postulantes",
    title: "Datos de Postulantes",
    component: DatosPostulanteComponent ,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "generar-entrevista",
    title: "Generar Entrevista",
    component: GenerarEntrevistaComponent ,
    canActivate: [hasRole(['Empleador'])]
  }
  ,
  {
    path: "revisar-entrevistas",
    title: "Revisar Entrevistas",
    component: RevisionEntrevistasComponent ,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "realizar-entrevista",
    title: "Realizar Entrevista",
    component: RealizarEntrevistaComponent ,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "empleador-reportes",
    title: "Reportes",
    component: EmpleadorReportesComponent ,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "admin-dashboard",
    title: "Admin Dashboard",
    component: AdminDashboardComponent,
    canActivate: [hasRole(['Administrador'])]
  },
  {
    path: "admin-gestion",
    title: "Admin Gestion",
    component: AdminGestionComponent,
    canActivate: [hasRole(['Administrador'])]
  },
  {
    path: "editar-categoria",
    title: "Admin Editar Categoria",
    component: EditarCategoriaComponent,
    canActivate: [hasRole(['Administrador'])]
  }
  ,
  {
    path: "crear-categoria",
    title: "Admin Crear Categoria",
    component: CrearCategoriaComponent,
    canActivate: [hasRole(['Administrador'])]
  },
  {
    path: "cambiar-comision",
    title: "Admin Cambiar Comision",
    component: AdminComisionComponent,
    canActivate: [hasRole(['Administrador'])]
  }
  ,
  {
    path: "admin-reportes",
    title: "Admin Reportes",
    component: AdminReportesComponent,
    canActivate: [hasRole(['Administrador'])]  }
  ,
  {
    path: "admin-usuarios",
    title: "Admin Gestionar Usuarios",
    component: AdminUsuariosComponent,
    canActivate: [hasRole(['Administrador'])]
  }
  ,
  {
    path: "admin-crear-usuarios",
    title: "Admin Crear Usuarios",
    component: AdminCrearUsuarioComponent,
    canActivate: [hasRole(['Administrador'])]
  }
  ,
  {
    path: "admin-editar-usuarios",
    title: "Admin Editar Usuarios",
    component: AdminEditarUsuarioComponent,
    canActivate: [hasRole(['Administrador'])]
  },
  {
    path: "admin-editar-perfil",
    title: "Admin Editar Perfil",
    component: PerfilAdminComponent,
    canActivate: [hasRole(['Administrador'])]
  },
  {
    path: "admin-editar-perfil",
    title: "Admin Editar Perfil",
    component: PerfilAdminComponent,
    canActivate: [hasRole(['Administrador'])]
  }
  ,
  {
    path: "admin-editar-perfil",
    title: "Admin Editar Perfil",
    component: PerfilAdminComponent,
    canActivate: [hasRole(['Administrador'])]
  },
  {
    path: "solicitante-editar-perfil",
    title: "Solcitante Editar Perfil",
    component: PerfilSolicitanteComponent,
    canActivate: [hasRole(['Solicitante'])]
  }
  ,
  {
    path: "empleador-editar-perfil",
    title: "Empleador Editar Perfil",
    component: PerfilEmpleadorComponent,
    canActivate: [hasRole(['Empleador'])]
  },
  {
    path: "pagina-no-permitida",
    title: "Pagina No Permitida",
    component: PaginaNoPermitidaComponent,
    canActivate: [hasRole(['Invitado', 'Administrador', 'Empleador', 'Solicitante'])]
  },
  { path: '**',
    title: "Pagina Error",
    component: PaginaErrorComponent,
    canActivate: [hasRole(['Invitado', 'Administrador', 'Empleador', 'Solicitante'])]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
