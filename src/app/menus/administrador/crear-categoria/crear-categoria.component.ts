import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/entities/Categoria';
import { AdminService } from 'src/services/administrador/AdminService';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrls: ['./crear-categoria.component.css']
})
export class CrearCategoriaComponent implements OnInit{
  form!:FormGroup;
  categoria!:Categoria;

  constructor(private formBuilder:FormBuilder,
    private adminService:AdminService,
    private router : Router){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
    }); 
  }

  crearCategoria(){
    if (this.form.valid) {
      //this.modalRef = this.modalService.show(template);
      this.categoria = this.form.value as Categoria;
      console.log("Categoria" + this.categoria);
      console.log(this.categoria)
      this.adminService.crearCategoria(this.categoria).subscribe({
        next:(response: HttpResponse<any>)=>{
          this.limpiar();
          this.router.navigate([this.adminService.elegirPagina('gestion')]);
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

  cancelar(){
    this.limpiar();
    //this.router.navigate([this.adminService.elegirPagina('gestion')]);
  }

  limpiar(): void {
  this.form.reset({});
  }
}
