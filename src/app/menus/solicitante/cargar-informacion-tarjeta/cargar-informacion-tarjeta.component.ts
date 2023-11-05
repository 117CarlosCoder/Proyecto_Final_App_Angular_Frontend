import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tarjeta } from 'src/entities/Tarjeta';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-cargar-informacion-tarjeta',
  templateUrl: './cargar-informacion-tarjeta.component.html',
  styleUrls: ['./cargar-informacion-tarjeta.component.css']
})
export class CargarInformacionTarjetaComponent implements OnInit{
  form !: FormGroup;
  modalRef?: BsModalRef;
  tarjeta !: Tarjeta;
  
  constructor(private formBuilder: FormBuilder,
     private solicitanteService: SolicitanteService,
     private router : Router,
     private modalService: BsModalService){
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      titular: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      codigoSeguridad: [null, [Validators.required]],
      fechaExpiracion: [null, [Validators.required]]
    });
  }

  complertarInfo(template: TemplateRef<any>){
    if (this.form.valid) {
      this.modalRef = this.modalService.show(template);
      this.tarjeta = this.form.value as Tarjeta;
      console.log(this.tarjeta)
      this.solicitanteService.enviaTarjeta(this.tarjeta).subscribe({
        next:(data:any)=>{
          this.limpiar();
          this.router.navigate([this.solicitanteService.elegirPagina('aplicar')]);
        }
      });
  }
  }

  limpiar(): void {
    this.form.reset({

    });

  }

}
