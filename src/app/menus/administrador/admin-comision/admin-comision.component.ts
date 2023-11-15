import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Comision } from 'src/entities/Comision';
import { RegistroComision } from 'src/entities/RegistroComision';
import { AdminService } from 'src/services/administrador/AdminService';
import { DatePipe } from '@angular/common';
import { format } from 'date-fns';

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

      this.form = this.formBuilder.group({
        cantidad: [null, [Validators.required]]
      }); 
      this.carga=false;
      this.adminService.listarComision().subscribe({
        next: (list: Comision) => {
          this.listarComision = list;
          this.carga = true;
        }
      });
    }

    


    
  

    cambiarComision(){
      console.log("Cambiar Comision")
      if (this.form.valid) {
        //this.modalRef = this.modalService.show(template);
        this.comision = this.form.value as Comision;
        console.log("Comision" + this.comision);
        console.log(this.comision)
        this.registroComision = {
            codigo:0,
            comision:this.comision.cantidad,
            fecha:format(Date.now(), 'yyyy-MM-dd')
        }
        this.adminService.cambiarComision(this.comision).subscribe({
          next:(data:any)=>{
            this.limpiar();
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
