import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrevistaFinal } from 'src/entities/EntrevistaFinal';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-realizar-entrevista',
  templateUrl: './realizar-entrevista.component.html',
  styleUrls: ['./realizar-entrevista.component.css']
})
export class RealizarEntrevistaComponent implements OnInit {
  form!:FormGroup;
  codigo!:number;
  usuario!:number;
  oferta!:number;
  finalizarInfoEntrevista!:EntrevistaFinal;
  modalRef?: BsModalRef;
 

  constructor(private empleadorService : EmpleadorService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,){}

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log(this.codigo)
      const valorUsuario = params['usuario'];
      this.usuario = valorUsuario;
      console.log(this.usuario)
      const valorOferta = params['oferta'];
      this.oferta = valorOferta;
      console.log(this.oferta)
    });

    this.form = this.formBuilder.group({
      codigo: [this.codigo],
      usuario: [this.usuario],
      notas: [null, [Validators.required]],
      codigoOferta: [this.oferta],
    });
  }

  finalizarEntrevista(template: TemplateRef<any>){
    if (this.form.valid) {
      this.modalRef = this.modalService.show(template);
      this.finalizarInfoEntrevista = this.form.value as EntrevistaFinal;
      console.log(this.finalizarInfoEntrevista)
      this.empleadorService.finalizarEntrevista(this.finalizarInfoEntrevista).subscribe({
        next:(data:any)=>{
          this.limpiar();
          this.router.navigate([this.empleadorService.elegirPagina('entrevista')]);
        }
      });
    }
  }

  contratar(template: TemplateRef<any>){
    if (this.form.valid) {
      this.modalRef = this.modalService.show(template);
      this.finalizarInfoEntrevista = this.form.value as EntrevistaFinal;
      console.log(this.finalizarInfoEntrevista)
      this.empleadorService.finalizarEntrevista(this.finalizarInfoEntrevista).subscribe({
        next:(data:any)=>{
          this.empleadorService.contratar(this.finalizarInfoEntrevista).subscribe({
            next:(data:any)=>{
              this.limpiar();
              this.router.navigate([this.empleadorService.elegirPagina('entrevista')]);
            }
          });
        }
      });
    }
  }

  limpiar(): void {
    this.form.reset({});
  }
}
