import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CrearUsuario } from 'src/entities/CrearUsuario';
import { NumTelefono } from 'src/entities/NumTelefono';
import { Telefono } from 'src/entities/Telefono';
import { UsuarioT } from 'src/entities/UsuarioT';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { TelefonoUsuario } from 'src/entities/TelefonoUsuario';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UsuarioService } from 'src/services/usuario/UsuarioService';
import { ActualizarContrasena } from 'src/entities/ActualizarContrasena';

@Component({
  selector: 'app-perfil-solicitante',
  templateUrl: './perfil-solicitante.component.html',
  styleUrls: ['./perfil-solicitante.component.css']
})
export class PerfilSolicitanteComponent {

  form!:FormGroup;
  form2!:FormGroup;
  usario!:CrearUsuario;
  modalRef?:BsModalRef;
  telefonos!:Telefono;
  listaTelefonos!:NumTelefono[];
  listTelefono:TelefonoUsuario[]=[];
  codigo!:number;
  rol!:String;
  FechaNString!: String|null;
  FechaFString!: String|null;
  FechaN!:Date;
  FechaF!:Date;
  pipe = new DatePipe('en-US');
  usuario!:UsuarioT;
  pdfUrl!: SafeResourceUrl;
  nuevaContrasena: string = '';
  cambioContrasena : ActualizarContrasena={
    codigo:0,
    contrasena:''
  };


  constructor (private formBuilder : FormBuilder,
    private router:Router,
    private modalService: BsModalService,
    private solicitanteService: SolicitanteService,
    private usuarioService: UsuarioService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
 ){

 }

