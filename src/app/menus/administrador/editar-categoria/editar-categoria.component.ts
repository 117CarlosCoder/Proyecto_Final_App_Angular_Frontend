import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/entities/Categoria';
import { AdminService } from 'src/services/administrador/AdminService';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit{
    form!:FormGroup;
    listarCategoria!:Categoria;
    categoria!:Categoria;
    carga!:boolean;
    codigo!:number;

    constructor(private adminService: AdminService,
      private route:ActivatedRoute,
      private formBuilder:FormBuilder,
      private router: Router){
  
    }

    ngOnInit(): void 
      {
        this.carga=false; 
        this.form = this.formBuilder.group({
          codigo:[null,[Validators.required]],
          nombre: [null, [Validators.required]],
          descripcion: [null, [Validators.required]],
        });  

      this.route.params.subscribe(params => {
          const valorRecibido = params['codigo'];
          this.codigo = valorRecibido;
          console.log(this.codigo)
      });
      
      this.adminService.listarCategoria(this.codigo).subscribe({
        next: (list: Categoria) => {
          this.listarCategoria = list;
          console.log(this.listarCategoria.nombre)
          this.carga = true;
          this.form = this.formBuilder.group({
            codigo: [this.codigo, [Validators.required]],
            nombre: [this.listarCategoria.nombre, [Validators.required]],
            descripcion: [this.listarCategoria.descripcion, [Validators.required]],
          }); 
        }
      });

       
    }

    editarCategoria(){
      if (this.form.valid) {
        //this.modalRef = this.modalService.show(template);
        this.categoria = this.form.value as Categoria;
        console.log("Categoria" + this.categoria);
        console.log(this.categoria)
        this.adminService.editarCategoria(this.categoria).subscribe({
          next:(data:any)=>{
            this.limpiar();
            this.router.navigate([this.adminService.elegirPagina('gestion')]);
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
