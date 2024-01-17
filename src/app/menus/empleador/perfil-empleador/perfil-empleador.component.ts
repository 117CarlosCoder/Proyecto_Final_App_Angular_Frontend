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
import { TelefonoUsuario } from 'src/entities/TelefonoUsuario';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { Tarjeta } from 'src/entities/Tarjeta';
import { ActualizarContrasena } from 'src/entities/ActualizarContrasena';
@Component({
  selector: 'app-perfil-empleador',
  templateUrl: './perfil-empleador.component.html',
  styleUrls: ['./perfil-empleador.component.css']
})
export class PerfilEmpleadorComponent {
  form!:FormGroup;
  today: Date = new Date();
  formTarjeta!:FormGroup;
  form2!:FormGroup;
  usario!:CrearUsuario;
  modalRef?:BsModalRef;
  telefonos!:Telefono;
  listaTelefonos!:NumTelefono[];
  listTelefono:TelefonoUsuario[]=[];
  tarjeta!:Tarjeta;
  codigo!:number;
  rol!:String;
  FechaNString!: String|null;
  FechaFString!: String|null;
  FechaN!:Date;
  FechaF!:Date;
  pipe = new DatePipe('en-US');
  usuario!:UsuarioT;
  carga1 : boolean = false;
  carga2 : boolean = false;
  carga3 : boolean = false;
  nuevaContrasena: string = '';
  cambioContrasena : ActualizarContrasena ={
    codigo:0,
    contrasena:''
  };

  constructor (private formBuilder : FormBuilder,
    private router:Router,
    private modalService: BsModalService,
    private empleadorService: EmpleadorService
 ){}

