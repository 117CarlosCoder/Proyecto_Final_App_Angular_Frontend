import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Mensaje } from 'src/entities/Mesaje';
import { SolicitanteService } from 'src/services/solcitante/SolicitanteService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-aplicar-empleo',
  templateUrl: './aplicar-empleo.component.html',
  styleUrls: ['./aplicar-empleo.component.css']
})

export class AplicarEmpleoComponent implements OnInit{
  mensajeForm!: FormGroup;
  mensajeUsuario!: Mensaje;
  modalRef?: BsModalRef;
  codigo!:String

  constructor(private formBuilder:FormBuilder,
    private solicitanteService : SolicitanteService,
    private router : Router,
    private route : ActivatedRoute,
    private modalService: BsModalService
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log(this.codigo)
    });

    this.mensajeForm = this.formBuilder.group({
      codigoOferta: this.codigo,
      mensaje: [null, [Validators.required]]
    });
  }

  enviarMensaje(template: TemplateRef<any>){
    if (this.mensajeForm.valid) {
      
        this.mensajeUsuario = this.mensajeForm.value as Mensaje;
        console.log(this.mensajeUsuario)
        this.solicitanteService.enviaMensaje(this.mensajeUsuario).subscribe({
          next:(data:any)=>{
            this.modalRef = this.modalService.show(template);
            this.limpiar();
            this.router.navigate([this.solicitanteService.elegirPagina('aplicar')]);
          }
        });
    }
  }

  limpiar(): void {
    this.mensajeForm.reset({});
  }
  
}
