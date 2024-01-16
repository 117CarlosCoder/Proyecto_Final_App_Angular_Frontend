import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  modalRef?:BsModalRef;

  constructor(private formBuilder:FormBuilder,
    private adminService:AdminService,
    private router : Router,
    private modalService: BsModalService){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
    }); 
  }

  crearCategoria(template: TemplateRef<any>,template2: TemplateRef<any>){
    if (this.form.valid) {
      //this.modalRef = this.modalService.show(template);
      this.categoria = this.form.value as Categoria;
      console.log("Categoria" + this.categoria);
      console.log(this.categoria)
      this.adminService.crearCategoria(this.categoria).subscribe({
        next:(response: HttpResponse<any>)=>{
          this.limpiar();
          this.modalRef = this.modalService.show(template);
          this.router.navigate([this.adminService.elegirPagina('gestion')]);


        },
        error: (error) => {
          if(error.status === 406){
            this.router.navigate(['**']);
          }if(error.status === 400){
            this.modalRef = this.modalService.show(template2);
          }else {
            console.error('Error en la solicitud:', error);
          }
        }
      });
    }
  }

  cancelar(){
    this.limpiar();
    this.router.navigate([this.adminService.elegirPagina('gestion')]);
  }

  limpiar(): void {
  this.form.reset({});
  }
}