 ngOnInit(): void {

  this.form = this.formBuilder.group({
    codigo:[],
    nombre: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [],
    email: [null, [Validators.required]],
    cui:[null, [Validators.required]],
    fechaFundacion: [],
    fechaNacimiento: [],
    rol:[]
  });

  this.form2 = this.formBuilder.group({
    telefono1: [null, [Validators.required]],
    telefono2: [],
    telefono3: []
  }); 

  this.formTarjeta = this.formBuilder.group({
    titular: [null, [Validators.required]],
    numero: [null, [Validators.required]],
    codigoSeguridad: [null, [Validators.required]],
    fechaExpiracion: [null, [Validators.required]],
    cantidad : [null, [Validators.required]]
  });
  
  
  this.empleadorService.listarUsuarioEspecifico().subscribe({
    next: (response: HttpResponse<UsuarioT>) => {
      var list: UsuarioT | null= null; 
          if (response.body) {
            
            list = response.body;
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
              password: [],
              email: [this.usuario.email, [Validators.required]],
              cui:[this.usuario.cui, [Validators.required]],
              fechaFundacion: [this.FechaN, [Validators.required]],
              fechaNacimiento: [this.FechaN, [Validators.required]],
              rol:[this.usuario.rol]
            });
            this.carga1 = true;
          }
      
    },
    error: (error) => {
      if(error.status === 406){
        this.router.navigate(['**']);
      }else {
        console.error('Error en la solicitud:', error);
      }
    }
  });

  this.form = this.formBuilder.group({
    codigo:[],
    nombre: [null, [Validators.required]],
    direccion: [null, [Validators.required]],
    username: [null, [Validators.required]],
    password: [],
    email: [null, [Validators.required]],
    cui:[null, [Validators.required]],
    fechaFundacion: [],
    fechaNacimiento: [],
    rol:[]
  });

  this.empleadorService.listarTelefonosEspecifico().subscribe({
    next: (response: HttpResponse<NumTelefono[]>) => {
      var list: NumTelefono[] | null= null; 
          if (response.body) {
            
            list = response.body;
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
          this.carga2=true;
    },
    error: (error) => {
      if(error.status === 406){
        this.router.navigate(['**']);
      }else {
        console.error('Error en la solicitud:', error);
      }
    }
  });

  this.form2 = this.formBuilder.group({
    telefono1: [null, [Validators.required]],
    telefono2: [],
    telefono3: []
  }); 

  this.empleadorService.listarTarjeta().subscribe({
    next: (response: HttpResponse<Tarjeta>) => {
      var tarjeta: Tarjeta | null= null; 
          if (response.body) {
            tarjeta = response.body;
            this.tarjeta = tarjeta;
            console.log(this.tarjeta)
            this.today =new Date(this.tarjeta.fechaExpiracion);
            console.log(this.today)
            this.formTarjeta = this.formBuilder.group({
              titular: [this.tarjeta.titular, [Validators.required]],
              numero: [this.tarjeta.numero, [Validators.required]],
              codigoSeguridad: [this.tarjeta.codigoSeguridad, [Validators.required]],
              fechaExpiracion: [this.today, [Validators.required]],
              cantidad : [this.tarjeta.cantidad, [Validators.required]]
            });
            this.carga3= true;
          }
          else{

          }
          
    },
    error: (error) => {
      if(error.status === 406){
        this.router.navigate(['**']);
      }else {
        console.error('Error en la solicitud:', error);
      }
    } 
  });


 }


 editarUsuario(template: TemplateRef<any>,template2: TemplateRef<any>){
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
    
      this.empleadorService.actualizarUsuario(this.usario).subscribe({
        
        next: ( response: HttpResponse<any>)=>{
          localStorage.setItem('username',this.usario.username.toString())
          const data = response.body;
          if (this.listaTelefonos && (this.listaTelefonos[0] != null ) || (this.listaTelefonos[1] != null ) || (this.listaTelefonos[2] != null )){
            this.empleadorService.actualizarTelefono(this.listaTelefonos).subscribe({
              next:(data:any)=>{
                  console.log("Telefonos actualizados")
                  this.modalRef = this.modalService.show(template);
              },
              error: (error) => {
                if(error.status === 406){
                  this.router.navigate(['**']);
                }if(error.status === 400){
                  this.modalRef = this.modalService.show(template2);
                }else {
                  console.error('Error en la solicitud:', error);
                }
              }
            });
          }
          if (this.listaTelefonos[0] == null && this.telefonos.telefono1  ) {
    
            const telefonoObtenido1:TelefonoUsuario = {
              username: this.usario.username,
              numero: this.telefonos.telefono1
            }
    
            console.log(telefonoObtenido1)
          if (telefonoObtenido1) {
            this.listTelefono.push(telefonoObtenido1);
          }
    
            
          }
            if (this.listaTelefonos[0] == null && this.telefonos.telefono1 ) {
            this.empleadorService.crearTelefonosUsuario(this.listTelefono).subscribe({
              next:(data:any)=>{
                this.listTelefono =[];
                
                  console.log("Telefonos creados")
              },
              error: (error) => {
                if(error.status === 406){
                  this.router.navigate(['**']);
                }if(error.status === 400){
                  this.modalRef = this.modalService.show(template2);
                }else {
                  console.error('Error en la solicitud:', error);
                }
              }
            }); 
            }
            if (this.listaTelefonos[1] == null && this.telefonos.telefono2) {
              this.listTelefono =[];
              const telefonoObtenido2:TelefonoUsuario = {
                username: this.usario.username,
                numero: this.telefonos.telefono1
                }
        
                if (telefonoObtenido2) {
                  this.listTelefono.push(telefonoObtenido2);
                }
                
                
            }
            if (this.listaTelefonos[1] == null && this.telefonos.telefono2  ) {
              this.empleadorService.crearTelefonosUsuario(this.listTelefono).subscribe({
                next:(data:any)=>{
                  this.listTelefono =[];
                    console.log("Telefonos creados")
                },
                error: (error) => {
                  if(error.status === 406){
                    this.router.navigate(['**']);
                  }
                  if(error.status === 400){
                    this.modalRef = this.modalService.show(template2);
                  }else {
                    console.error('Error en la solicitud:', error);
                  }
                }
              }); 
              }
        
            if (this.listaTelefonos[2] == null && this.telefonos.telefono3) {
              this.listTelefono =[];
              const telefonoObtenido3:TelefonoUsuario = {
                username: this.usario.username,
                numero: this.telefonos.telefono1
                }
        
                this.listTelefono.push(telefonoObtenido3);
            }
            if ( this.listaTelefonos[2] == null && this.telefonos.telefono3 ) {
              this.empleadorService.crearTelefonosUsuario(this.listTelefono).subscribe({
                next:(data:any)=>{
                  this.listTelefono =[];
                    console.log("Telefonos creados")
                },
                error: (error) => {
                  if(error.status === 406){
                    this.router.navigate(['**']);
                  }
                  if(error.status === 400){
                    this.modalRef = this.modalService.show(template2);
                  }else {
                    console.error('Error en la solicitud:', error);
                  }
                }
              }); 
              }
            
            localStorage.setItem('username',this.usario.username.toString())
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        } if(error.status === 400){
          this.modalRef = this.modalService.show(template2);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
      });
    
      
    
  }
}

editarTarjeta(template: TemplateRef<any>, template2: TemplateRef<any>){
  if (this.formTarjeta.valid) {
   
    this.tarjeta = this.formTarjeta.value as Tarjeta;
    this.empleadorService.actualizarTarjeta(this.tarjeta).subscribe({
      next: (data: any) => {
        this.modalRef = this.modalService.show(template);
      }, 
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }
        if(error.status === 400){
          this.modalRef = this.modalService.show(template2);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    });
  }
}

cambiarContrasena(template: TemplateRef<any>,template2: TemplateRef<any>){
  if(this.nuevaContrasena !== ''){
    this.cambioContrasena = {
      codigo: this.usuario.codigo,
      contrasena: this.nuevaContrasena
    }
    this.empleadorService.cambiarContrasena(this.cambioContrasena).subscribe({
      next: (data:any) => {
        console.log("contrasena cambiada");
        this.modalRef = this.modalService.show(template);
        localStorage.setItem('password',this.cambioContrasena.contrasena)
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }
        if(error.status === 400){
          this.modalRef = this.modalService.show(template2);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    });
    
  }
  
}

limpiar(): void {
  this.form.reset({});
}
}
