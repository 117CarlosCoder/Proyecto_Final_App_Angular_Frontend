import { Component, OnInit, TemplateRef } from '@angular/core';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OfertaCostos } from 'src/entities/OfertaCostos';
import { EntrevistaInfo } from 'src/entities/EntrevistaInfo';
import { FechasOferta } from 'src/entities/FechasOferta';
import { Ofertas } from 'src/entities/Ofertas';
import { format } from 'date-fns';
import { RegistroRetirada } from 'src/entities/RegistroRetirada';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  formreporte1 !: FormGroup;
  formreporte2 !: FormGroup;
  formreporte3 !: FormGroup;
  modalRef?: BsModalRef;
  fechasOferta!:FechasOferta;
  descargaFechasOferta!:FechasOferta;
  fechasOfertaEntrevista!:FechasOferta;
  fechasOfertaRetirada!:FechasOferta;
  listarPostulacionesRetiradas!:RegistroRetirada[];
  ofertasFechaSelecciOn!:Ofertas[];
  ofertasFechaEntrevista!:Ofertas[];
  entrevistasInfo!:EntrevistaInfo[];


  constructor(private formBuilder: FormBuilder,
    private solicitanteService: SolicitanteService,
    private router : Router,
    private modalService: BsModalService){
 }

 ngOnInit(){
  this.formreporte1 = this.formBuilder.group({
    fechaA: [null, [Validators.required]],
    fechaB: [null, [Validators.required]]
  });
  this.formreporte2 = this.formBuilder.group({
    fechaA: [null, [Validators.required]],
    fechaB: [null, [Validators.required]],
    estado: ["ENTREVISTA", [Validators.required]]
  });
  this.formreporte3 = this.formBuilder.group({
    fechaA: [null, [Validators.required]],
    fechaB: [null, [Validators.required]],
    estado: ["SELECCION", [Validators.required]]
  });

  this.solicitanteService.listarEntrevistasInfo().subscribe({
    next: (list: EntrevistaInfo[]) => {
      console.log("Cargar ofertas Costos")
      this.entrevistasInfo = list;
      console.log(this.entrevistasInfo);
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

elegirFechaPostulacionRetirada(){
   if(this.formreporte1.valid) {
    this.fechasOfertaRetirada = this.formreporte1.value as FechasOferta;
    let fechaFormateada1 = format(this.fechasOfertaRetirada.fechaA, 'yyyy-MM-dd');
    let fechaFormateada2 = format(this.fechasOfertaRetirada.fechaB, 'yyyy-MM-dd');
    this.solicitanteService.listarPostulacionesRetiradas(fechaFormateada1,fechaFormateada2).subscribe({
      next:(list:RegistroRetirada[])=>{
        if(list){
          console.log("Cargar Oferta Retiradas Fechas ")
          this.listarPostulacionesRetiradas = list;
          console.log(this.listarPostulacionesRetiradas);
        }
        else{
          this.formreporte1.reset({
            
          });
          this.formreporte1 = this.formBuilder.group({
            fechaA: [null, [Validators.required]],
            fechaB: [null, [Validators.required]]
          });
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

elegirFechaOfertasSeleccion(){
  if (this.formreporte3.valid) {
    this.fechasOferta = this.formreporte3.value as FechasOferta;
    let fechaFormateada1 = format(this.fechasOferta.fechaA, 'yyyy-MM-dd');
    let fechaFormateada2 = format(this.fechasOferta.fechaB, 'yyyy-MM-dd');
    console.log("Oferta" + this.fechasOferta);
    console.log(this.fechasOferta)
    this.solicitanteService.listarOfertaFecha(fechaFormateada1,fechaFormateada2,this.fechasOferta.estado).subscribe({
      next:(list: Ofertas[])=>{
          

        if(list){
          console.log("Cargar Oferta Fechas")
          this.ofertasFechaSelecciOn = list;
          console.log(this.ofertasFechaSelecciOn);
        }
        else{
          this.formreporte3.reset({
            
          });
          this.formreporte3 = this.formBuilder.group({
            fechaA: [null, [Validators.required]],
            fechaB: [null, [Validators.required]],
            estado: [null, [Validators.required]]
          });
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

elegirOfertasEntrevista(){
  if (this.formreporte2.valid) {
    this.fechasOfertaEntrevista = this.formreporte2.value as FechasOferta;
    let fechaFormateada1 = format(this.fechasOfertaEntrevista.fechaA, 'yyyy-MM-dd');
    let fechaFormateada2 = format(this.fechasOfertaEntrevista.fechaB, 'yyyy-MM-dd');
    console.log("Oferta" + this.fechasOfertaEntrevista);
    console.log(this.fechasOfertaEntrevista)
    this.solicitanteService.listarOfertaFecha(fechaFormateada1,fechaFormateada2,this.fechasOfertaEntrevista.estado).subscribe({
      next:(list: Ofertas[])=>{
          

        if(list){
          console.log("Cargar Oferta Fechas")
          this.ofertasFechaEntrevista = list;
          console.log(this.ofertasFechaEntrevista);
        }
        else{
          this.formreporte2.reset({
            
          });
          this.formreporte2 = this.formBuilder.group({
            fechaA: [null, [Validators.required]],
            fechaB: [null, [Validators.required]],
            estado: [null, [Validators.required]]
          });
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

filtrarReporte(template: TemplateRef<any>){
  if (this.formreporte1.valid) {
    this.modalRef = this.modalService.show(template);
    
}
}

descargarOfertaCostos(){
  /*this.solicitanteService.descargarOfertasCostos().subscribe(
    response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'OfertaCostos.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }
  ); */
}

descargarOfertasSinEmpleo(){
  this.solicitanteService.descargarOfertasSinEmpleo().subscribe(
    response => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'OfertasSinObtenerEmpleo.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  },
  error => {
    if(error.status === 406){
      this.router.navigate(['**']);
    }else {
      console.error('Error en la solicitud:', error);
    }
  }
  ); 
}

descargarOfertasFaseSeleccion(){
  if (this.formreporte3.valid) {

    this.fechasOferta = this.formreporte3.value as FechasOferta;
    let fechaFormateada1 = format(this.fechasOferta.fechaA, 'yyyy-MM-dd');
    let fechaFormateada2 = format(this.fechasOferta.fechaB, 'yyyy-MM-dd');
    this.solicitanteService.descargarOfertasFaseSeleccion(fechaFormateada1,fechaFormateada2,this.fechasOfertaEntrevista.estado).subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'OfertasFechaSeleccion.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
    error => {
      if(error.status === 406){
        this.router.navigate(['**']);
      }else {
        console.error('Error en la solicitud:', error);
      }
    }
    ); 
  }
}

descargarOfertaEntrevista(){
  if (this.formreporte2.valid) {

    this.fechasOfertaEntrevista = this.formreporte2.value as FechasOferta;
    let fechaFormateada1 = format(this.fechasOfertaEntrevista.fechaA, 'yyyy-MM-dd');
    let fechaFormateada2 = format(this.fechasOfertaEntrevista.fechaB, 'yyyy-MM-dd');
    this.solicitanteService.descargarOfertasFaseSeleccion(fechaFormateada1,fechaFormateada2,this.fechasOfertaEntrevista.estado).subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'OfertasFechaEntrevista.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
    error => {
      if(error.status === 406){
        this.router.navigate(['**']);
      }else {
        console.error('Error en la solicitud:', error);
      }
    }
    ); 
  }
}

descargarPostulacionesRetiradas(){
  if (this.formreporte1.valid) {

    this.fechasOfertaRetirada = this.formreporte1.value as FechasOferta;
    let fechaFormateada1 = format(this.fechasOfertaRetirada.fechaA, 'yyyy-MM-dd');
    let fechaFormateada2 = format(this.fechasOfertaRetirada.fechaB, 'yyyy-MM-dd');
    this.solicitanteService.descargarPostulacioneRetiradas(fechaFormateada1,fechaFormateada2).subscribe(
      response => {
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'OfertasFechaEntrevista.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    },
    error => {
      if(error.status === 406){
        this.router.navigate(['**']);
      }else {
        console.error('Error en la solicitud:', error);
      }
    }
    ); 
  }
}

limpiar(): void {
  this.formreporte1.reset({

  });

}

}
