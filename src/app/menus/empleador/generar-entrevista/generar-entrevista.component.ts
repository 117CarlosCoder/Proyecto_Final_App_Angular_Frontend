import { Component, OnInit ,TemplateRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosEntrevista } from 'src/entities/DatosEntrevista';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpResponse } from '@angular/common/http';
import { Ofertas } from 'src/entities/Ofertas';

@Component({
  selector: 'app-generar-entrevista',
  templateUrl: './generar-entrevista.component.html',
  styleUrls: ['./generar-entrevista.component.css']
})
export class GenerarEntrevistaComponent implements OnInit{
  form!:FormGroup;
  hoursPlaceholder = 'hh';
  minutesPlaceholder = 'mm';
  datosEntrevista !: DatosEntrevista;
  codigo!:number;
  oferta!:number;
  modalRef?: BsModalRef;
  ofertaNombre!: Ofertas;

  constructor(private formBuilder : FormBuilder,
    private empleadorService: EmpleadorService,
    private modalService: BsModalService,
    private router:Router,
    private route :ActivatedRoute){

  }

  ngOnInit(){

    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log("Codigo");
      console.log(this.codigo)
    });

    this.route.params.subscribe(params => {
      const valorRecibido = params['oferta'];
      this.oferta = valorRecibido;
      console.log("Oferta");
      console.log(this.oferta)
    });

    this.form = this.formBuilder.group({
      fecha: [null, [Validators.required]],
      ubicacion: [null, [Validators.required]],
      hora:[null, [Validators.required]]
    });


    this.empleadorService.listarOferta(this.oferta).subscribe({
      next:(response: HttpResponse<Ofertas>)=>{
        var data : Ofertas | null = null;
        if (response.body) {
          data = response.body;
          this.ofertaNombre =data;
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

  generarEntrevista(template: TemplateRef<any>){
    if (this.form.valid) {
      
      this.datosEntrevista = this.form.value as DatosEntrevista;
      console.log("Oferta" + this.datosEntrevista);
      console.log(this.datosEntrevista);
      this.empleadorService.generarEntrevista(this.datosEntrevista, this.codigo, this.oferta).subscribe({
        next:(response: HttpResponse<any>)=>{
          this.modalRef = this.modalService.show(template);
          this.limpiar();
          this.empleadorService.crearNotificacion("Entro a la fase de entrevistas de la oferta " + this.ofertaNombre.empresa, this.codigo ).subscribe({
            next:(data : any) =>{
              console.log("Notificando entrevista");
            },
            error: (error) => {
              if(error.status === 406){
                this.router.navigate(['**']);
              }else {
                console.error('Error en la solicitud:', error);
              }
            }

          });
          this.router.navigate([this.empleadorService.elegirPagina('postular')]);
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

  limpiar(): void {
    this.form.reset({});
  }

}
