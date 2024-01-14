import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { CrearUsuario } from 'src/entities/CrearUsuario';
import { Rol } from 'src/entities/Rol';
import { UsuarioService } from 'src/services/usuario/UsuarioService';
import { HttpResponse } from '@angular/common/http';
import { Telefono } from 'src/entities/Telefono';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit{
    form!:FormGroup;
    form2!:FormGroup;
    listarUsuario:Rol[] = []; 
    usario!:CrearUsuario;
    modalRef?:BsModalRef;
    telefonos!:Telefono;

    

    constructor(private formBuilder:FormBuilder,
      private usuarioService:UsuarioService,
      private router : Router,
      private modalService: BsModalService){
        usuarioService.removeCredenciales();
        localStorage.setItem('rol','Invitado');
    }

    ngOnInit(): void {
      const rol1 ={
        "rol":"Solicitante"
      };
      const rol2 ={
        "rol":"Empleador"
      };
        this.listarUsuario.push(rol1);
        this.listarUsuario.push(rol2);

        this.form2 = this.formBuilder.group({
          telefono1: [null, [Validators.required]],
          telefono2: [],
          telefono3: []
        });

        
        this.form = this.formBuilder.group({
          nombre: [null, [Validators.required]],
          username: [null, [Validators.required]],
          rol: ["Solicitante", [Validators.required]],
          direccion: [null, [Validators.required]],
          email: [null, [Validators.required]],
          cui:[null, [Validators.required]],
          fechaNacimiento: [null, [Validators.required]]
          
        });

       
        
    }

    cancelar(){
      this.router.navigate(['login']);
    }

    crearUsuario(template: TemplateRef<any>){
      
      if (this.form.valid) {
        this.telefonos = this.form2.value as Telefono;
        this.usario = this.form.value as CrearUsuario;
        if (this.usario.rol == 'Solicitante') {
          console.log("Nombre " + this.usario.nombre);
          console.log(this.usario)
        
          this.usuarioService.crearUsuarioSolicitante(this.usario).subscribe({
            
            next: ( response: HttpResponse<any>)=>{
              console.log(this.telefonos)
            
              if(response.status === 200 || response.status === 201 ){
                if (this.form2.valid) {
                  this.usuarioService.crearUsuarioTelefonos(this.telefonos, this.usario.username).subscribe({
                    next:(data:any)=>{
                        console.log("Telefonos creados")
                        this.modalRef = this.modalService.show(template);
                        this.limpiar();
                        this.router.navigate(['login']);
                    }
                  });
                  
                }
                
              }
              if(response.status === 400){
                console.log("correo repetido");
              }
          }
          });
        }

        if (this.usario.rol == 'Empleador') {
          this.usario.fechaFundacion = this.usario.fechaNacimiento;
          console.log("Oferta" + this.usario.nombre);
          console.log(this.usario)
          this.usuarioService.crearUsuarioEmpleador(this.usario).subscribe({
            next: ( response: HttpResponse<any>)=>{
              if(response.status === 200 || response.status === 201){
                if(this.form2.valid){
                  this.usuarioService.crearUsuarioTelefonos(this.telefonos, this.usario.username).subscribe({
                    next:(data:any)=>{
                        console.log("Telefonos creados")
                        this.modalRef = this.modalService.show(template);
                        this.limpiar();
                        this.router.navigate(['login']);
                    }
                  });
                }
              
              
            }
            if(response.status === 400){
              console.log("correo repetido");
            }
            }
          });
        }
        
      }
    }




    limpiar(): void {
      this.form.reset({});
    }
}
