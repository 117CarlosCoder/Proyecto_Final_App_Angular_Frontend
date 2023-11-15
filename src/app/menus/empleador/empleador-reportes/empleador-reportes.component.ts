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
      next: (list: Estados[]) => {
        console.log("Cargar ofertas Costos")
        this.listaEstado = list;
        console.log(this.listaEstado);
      }
    });

    this.empleadorService.listarOfertasCostos().subscribe({
      next: (list: OfertaCostos[]) => {
        console.log("Cargar ofertas Costos")
        this.ofertaCostos = list;
        console.log(this.ofertaCostos);
      }
    });

    this.empleadorService.listarEstadosOferta().subscribe({
      next: (list: Estados[]) => {
        console.log("Cargar Estado Ofertas")
        this.listarEstadoOfertas = list;
        console.log(this.listarEstadoOfertas);
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
        next:(list: EntrevistaFecha[])=>{
          

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
        next:(list: Ofertas[])=>{
          

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
        
      });
    }
  }

  descargarOfertaCostos(){
    this.empleadorService.descargarOfertasCostos().subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'OfertaCostos.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    ); 
  }

  descargarEntrevistaFecha(){
    if (this.formreporte2.valid) {

      this.fechas = this.formreporte2.value as Fechas;
      let fechaFormateada = format(this.fechas.fechaA, 'yyyy-MM-dd');

      this.empleadorService.descargarEntrevistaFecha(fechaFormateada,this.fechas.estado).subscribe(
        response => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'EntrevisFechaEspecifica.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
      ); 
    }
  }

  descargarEntrevistaEstado(){
    if (this.formreporte1.valid) {

      this.fechaOferta = this.formreporte1.value as FechasOferta;
      let fechaFormateada1 = format(this.fechaOferta.fechaA, 'yyyy-MM-dd');
      let fechaFormateada2 = format(this.fechaOferta.fechaB, 'yyyy-MM-dd');
      this.empleadorService.descargarEntrevistaEstado(fechaFormateada1,fechaFormateada2,this.fechaOferta.estado).subscribe(
        response => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'EntrevisFechaEstado.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
      ); 
    }
  }

  limpiar(): void {
    this.formreporte1.reset({
  
    });
  
  }

}
