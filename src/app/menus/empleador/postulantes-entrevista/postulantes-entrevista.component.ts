import { Component, TemplateRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertasDate } from 'src/entities/OfertasDate';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { EntrevistaInfo } from 'src/entities/EntrevistaInfo';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-postulantes-entrevista',
  templateUrl: './postulantes-entrevista.component.html',
  styleUrls: ['./postulantes-entrevista.component.css']
})
export class PostulantesEntrevistaComponent {
  listarEntrevistas!:EntrevistaInfo[];
  Fecha!: String|null;
  FechaN!:Date;
  pipe = new DatePipe('en-US');
  codigo!: number;
  carga : boolean = false;

  modalRef?:BsModalRef;

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
 
    this.empleadorService.listarEntrevistas(this.codigo).subscribe({
      next: (response: HttpResponse<EntrevistaInfo[]>) => {
          console.log("Cargar Entrevistas")
          var list: EntrevistaInfo[] | null= null; 
          if (response.body) {
            if(response.body.length !==0){
              this.carga = true;
            }
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

  seleccionarEntrevista(codigo:number, usuario:number, oferta:number){
    this.router.navigate(['realizar-entrevista',{codigo:codigo,usuario:usuario, oferta:oferta}]);
  }

  faseContrato(template: TemplateRef<any>){
    this.empleadorService.faseContratacion(this.codigo).subscribe({
      next:(data: any)=>{
        this.router.navigate(['contratacion',{codigo:this.codigo}]);
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }if(error.status === 400){
          this.modalRef = this.modalService.show(template);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }
    });
   
  }

  cancelar(){
    this.router.navigate(['revisar-entrevistas']);
  }
}
