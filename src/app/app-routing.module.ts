import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component'
import { RouterModule, Routes } from '@angular/router';
import { CompletarInformacionComponent } from './menus/solicitante/completar-informacion/completar-informacion.component';
import { AplicarOfertaComponent } from './menus/solicitante/aplicar-oferta/aplicar-oferta.component';
import { PostulacionesComponent } from './menus/solicitante/postulaciones/postulaciones.component';
import { EntrevistasComponent } from './menus/solicitante/entrevistas/entrevistas.component';


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
    path: "solicitante-aplicar-oferta",
    title: "Aplicar oferta",
    component: AplicarOfertaComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
