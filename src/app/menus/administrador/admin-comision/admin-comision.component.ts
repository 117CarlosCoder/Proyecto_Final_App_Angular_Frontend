import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comision } from 'src/entities/Comision';
import { RegistroComision } from 'src/entities/RegistroComision';
import { AdminService } from 'src/services/administrador/AdminService';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-comision',
  templateUrl: './admin-comision.component.html',
  styleUrls: ['./admin-comision.component.css']
})
export class AdminComisionComponent implements OnInit{
    form!:FormGroup;
    listarComision!:Comision;
    carga!:boolean;
    comision!:Comision;
    registroComision!:RegistroComision;
    pipe = new DatePipe('en-US');

    constructor(private adminService:AdminService,
      private formBuilder : FormBuilder,
      private router :Router){}

    ngOnInit(): void {
      console.log("Comision" + this.comision);
      this.form = this.formBuilder.group({
        cantidad: [null, [Validators.required]]
      }); 
      this.carga=false;
      this.adminService.listarComision().subscribe({
        next: (response: HttpResponse<Comision>) => {
          var list: Comision | null= null; 
          if (response.body) {
            list = response.body;
            this.listarComision = list;
            this.carga = true;
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

    


    
  

    cambiarComision(){
      console.log("Cambiar Comision")
      if (this.form.valid) {
        //this.modalRef = this.modalService.show(template);
        this.comision = this.form.value as Comision;
        console.log("Comision" + this.comision);
        console.log(this.comision.cantidad)
        this.registroComision = {
            codigo:0,
            comision:this.comision.cantidad,
            fechaInicial:format(Date.now(), 'yyyy-MM-dd'),
            fechaFinal:''
        }
        this.adminService.cambiarComision(this.comision).subscribe({
          next:(response: HttpResponse<any>)=>{
            if(response.status === 406){
              this.router.navigate(['**']);
            }
            
            console.log(this.registroComision)
            this.adminService.registrarComision(this.registroComision).subscribe({
              next:(data:any)=>{
                console.log("Comision registrada");
              }
            });
             location.reload();
          }
        });
        
      }
    }
    
    limpiar(): void {
      this.form.reset({});
      }
  
}
