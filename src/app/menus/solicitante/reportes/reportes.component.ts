import { Component, OnInit, TemplateRef } from '@angular/core';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
}

filtrarReporte(template: TemplateRef<any>){
  if (this.formreporte1.valid) {
    this.modalRef = this.modalService.show(template);
    
}
}

limpiar(): void {
  this.formreporte1.reset({

  });

}

}
