import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../entities/Usuario';
import { UsuarioService } from '../../services/usuario/UsuarioService';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { NavbarSolicitanteComponent } from '../navbars/navbar-solicitante/navbar-solicitante.component';
import { ActualizarNavbarService } from 'src/services/solcitante/ActualizarNavbarService';
import { SessionService } from 'src/services/sesion/SessionService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  usuarioForm!: FormGroup;
  usuario!:Usuario;
  login: boolean;
  rol!:String;
  

  

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private navbar : NavbarSolicitanteComponent,
    private router: Router,
    private sharedService: ActualizarNavbarService,
    private sessionService : SessionService) {
    this.login = false;

  }


  ngOnInit(): void {
    this.sharedService.updateCompletarInfo(true);
    this.usuarioForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submit(): void {
    if (this.usuarioForm.valid) {
      this.usuario = this.usuarioForm.value as Usuario;

      this.usuarioService.inciarSesion(this.usuario).subscribe({
        next: ( response: HttpResponse<any>)=>{
            const data = response.body;
            if(response.status === 202){
              this.sharedService.updateCompletarInfo(true);
              console.log(response.status);
              this.rol = data.rol;
              

              this.limpiar();
              this.router.navigate([this.usuarioService.comprobarUsuario(this.rol)]);
            }
            if(response.status === 200){
              console.log(response.status);
              this.rol = data.rol;
              console.log(this.rol);

              console.log(data.idSession)
              this.sessionService.setSessionIdInCookie(data.idSession);
              this.sharedService.updateCompletarInfo(true);
              this.router.navigate([this.usuarioService.paginaInicial(this.rol)]);
            }
        },
        error: (error: any) => {
          console.log("error" + error);
          this.login = true;
          console.log("Login : " + this.login);
        }
      });
    }
  }

  limpiar(): void {
    this.usuarioForm.reset({

    });

  }


}
