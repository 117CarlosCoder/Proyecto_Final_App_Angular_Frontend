import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrevista } from 'src/entities/Entrevista';
import { EntrevistaInfo } from 'src/entities/EntrevistaInfo';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';

@Component({
  selector: 'app-revision-entrevistas',
  templateUrl: './revision-entrevistas.component.html',
  styleUrls: ['./revision-entrevistas.component.css']
})
export class RevisionEntrevistasComponent implements OnInit{
    listarEntrevistas!:EntrevistaInfo[];
    Fecha!: String|null;
    FechaN!:Date;
    pipe = new DatePipe('en-US');

  constructor(private empleadorService :EmpleadorService,
    private route:ActivatedRoute,
    private router: Router){

  }

    ngOnInit(): void {
   
      this.empleadorService.listarEntrevistas().subscribe({
        next: (list: EntrevistaInfo[]) => {
            console.log("Cargar Entrevistas")
            list.forEach(element => {
              if(element.fecha!=null){
                this.Fecha = this.pipe.transform(element.fecha.toString(), 'yyyy-MM-dd');
                console.log(this.Fecha?.toString());
                if(this.Fecha?.toString()){
                  element.fecha = this.Fecha?.toString()
                }
              }
            });
            
            this.listarEntrevistas = list;
            console.log(this.listarEntrevistas);
        }
      });
    }

    seleccionarEntrevista(codigo:number, usuario:number, oferta:number){
      this.router.navigate(['realizar-entrevista',{codigo:codigo,usuario:usuario, oferta:oferta}]);
    }
}
