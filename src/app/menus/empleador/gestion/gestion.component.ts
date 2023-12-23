import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ofertas } from 'src/entities/Ofertas';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { Router } from '@angular/router';
import { Codigo } from 'src/entities/Codigo';
import { OfertasDate } from 'src/entities/OfertasDate';
import { DatePipe } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { format } from 'date-fns';
import { FechasOferta } from 'src/entities/FechasOferta';

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
  FechaOFerta !: FechasOferta;


  constructor( private empleadorService : EmpleadorService,
    private formBuilder: FormBuilder,
    private router : Router){

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
      fechaB: [null, [Validators.required]]
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
      this.FechaOFerta = this.form.value as FechasOferta;
      let fechaFormateada1 = format(this.FechaOFerta.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.FechaOFerta.fechaB, 'yyyy-MM-dd');
      this.empleadorService.listarOfertasFechas(fechaFormateada1,fechaFormateada2).subscribe({
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
    this.empleadorService.eliminarOferta(codigo).subscribe({
      next:(response: HttpResponse<Ofertas>) => {
          console.log("Eliminado");
          this.empleadorService.listarOfertas().subscribe({
            next: (response: HttpResponse<OfertasDate[]>) => {
                console.log("Cargar ofertas");
                var list: OfertasDate[] | null= null; 
                if (response.body) {
                  list = response.body; 
                  this.listarOfetas = list;
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
