import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrevistaFecha } from 'src/entities/EntrevistaFecha';
import { Estados } from 'src/entities/Estados';
import { Fechas } from 'src/entities/Fechas';
import { Modalidad } from 'src/entities/Modalidad';
import { OfertaCostos } from 'src/entities/OfertaCostos';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { format } from 'date-fns';
import { location } from 'ngx-bootstrap/utils/facade/browser';
import { Ofertas } from 'src/entities/Ofertas';
import { FechasOferta } from 'src/entities/FechasOferta';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-empleador-reportes',
  templateUrl: './empleador-reportes.component.html',
  styleUrls: ['./empleador-reportes.component.css']
})
export class EmpleadorReportesComponent implements OnInit {
  formreporte1!:FormGroup;
  formreporte2!:FormGroup;
  formreporte3!:FormGroup;
  listaEstado!:Estados[];
  ofertaCostos!:OfertaCostos[];
  listarEntrevistaFecha!:EntrevistaFecha[];
  listarEstadoOfertas!:Estados[];
  fechas!:Fechas;
  fechasOferta!:Ofertas[];
  fechaOferta!:FechasOferta;
  todayWithPipe!: String;
  pipe = new DatePipe('en-US');

  constructor(private formBuilder:FormBuilder,
    private empleadorService:EmpleadorService,
    private router:Router){}

  ngOnInit(){
    this.formreporte2 = this.formBuilder.group({
      fechaA: [null, [Validators.required]],
      estado: ["PENDIENTE", [Validators.required]]
    });
    this.formreporte1 = this.formBuilder.group({
      fechaA: [null, [Validators.required]],
      fechaB: [null, [Validators.required]],
      estado: ["ACTIVA", [Validators.required]]
    });

    this.empleadorService.listarEstados().subscribe({
      next: (response: HttpResponse<Estados[]>) => {
        console.log("Cargar ofertas Costos")
        var list: Estados[] | null= null; 
          if (response.body) {
            list = response.body;
            this.listaEstado = list;
            console.log(this.listaEstado);
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

    this.empleadorService.listarOfertasCostos().subscribe({
      next: (response: HttpResponse<OfertaCostos[]>) => {
        console.log("Cargar ofertas Costos")
        var list: OfertaCostos[] | null= null; 
          if (response.body) {
            list = response.body;
            this.ofertaCostos = list;
            console.log(this.ofertaCostos);
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

    this.empleadorService.listarEstadosOferta().subscribe({
      next: (response: HttpResponse<Estados[]>) => {
        console.log("Cargar Estado Ofertas")
        var list: Estados[] | null= null; 
          if (response.body) {
            list = response.body;
            this.listarEstadoOfertas = list;
            console.log(this.listarEstadoOfertas);
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

    this.formreporte2 = this.formBuilder.group({
      fechaA: [null, [Validators.required]],
      estado: ["PENDIENTE", [Validators.required]]
    });
    this.formreporte1 = this.formBuilder.group({
      fechaA: [null, [Validators.required]],
      fechaB: [null, [Validators.required]],
      estado: ["ACTIVA", [Validators.required]]
    });
  }
  
  cambiarFechaEstado(){
    if (this.formreporte2.valid) {
      //this.modalRef = this.modalService.show(template);
      this.fechas = this.formreporte2.value as Fechas;
      let fechaFormateada = format(this.fechas.fechaA, 'yyyy-MM-dd');
      console.log("Fechas" + this.fechas.fechaA);
      console.log(fechaFormateada)
      this.empleadorService.listarEntrevistaFecha(fechaFormateada,this.fechas.estado).subscribe({
        next:(response: HttpResponse<EntrevistaFecha[]>)=>{
          var list: EntrevistaFecha[] | null= null; 
          if (response.body) {
            list = response.body;
            if(list){
              console.log("Cargar Entrevistas Fechas")
              this.listarEntrevistaFecha = list;
              console.log(this.listarEntrevistaFecha);
            }
            else{
              this.formreporte2.reset({
                
              });
              this.formreporte2 = this.formBuilder.group({
                fechaA: [null, [Validators.required]],
                estado: [null, [Validators.required]]
              });
            }
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
  }

  cambiarFechaOferta(){
    if (this.formreporte1.valid) {
      //this.modalRef = this.modalService.show(template);
      this.fechaOferta = this.formreporte1.value as FechasOferta;
      let fechaFormateada1 = format(this.fechaOferta.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechaOferta.fechaB, 'yyyy-MM-dd');
      console.log("Fechas" + this.fechaOferta.fechaA);
      console.log(fechaFormateada1)
      this.empleadorService.listarOfertaFecha(fechaFormateada1,fechaFormateada2,this.fechaOferta.estado).subscribe({
        next:(response: HttpResponse<Ofertas[]>)=>{       
          var list: Ofertas[] | null= null; 
          if (response.body) {
            list = response.body;
            if(list){
              console.log("Cargar Oferta Fechas")
              this.fechasOferta = list;
              console.log(this.fechasOferta);
            }
            else{
              this.formreporte1.reset({
                
              });
              this.formreporte1 = this.formBuilder.group({
                fechaA: [null, [Validators.required]],
                fechaB: [null, [Validators.required]],
                estado: [null, [Validators.required]]
              });
            }
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
  }

  descargarOfertaCostos(){
    this.empleadorService.descargarOfertasCostos().subscribe({
      next:(response: HttpResponse<Blob>) => {
        var list: Blob | null= null; 
        if (response.body) {
          list = response.body;
          const url = window.URL.createObjectURL(list);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'OfertaCostos.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
        
    },
    error: (error) => {
      if(error.status === 406){
        this.router.navigate(['**']);
      }else {
        console.error('Error en la solicitud:', error);
      }
    }}
    ); 
  }

  descargarEntrevistaFecha(){
    if (this.formreporte2.valid) {

      this.fechas = this.formreporte2.value as Fechas;
      let fechaFormateada = format(this.fechas.fechaA, 'yyyy-MM-dd');

      this.empleadorService.descargarEntrevistaFecha(fechaFormateada,this.fechas.estado).subscribe({
        next:(response: HttpResponse<Blob>) => {
          var list: Blob | null= null; 
        if (response.body) {
          list = response.body;
          const url = window.URL.createObjectURL(list);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'EntrevisFechaEspecifica.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      },
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }}
      ); 
    }
  }

  descargarEntrevistaEstado(){
    if (this.formreporte1.valid) {

      this.fechaOferta = this.formreporte1.value as FechasOferta;
      let fechaFormateada1 = format(this.fechaOferta.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechaOferta.fechaB, 'yyyy-MM-dd');
      this.empleadorService.descargarEntrevistaEstado(fechaFormateada1,fechaFormateada2,this.fechaOferta.estado).subscribe({
        next:(response: HttpResponse<Blob>) => {var list: Blob | null= null; 
          if (response.body) {
            list = response.body;
          const url = window.URL.createObjectURL(list);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'EntrevisFechaEstado.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }},
      error: (error) => {
        if(error.status === 406){
          this.router.navigate(['**']);
        }else {
          console.error('Error en la solicitud:', error);
        }
      }}
      ); 
    }
  }

  limpiar(): void {
    this.formreporte1.reset({
  
    });
  
  }

}