 ngOnInit(): void {
  this.solicitanteService.listarUsuarioEspecifico().subscribe({
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
          this.FechaF = new Date(this.FechaFString.toString());
        }
      }
      this.form = this.formBuilder.group({
        codigo:[this.usuario.codigo],
        nombre: [this.usuario.nombre, [Validators.required]],
        direccion: [this.usuario.direccion, [Validators.required]],
        username: [this.usuario.username, [Validators.required]],
        password: [this.usuario.password],
        sal: [this.usuario.sal],
        email: [this.usuario.email, [Validators.required]],
        cui:[this.usuario.cui, [Validators.required]],
        fechaFundacion: [this.FechaF],
        fechaNacimiento: [this.FechaN, [Validators.required]],
        rol:[this.usuario.rol]
      });
      if (this.usuario.codigo != undefined) {
        this.solicitanteService.listarPdf(this.usuario.codigo).subscribe(
          
          (response: HttpResponse<ArrayBuffer>) =>{
            var data: ArrayBuffer | null= null; 
            if (response.body) {
              data = response.body;
              console.log(data);
              const blob = new Blob([data], { type: 'application/pdf' });
              this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
              console.log(data)
              console.log(this.pdfUrl);
            }     
          },
          (error) => {
            console.error('Error al obtener el PDF', error);
           
            if(error.status === 406){
              this.router.navigate(['**']);
            }
          
          }
        
      );
      }
      console.log("codigo : " + this.usuario.codigo)
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
    sal:[],
    email: [null, [Validators.required]],
    cui:[null, [Validators.required]],
    fechaFundacion: [null, [Validators.required]],
    fechaNacimiento: [null, [Validators.required]],
    rol:[]
  });


  this.solicitanteService.listarTelefonosEspecifico().subscribe({
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
    
      this.solicitanteService.actualizarUsuario(this.usario).subscribe({
        
        next: ( response: HttpResponse<any>)=>{
          const data = response.body;
          localStorage.setItem('username',this.usario.username.toString())
          if (this.listaTelefonos && (this.listaTelefonos[0] != null ) || (this.listaTelefonos[1] != null ) || (this.listaTelefonos[2] != null )){
            this.solicitanteService.actualizarTelefono(this.listaTelefonos).subscribe({
              next:(data:any)=>{
                  console.log("Telefonos actualizados")
                  this.modalRef = this.modalService.show(template);
              },
              error: (error) => {
                if(error.status === 406){
                  this.router.navigate(['**']);
                }if(error.status === 400){
                  this.modalRef = this.modalService.show(template2);
                  return;
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
            this.solicitanteService.crearTelefonosUsuario(this.listTelefono).subscribe({
              next:(data:any)=>{
                this.listTelefono =[];
                  console.log("Telefonos creados")
              },
              error: (error) => {
                if(error.status === 406){
                  this.router.navigate(['**']);
                }if(error.status === 400){
                  this.modalRef = this.modalService.show(template2);
                  return;
                }else {
                  console.error('Error en la solicitud:', error);
                }
              }
            }); 
            }
            if (this.listaTelefonos[1] == null && this.telefonos.telefono2) {
              const telefonoObtenido2:TelefonoUsuario = {
                username: this.usario.username,
                numero: this.telefonos.telefono1
                }
        
                if (telefonoObtenido2) {
                  this.listTelefono.push(telefonoObtenido2);
                }
                
                
            }
            if (this.listaTelefonos[1] == null && this.telefonos.telefono2  ) {
              this.solicitanteService.crearTelefonosUsuario(this.listTelefono).subscribe({
                next:(data:any)=>{
                  this.listTelefono =[];
                    console.log("Telefonos creados")
                }
              }); 
              }
        
            if (this.listaTelefonos[2] == null && this.telefonos.telefono3) {
              const telefonoObtenido3:TelefonoUsuario = {
                username: this.usario.username,
                numero: this.telefonos.telefono1
                }
        
                this.listTelefono.push(telefonoObtenido3);
            }
            if ( this.listaTelefonos[2] == null && this.telefonos.telefono3 ) {
              this.solicitanteService.crearTelefonosUsuario(this.listTelefono).subscribe({
                next:(data:any)=>{
                  this.listTelefono =[];
                    console.log("Telefonos creados")
                },
                error: (error) => {
                  if(error.status === 406){
                    this.router.navigate(['**']);
                  }if(error.status === 400){
                    this.modalRef = this.modalService.show(template2);
                    return;
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
        }if(error.status === 400){
          this.modalRef = this.modalService.show(template2);
          return;
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
      });
    
      
    
  }
}

async subirArchivo(event: any, template: TemplateRef<any>) {
  if (event.target.files && event.target.files.length > 0) {
  
  const file: File = event.target.files[0];
  console.log(file)
  console.log(file.type)

  if (file.type !== 'application/pdf') {
    this.modalRef = this.modalService.show(template);
    return;
  }
  const nombreArchivo = file.name;
  const datos = await file.arrayBuffer();

  const blob = new Blob([datos], { type: file.type });


  console.log('post')

  const headers = new HttpHeaders(this.usuarioService.getCredenciales());
  this.http.post('http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-curriculum/actualizar-pdf', blob,{observe: 'response', headers}).subscribe({
    next: (data:any) => {
      console.log("se envio");
      location.reload();
    },
    error: (error) => {
      if(error.status === 406){
        this.router.navigate(['**']);
      }else {
        console.error('Error en la solicitud:', error);
      }
    }
  });

  console.log(blob)
}
}

cambiarContrasena(template: TemplateRef<any>,template2: TemplateRef<any>){
  if(this.nuevaContrasena !== ''){
    this.cambioContrasena = {
      codigo: this.usuario.codigo,
      contrasena: this.nuevaContrasena
    }
    this.solicitanteService.cambiarContrasena(this.cambioContrasena).subscribe({
      next: (data:any) => {
        console.log("contrasena cambiada");
        this.modalRef = this.modalService.show(template);
        localStorage.setItem('password',this.cambioContrasena.contrasena)
        this.nuevaContrasena = '';
        
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }if(error.status === 400){
          this.modalRef = this.modalService.show(template2);
          return;
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
