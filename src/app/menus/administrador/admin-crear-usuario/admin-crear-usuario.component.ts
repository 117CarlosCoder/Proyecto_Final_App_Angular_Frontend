import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrearUsuario } from 'src/entities/CrearUsuario';
import { Telefono } from 'src/entities/Telefono';
import { AdminService } from 'src/services/administrador/AdminService';
import { UsuarioService } from 'src/services/usuario/UsuarioService';

@Component({
  selector: 'app-admin-crear-usuario',
  templateUrl: './admin-crear-usuario.component.html',
  styleUrls: ['./admin-crear-usuario.component.css']
})
export class AdminCrearUsuarioComponent implements OnInit{
  form!:FormGroup;
  form2!:FormGroup;
  usario!:CrearUsuario;
  modalRef?:BsModalRef;
  telefonos!:Telefono;
  rol!:String;

  constructor (private formBuilder : FormBuilder,
    private router:Router,
    private usuarioService:UsuarioService,
    private modalService: BsModalService,
    private adminService: AdminService,
    private route: ActivatedRoute){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const rolRecibido = params['rol'];
      this.rol = rolRecibido;
      console.log(this.rol)
    });

    this.form2 = this.formBuilder.group({
      telefono1: [null, [Validators.required]],
      telefono2: [],
      telefono3: []
    });

    
    this.form = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      rol:[this.rol],
      email: [null, [Validators.required]],
      cui:[null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]]
    });
  }

  crearUsuario(template: TemplateRef<any>){
    if (this.form.valid) {
      this.telefonos = this.form2.value as Telefono;
      this.usario = this.form.value as CrearUsuario;
      if(this.usario.rol == 'Empleador'){
      this.usario.fechaFundacion = this.usario.fechaNacimiento;
      this.usario.fechaNacimiento = '';
      }
        console.log("Nombre " + this.usario.nombre);
        console.log(this.usario)
      
        this.adminService.crearUsuario(this.usario).subscribe({
          
          next: ( response: HttpResponse<any>)=>{
            const data = response.body;
            if(response.status === 201){
              this.usuarioService.crearUsuarioTelefonos(this.telefonos).subscribe({
                next:(data:any)=>{
                    console.log("Telefonos creados")
                }
              });
              this.modalRef = this.modalService.show(template);
              this.limpiar();
              this.router.navigate(['admin-usuarios',{rol:this.rol}]);
            }
        }
        });
      
      
    }
  }

  

  cancelar(){}

  limpiar(): void {
    this.form.reset({});
  }

  
}
