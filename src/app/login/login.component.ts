import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from '../../entities/Usuario';
import { UsuarioService } from '../../services/usuario/UsuarioService';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ActualizarNavbarService } from 'src/services/solcitante/ActualizarNavbarService';

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
    private router: Router,
    private sharedService: ActualizarNavbarService) {
    this.login = false;
    usuarioService.removeCredenciales();
    localStorage.setItem('rol','Invitado');
    
    
  }


  ngOnInit(): void {
    this.usuarioService.removeCredenciales();
    localStorage.setItem('rol','Invitado');
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
            console.log(this.usuarioService.getCredentialUsername())
            if(response.status === 200){
              this.sharedService.updateCompletarInfo(true);
              console.log(response.status);
              console.log(data)
              console.log(data.rol)
              this.rol = data.rol;
              
              localStorage.setItem('rol', this.rol.toString())
              console.log(localStorage.getItem('rol'))
              this.limpiar();
              setTimeout(() => {
              this.router.navigate([this.usuarioService.comprobarUsuario(this.rol)]);
            }, 1000); 
            }
            if(response.status === 202){
              console.log(response.status);
              this.rol = data.rol;
              console.log(this.rol);
              localStorage.setItem('rol', this.rol.toString())
              console.log(localStorage.getItem('rol'))
              this.sharedService.updateCompletarInfo(true);
              
              setTimeout(() => {
                this.router.navigate([this.usuarioService.paginaInicial(this.rol)]);
              }, 1000); 
              
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
