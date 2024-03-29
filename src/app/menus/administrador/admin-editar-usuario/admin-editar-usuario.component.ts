import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActualizarContrasena } from 'src/entities/ActualizarContrasena';
import { CrearUsuario } from 'src/entities/CrearUsuario';
import { NumTelefono } from 'src/entities/NumTelefono';
import { Telefono } from 'src/entities/Telefono';
import { UsuarioT } from 'src/entities/UsuarioT';
import { AdminService } from 'src/services/administrador/AdminService';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { UsuarioService } from 'src/services/usuario/UsuarioService';


@Component({
  selector: 'app-admin-editar-usuario',
  templateUrl: './admin-editar-usuario.component.html',
  styleUrls: ['./admin-editar-usuario.component.css']
})
export class AdminEditarUsuarioComponent {
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
  carga:boolean =false;
  cargaTelefonos:boolean =false;
  pipe = new DatePipe('en-US');
  usuario!:UsuarioT;
  pdfUrl!: SafeResourceUrl;
  nuevaContrasena: string = '';
  cambioContrasena : ActualizarContrasena ={
    codigo:0,
    contrasena:''
  };

  constructor (private formBuilder : FormBuilder,
    private router:Router,
    private modalService: BsModalService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private usuarioService:  UsuarioService
 ){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const codigoRecibido = params['codigo'];
      this.codigo = codigoRecibido;
      console.log(this.codigo)
    });

    this.route.params.subscribe(params => {
      const rolRecibido = params['rol'];
      this.rol = rolRecibido;
      console.log(this.rol)
    });


    this.adminService.listarUsuario(this.codigo).subscribe({
      next: (response: HttpResponse<UsuarioT>) => {
        var list: UsuarioT | null= null; 
        if (response.body) {
          list = response.body;
          this.usuario = list;
          console.log(this.usuario);
          console.log(this.usuario.fechaFundacion);
          console.log(this.usuario.fechaFundacion);
        if(this.usuario.fechaNacimiento!=null){
          this.FechaNString = this.pipe.transform(this.usuario.fechaNacimiento.toString(), 'yyyy/MM/dd');
          console.log(this.FechaNString);
          if(this.FechaNString?.toString()){
            this.FechaN = new Date(this.FechaNString.toString());
            console.log(this.FechaN);
          }
        }
        if(this.usuario.fechaFundacion != null  ){
          this.FechaFString = this.pipe.transform(this.usuario.fechaFundacion.toString(), 'yyyy/MM/dd');
          console.log(this.FechaFString)
          if(this.FechaFString?.toString()){
            this.FechaF = new Date(this.FechaFString.toString());
            console.log(this.FechaF);
          }
        }
        console.log("fecha fundacion "+this.FechaF);
        console.log("fecha Nacimineto "+this.FechaN);
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
          fechaNacimiento: [this.FechaN],
          rol:[this.usuario.rol]
        });
        if (this.usuario.codigo != undefined && this.usuario.rol === "Solicitante") {
          console.log("Usuario : " + this.usuario.codigo)
          this.adminService.listarPdf(this.usuario.codigo).subscribe(
            
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
        this.carga =true;
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
      sal: [],
      email: [null, [Validators.required]],
      cui:[null, [Validators.required]],
      fechaFundacion: [],
      fechaNacimiento: [],
      rol:[]
    });


    this.adminService.listarTelefonos(this.codigo).subscribe({
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

        this.cargaTelefonos = true;
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }
        if(error.status === 400){
          this.router.navigate(['**']);
        }
        else {
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
      
        this.adminService.actualizarUsuario(this.usario).subscribe({
          
          next: ( response: HttpResponse<any>)=>{
            const data = response.body;
            if (this.listaTelefonos && (this.listaTelefonos[0] != null ) || (this.listaTelefonos[1] != null ) || (this.listaTelefonos[2] != null )){
              this.adminService.actualizarTelefono(this.listaTelefonos).subscribe({
                next:(data:any)=>{
                    console.log("Telefonos actualizados")
                    this.modalRef = this.modalService.show(template);
                    this.limpiar();
                    this.router.navigate(['admin-usuarios',{rol:this.rol}]);
                },
                 error: (error) => {
                  if(error.status === 406){
                    this.router.navigate(['**']);
                  }
                  if(error.status === 400){
                    this.modalRef = this.modalService.show(template2);
                  }
                  else {
                    console.error('Error en la solicitud:', error);
                  }
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
                next:(response: HttpResponse<any>)=>{
                  
                  if(response.status === 406){
                    this.router.navigate(['**']);
                  }
                  if(response.status === 400){
                    this.modalRef = this.modalService.show(template2);
                  }
                    this.listTelefono =[];
                    console.log("Telefonos creados")
                    this.modalRef = this.modalService.show(template);
                    this.limpiar();
                    this.router.navigate(['admin-usuarios',{rol:this.rol}]);
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
                  next:(response: HttpResponse<any>)=>{
                    
                    if(response.status === 406){
                      this.router.navigate(['**']);
                    }
                    if(response.status === 400){
                      this.modalRef = this.modalService.show(template2);
                    }
                      this.listTelefono =[];
                      console.log("Telefonos creados")
                      this.modalRef = this.modalService.show(template);
                      this.limpiar();
                      this.router.navigate(['admin-usuarios',{rol:this.rol}]);
                      
                      
                      
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
                  
                  next:(response: HttpResponse<any>)=>{
                    
                    if(response.status === 406){
                      this.router.navigate(['**']);
                    }if(response.status === 400){
                      this.modalRef = this.modalService.show(template2);
                    }
                    this.listTelefono =[];
                    console.log("Telefonos creados")
                    this.modalRef = this.modalService.show(template);
                    this.limpiar();
                    this.router.navigate(['admin-usuarios',{rol:this.rol}]);
                  }
                }); 
                }
              
              
              
            
        },
        error: (error) => {
          if(error.status === 406){
            this.router.navigate(['**']);
          }
          if(error.status === 400){
            this.modalRef = this.modalService.show(template2);
          }
          else {
            console.error('Error en la solicitud:', error);
          }
        }
        });
      
      
    }
  }

  async subirArchivo(event: any,template: TemplateRef<any>) {
    if (event.target.files && event.target.files.length > 0) {
    
    const file: File = event.target.files[0];
    console.log(file)
    console.log(file.type)
    const nombreArchivo = file.name;
    const datos = await file.arrayBuffer();
  
    const blob = new Blob([datos], { type: file.type });
  
  
    console.log('post')
  
    const headers = new HttpHeaders(this.usuarioService.getCredenciales());
    this.http.post('http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-curriculum/actualizar-pdf-admin?codigo='+this.usuario.codigo, blob,{observe: 'response', headers}).subscribe({
      next: (data:any) => {
        console.log("se envio");
        location.reload();
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }
        if(error.status === 400){
          this.modalRef = this.modalService.show(template);
        }
        else {
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
      this.adminService.cambiarContrasena(this.cambioContrasena).subscribe({
        next: (data:any) => {
          console.log("contrasena cambiada");
          this.modalRef = this.modalService.show(template2);
          this.router.navigate(['admin-usuarios',{rol:this.rol}]);
        },
        error: (error) => {
          if(error.status === 406){
            this.router.navigate(['**']);
          }
          if(error.status === 400){
            this.modalRef = this.modalService.show(template);
          }else {
            console.error('Error en la solicitud:', error);
          }
        }
      });
      
    }
  }  

  cancelar(){
      this.router.navigate(['admin-usuarios',{rol:this.rol}]);
  }

  limpiar(): void {
    this.form.reset({});
  }
}
