import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { Component, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EntrevistaFinal } from 'src/entities/EntrevistaFinal';
import { EntrevistaInfo } from 'src/entities/EntrevistaInfo';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';

@Component({
  selector: 'app-contratacion',
  templateUrl: './contratacion.component.html',
  styleUrls: ['./contratacion.component.css']
})
export class ContratacionComponent {
  listarEntrevistas!:EntrevistaInfo[];
  Fecha!: String|null;
  FechaN!:Date;
  pipe = new DatePipe('en-US');
  codigo!: number;
  form!:FormGroup;
  usuario!:number;
  oferta!:number;
  finalizarInfoEntrevista!:EntrevistaFinal;
  modalRef?: BsModalRef;
 

constructor(private empleadorService :EmpleadorService,
  private route:ActivatedRoute,
  private router: Router,
  private modalService: BsModalService){

}

ngOnInit(): void {

  this.route.params.subscribe(params => {
    const valorRecibido = params['codigo'];
    this.codigo = valorRecibido;
    console.log(this.codigo)
  });
 
    this.empleadorService.listarEntrevistasContratacion(this.codigo).subscribe({
      next: (response: HttpResponse<EntrevistaInfo[]>) => {
          console.log("Cargar Entrevistas")
          var list: EntrevistaInfo[] | null= null; 
          if (response.body) {
            list = response.body;
            list.forEach(element => {
              if(element.fecha!=null){
                this.Fecha = this.pipe.transform(element.fecha.toString(), 'yyyy-MM-dd');
                console.log(this.Fecha?.toString());
                if(this.Fecha?.toString()){
                  element.fecha = this.Fecha?.toString()
                }
              }
            });
            this.listarEntrevistas = list;
            console.log(this.listarEntrevistas);
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

  contratar(template: TemplateRef<any>, usuario : EntrevistaInfo){
    
          console.log("Contratacion " + usuario.codigo)
          console.log("Contratacion " + usuario.codigoOferta)
          console.log("Contratacion " + usuario.notas)
          console.log("Contratacion " + usuario.usuario)
          this.finalizarInfoEntrevista = {
            "codigo" : usuario.codigo,
            "codigoOferta": usuario.codigoOferta,
            "notas" : usuario.notas,
            "usuario" : usuario.usuario
          }
          if (usuario){
          this.empleadorService.contratar(this.finalizarInfoEntrevista).subscribe({
            next:(data:any)=>{
              this.listarEntrevistas.forEach(element => {
                this.empleadorService.crearNotificacion("Lo sentimos no has sido contratado por la oferta " + usuario.nombreOferta, element.usuario ).subscribe({
                  next:(data : any) =>{
                    console.log("Notificando entrevista");
                  },
                  error: (error) => {
                    if(error.status === 406){
                      this.router.navigate(['**']);
                    }else {
                      console.error('Error en la solicitud:', error);
                    }
                  }
      
                });
              });
              this.empleadorService.crearNotificacion("Felicidades has sido contratado por la oferta " + usuario.nombreOferta,usuario.usuario ).subscribe({
                next:(data : any) =>{
                  console.log("Notificando entrevista");
                },
                error: (error) => {
                  if(error.status === 406){
                    this.router.navigate(['**']);
                  }else {
                    console.error('Error en la solicitud:', error);
                  }
                }
    
              });
              this.router.navigate([this.empleadorService.elegirPagina('entrevista')]);
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
        
  }

}
