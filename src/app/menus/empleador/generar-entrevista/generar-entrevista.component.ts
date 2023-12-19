import { Component, OnInit ,TemplateRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosEntrevista } from 'src/entities/DatosEntrevista';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  modalRef?: BsModalRef;

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

    this.form = this.formBuilder.group({
      fecha: [null, [Validators.required]],
      ubicacion: [null, [Validators.required]],
      hora:[null, [Validators.required]]
    });
  }

  generarEntrevista(template: TemplateRef<any>){
    if (this.form.valid) {
      
      this.datosEntrevista = this.form.value as DatosEntrevista;
      console.log("Oferta" + this.datosEntrevista);
      console.log(this.datosEntrevista);
      this.empleadorService.generarEntrevista(this.datosEntrevista).subscribe({
        next:(data:any)=>{
          this.modalRef = this.modalService.show(template);
          this.limpiar();
          this.router.navigate([this.empleadorService.elegirPagina('postular')]);
        }
      });
    }
  }

  limpiar(): void {
    this.form.reset({});
  }

}
