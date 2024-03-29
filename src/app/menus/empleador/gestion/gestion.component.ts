import { Component, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ofertas } from 'src/entities/Ofertas';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { Router } from '@angular/router';
import { Codigo } from 'src/entities/Codigo';
import { OfertasDate } from 'src/entities/OfertasDate';
import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { format } from 'date-fns';
import { CargarOfertasFechas } from 'src/entities/CargarOfertasFechas';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  form!:FormGroup;
  listarOfetas!:OfertasDate[];
  codigoFinal!: Codigo;
  Fecha!: string | null;
  pipe = new DatePipe('en-US');
  modalRef?:BsModalRef;
  FechaOFerta !: CargarOfertasFechas;
  listarFechas = [{
    "nombre":'Fecha Publicacion',
    "valor":'fechaPublicacion' 
  }, 
  {
    "nombre":'Fecha Limite',
    "valor":'fechaLimite'
  }];

  constructor( private empleadorService : EmpleadorService,
    private formBuilder: FormBuilder,
    private router : Router,
    private modalService: BsModalService){

  }

  ngOnInit(){
    this.empleadorService.listarOfertas().subscribe({
      next: (response: HttpResponse<OfertasDate[]>) => {
        console.log("Cargar Ofertas")
        var list: OfertasDate[] | null= null; 
          if (response.body) {
            list = response.body;
            this.listarOfetas = list;
            list.forEach(element => {
          if(element.fechaPublicacion!=null){
            this.Fecha = this.pipe.transform(element.fechaPublicacion.toString(), 'yyyy-MM-dd');

            console.log(this.Fecha?.toString());
            if(this.Fecha){
              element.fechaPublicacion = this.Fecha;
            }
          }

          if(element.fechaLimite!=null){
            this.Fecha = this.pipe.transform(element.fechaLimite.toString(), 'yyyy-MM-dd');

            console.log(this.Fecha?.toString());
            if(this.Fecha){
              element.fechaLimite = this.Fecha;
            }
          }
        });
        console.log(this.listarOfetas);
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
      fechaA: [null, [Validators.required]],
      fechaB: [null, [Validators.required]],
      fechaS: ["Seleccione tipo fecha", [Validators.required]]
    });
  }

  crearOferta(){
    this.router.navigate([this.empleadorService.elegirPagina('crear')]);
  }

  editarOferta(codigo:number){
    this.router.navigate([this.empleadorService.elegirPagina('actualizar'),{codigo:codigo}]);
  }

  cargarOfertas(){
    if (this.form.valid) {
      this.FechaOFerta = this.form.value as CargarOfertasFechas;
      console.log(this.FechaOFerta.fechaS)
      let fechaFormateada1 = format(this.FechaOFerta.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.FechaOFerta.fechaB, 'yyyy-MM-dd');
      this.empleadorService.listarOfertasFechas(fechaFormateada1,fechaFormateada2, this.FechaOFerta.fechaS).subscribe({
        next:(response: HttpResponse<OfertasDate[]>) => {
          var list: OfertasDate[] | null= null; 
          if (response.body) {
            list = response.body;
            this.listarOfetas = list;
            list.forEach(element => {
          if(element.fechaPublicacion!=null){
            this.Fecha = this.pipe.transform(element.fechaPublicacion.toString(), 'yyyy-MM-dd');

            console.log(this.Fecha?.toString());
            if(this.Fecha){
              element.fechaPublicacion = this.Fecha;
            }
          }

          if(element.fechaLimite!=null){
            this.Fecha = this.pipe.transform(element.fechaLimite.toString(), 'yyyy-MM-dd');

            console.log(this.Fecha?.toString());
            if(this.Fecha){
              element.fechaLimite = this.Fecha;
            }
          }
        });
        console.log(this.listarOfetas);
      }
    }
  });
    }
  }

  eliminarOferta(codigo:number){
    this.router.navigate(['eliminar-oferta',{codigo:codigo}]);
  }

}
