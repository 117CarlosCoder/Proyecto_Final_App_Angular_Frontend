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


const routes: Routes = [
  {
    path:"",
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "login",
    title: "Iniciar Sesion",
    component: LoginComponent
  },
  {
    path: "solicitante-completar-informacion",
    title: "Completar Informacion",
    component: CompletarInformacionComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
