import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Correo } from 'src/entities/Correo';
import { UsuarioService } from 'src/services/usuario/UsuarioService';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.css']
})
export class RestablecerContrasenaComponent implements OnInit{
    form!:FormGroup;
    correo!:Correo;
    modalRef?:BsModalRef;

    constructor(private formBuilder:FormBuilder,
      private usuarioService:UsuarioService,
      private router:Router,
      private modalService: BsModalService){

    }

    ngOnInit(){
      this.form = this.formBuilder.group({
        email: [null, [Validators.required]]
      });
    }

    restablecerContrasena(template: TemplateRef<any>){
      if (this.form.valid) {
        this.correo = this.form.value as Correo;
        this.usuarioService.restablecerContraseña(this.correo.email).subscribe({
          next:(data:any)=>{
            this.modalRef = this.modalService.show(template);
            this.limpiar();
            this.router.navigate(['login']);
          }
      }); 
      }
    }

    limpiar(): void {
      this.form.reset({});
    }

}
