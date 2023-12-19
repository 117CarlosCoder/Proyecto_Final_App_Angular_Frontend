import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrearUsuario } from 'src/entities/CrearUsuario';
import { NumTelefono } from 'src/entities/NumTelefono';
import { Telefono } from 'src/entities/Telefono';
import { UsuarioT } from 'src/entities/UsuarioT';
import { AdminService } from 'src/services/administrador/AdminService';

@Component({
  selector: 'app-perfil-empleador',
  templateUrl: './perfil-empleador.component.html',
  styleUrls: ['./perfil-empleador.component.css']
})
export class PerfilEmpleadorComponent {
  form!:FormGroup;
  form2!:FormGroup;
  usario!:CrearUsuario;
  modalRef?:BsModalRef;
  telefonos!:Telefono;
  listaTelefonos!:NumTelefono[];
  listTelefono:NumTelefono[]=[];
  codigo!:number;
  rol!:String;
  FechaNString!: String|null;
  FechaFString!: String|null;
  FechaN!:Date;
  FechaF!:Date;
  pipe = new DatePipe('en-US');
  usuario!:UsuarioT;

  constructor (private formBuilder : FormBuilder,
    private router:Router,
    private modalService: BsModalService,
    private adminService: AdminService
 ){}

 ngOnInit(): void {
  this.adminService.listarUsuarioEspecifico().subscribe({
    next: (list: UsuarioT) => {
      this.usuario = list;
      console.log(this.usuario);
      if(this.usuario.fechaNacimiento!=null){
        this.FechaNString = this.pipe.transform(this.usuario.fechaNacimiento.toString(), 'yyyy/MM/dd');
        console.log(this.FechaN);
        if(this.FechaNString?.toString()){
          this.FechaN = new Date(this.FechaNString.toString());
        }
        
      }
      if(this.usuario.fechaFundacion != null  ){
        this.FechaFString = this.pipe.transform(this.usuario.fechaFundacion.toString(), 'yyyy-MM-dd');
        console.log(this.FechaF)
        if(this.FechaFString?.toString()){
          this.FechaN = new Date(this.FechaFString.toString());
        }
      }
      this.form = this.formBuilder.group({
        codigo:[this.usuario.codigo],
        nombre: [this.usuario.nombre, [Validators.required]],
        direccion: [this.usuario.direccion, [Validators.required]],
        username: [this.usuario.username, [Validators.required]],
        password: [this.usuario.password, [Validators.required]],
        email: [this.usuario.email, [Validators.required]],
        cui:[this.usuario.cui, [Validators.required]],
        fechaFundacion: [this.FechaF],
        fechaNacimiento: [this.FechaN],
        rol:[this.usuario.rol]
      });
    }
  });

  this.form = this.formBuilder.group({
    codigo:[],
    nombre: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    email: [null, [Validators.required]],
    cui:[null, [Validators.required]],
    fechaFundacion: [],
    fechaNacimiento: [],
    rol:[]
  });


  this.adminService.listarTelefonosEspecifico().subscribe({
    next: (list: NumTelefono[]) => {
      this.listaTelefonos = list;
      console.log(this.listaTelefonos);
      var numero1;
      var numero2;
      var numero3;
      if (list[0]!=undefined) {
        numero1= list[0].numero;
      }
      if (list[1]!=undefined) {
        numero2= list[1].numero;
      }
      if (list[2]!=undefined) {
        numero3= list[2].numero;
      }
      this.form2 = this.formBuilder.group({
        telefono1: [numero1,[Validators.required]],
        telefono2: [numero2],
        telefono3: [numero3]
      });
    }
  });

  this.form2 = this.formBuilder.group({
    telefono1: [null, [Validators.required]],
    telefono2: [],
    telefono3: []
  }); 
 }


 editarUsuario(template: TemplateRef<any>){
  console.log('editar ');
  console.log(this.form)
  console.log(this.form.valid)
  if (this.form.valid) {
    this.telefonos = this.form2.value as Telefono;
    if (this.listaTelefonos[0]!=null) {
      this.listaTelefonos[0].numero = this.telefonos.telefono1;
    }
    if (this.listaTelefonos[1]!=null) {
      this.listaTelefonos[1].numero = this.telefonos.telefono2;
    }
    if (this.listaTelefonos[2]!=null) {
      this.listaTelefonos[2].numero = this.telefonos.telefono3;
    }



    

    

  
   
    
    console.log(this.listaTelefonos)
    console.log(this.listTelefono)
    this.usario = this.form.value as CrearUsuario;
    if(this.usario.rol == 'Empleador'){
      this.usario.fechaFundacion = this.usario.fechaNacimiento;
      this.usario.fechaNacimiento = '';
    }
      console.log("Nombre " + this.usario.nombre);
      console.log(this.usario)
    
      this.adminService.actualizarUsuario(this.usario).subscribe({
        
        next: ( response: HttpResponse<any>)=>{
          const data = response.body;
          if (this.listaTelefonos && (this.listaTelefonos[0] != null ) || (this.listaTelefonos[1] != null ) || (this.listaTelefonos[2] != null )){
            this.adminService.actualizarTelefono(this.listaTelefonos).subscribe({
              next:(data:any)=>{
                  console.log("Telefonos actualizados")
              }
            });
          }
          if (this.listaTelefonos[0] == null && this.telefonos.telefono1  ) {
    
            const telefonoObtenido1:NumTelefono = {
            codigo: 1,
            codigoUsuario: this.codigo,
            numero: this.telefonos.telefono1
            }
    
            console.log(telefonoObtenido1)
          if (telefonoObtenido1) {
            this.listTelefono.push(telefonoObtenido1);
          }
    
            
          }
            if (this.listaTelefonos[0] == null && this.telefonos.telefono1 ) {
            this.adminService.crearTelefonos(this.listTelefono).subscribe({
              next:(data:any)=>{
                this.listTelefono =[];
                  console.log("Telefonos creados")
              }
            }); 
            }
            if (this.listaTelefonos[1] == null && this.telefonos.telefono2) {
              this.listTelefono =[];
              const telefonoObtenido2:NumTelefono = {
                codigo: 2,
                codigoUsuario: this.codigo,
                numero: this.telefonos.telefono2
                }
        
                if (telefonoObtenido2) {
                  this.listTelefono.push(telefonoObtenido2);
                }
                
                
            }
            if (this.listaTelefonos[1] == null && this.telefonos.telefono2  ) {
              this.adminService.crearTelefonos(this.listTelefono).subscribe({
                next:(data:any)=>{
                  this.listTelefono =[];
                    console.log("Telefonos creados")
                }
              }); 
              }
        
            if (this.listaTelefonos[2] == null && this.telefonos.telefono3) {
              this.listTelefono =[];
              const telefonoObtenido3:NumTelefono = {
                codigo: 3,
                codigoUsuario: this.codigo,
                numero: this.telefonos.telefono3
                }
        
                this.listTelefono.push(telefonoObtenido3);
            }
            if ( this.listaTelefonos[2] == null && this.telefonos.telefono3 ) {
              this.adminService.crearTelefonos(this.listTelefono).subscribe({
                next:(data:any)=>{
                  this.listTelefono =[];
                    console.log("Telefonos creados")
                }
              }); 
              }
            this.modalRef = this.modalService.show(template);
            this.limpiar();
            this.router.navigate(['empleador-gestion']);
          
      }
      });
    
      
    
  }
}

limpiar(): void {
  this.form.reset({});
}
}
