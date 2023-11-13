import { Component, OnInit, TemplateRef } from '@angular/core';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OfertaCostos } from 'src/entities/OfertaCostos';

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
  ofertaCostos!:OfertaCostos[];


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
    fechaB: [null, [Validators.required]]
  });
  this.formreporte3 = this.formBuilder.group({
    fechaA: [null, [Validators.required]],
    fechaB: [null, [Validators.required]]
  });

  this.solicitanteService.listarOfertasCostos().subscribe({
    next: (list: OfertaCostos[]) => {
      console.log("Cargar ofertas Costos")
      this.ofertaCostos = list;
      console.log(this.ofertaCostos);
    }
  }); 

  

}

cambiarFechaEstado(fecha:Date){
  /*if (this.formreporte2.valid) {
    //this.modalRef = this.modalService.show(template);
    this.oferta = this.formreporte2.value as Ofertas;
    console.log("Oferta" + this.oferta.nombre);
    console.log(this.oferta)
    this.solicitanteService.actualizarOferta(this.oferta).subscribe({
      next:(data:any)=>{
        this.limpiar();
        this.router.navigate([this.empleadorService.elegirPagina('gestion')]);
      }
    });
  }*/
}

filtrarReporte(template: TemplateRef<any>){
  if (this.formreporte1.valid) {
    this.modalRef = this.modalService.show(template);
    
}
}

descargarOfertaCostos(){
  this.solicitanteService.descargarOfertasCostos().subscribe(
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

limpiar(): void {
  this.formreporte1.reset({

  });

}

}
