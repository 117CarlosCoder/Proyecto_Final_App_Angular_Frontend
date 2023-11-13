import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ofertas } from 'src/entities/Ofertas';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { Router } from '@angular/router';
import { Codigo } from 'src/entities/Codigo';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  form!:FormGroup;
  listarOfetas!:Ofertas[];
  codigoFinal!: Codigo;

  constructor( private empleadorService : EmpleadorService,
    private formBuilder: FormBuilder,
    private router : Router){

  }

  ngOnInit(){
    this.empleadorService.listarOfertas().subscribe({
      next: (list: Ofertas[]) => {
        console.log("Cargar Ofertas")
        this.listarOfetas = list;
        console.log(this.listarOfetas);
      }
    });

    this.form = this.formBuilder.group({
      titular: [null, [Validators.required]],
      numero: [null, [Validators.required]],
      fechaInicial: [null, [Validators.required]],
      fechaFinal: [null, [Validators.required]]
    });
  }

  crearOferta(){
    this.router.navigate([this.empleadorService.elegirPagina('crear')]);
  }

  editarOferta(codigo:number){
    this.router.navigate([this.empleadorService.elegirPagina('actualizar'),{codigo:codigo}]);
  }

  eliminarOferta(codigo:number){
    this.empleadorService.eliminarOferta(codigo).subscribe({
      next:(value: Ofertas) => {
          console.log("Eliminado");
          this.empleadorService.listarOfertas().subscribe({
            next: (list: Ofertas[]) => {
                console.log("Cargar ofertas");
                this.listarOfetas = list;
                console.log(this.listarOfetas);
            }
        });
      }
  });
  }

}
