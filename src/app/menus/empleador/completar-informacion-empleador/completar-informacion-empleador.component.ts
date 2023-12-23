import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Info } from 'src/entities/Info';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-completar-informacion-empleador',
  templateUrl: './completar-informacion-empleador.component.html',
  styleUrls: ['./completar-informacion-empleador.component.css']
})
export class CompletarInformacionEmpleadorComponent {
  infoForm!: FormGroup;
  info!:Info;

  constructor(private formBuilder:FormBuilder,
    private empleadorService:EmpleadorService,
    private router : Router
    ){}

    ngOnInit(){
      this.infoForm = this.formBuilder.group({
        mision: [null, [Validators.required]],
        vision: [null, [Validators.required]]
      });
    }

    enviarInformacion(){
      if (this.infoForm.valid) {
          this.info = this.infoForm.value as Info;
          console.log(this.info)
          this.empleadorService.completarInformacion(this.info).subscribe({
            next:(response: HttpResponse<Info>)=>{
              this.limpiar();
              this.router.navigate(['empleador-completar-tarjeta']);
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
      this.infoForm.reset({});
    }

}
