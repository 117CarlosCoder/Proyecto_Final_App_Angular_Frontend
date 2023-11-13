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

  constructor(private empleadorService :EmpleadorService,
    private route:ActivatedRoute,
    private router: Router){

  }

    ngOnInit(): void {
   
      this.empleadorService.listarEntrevistas().subscribe({
        next: (list: EntrevistaInfo[]) => {
            console.log("Cargar Entrevistas")
            this.listarEntrevistas = list;
            console.log(this.listarEntrevistas);
        }
      });
    }

    seleccionarEntrevista(codigo:number, usuario:number){
      this.router.navigate(['realizar-entrevista',{codigo:codigo,usuario:usuario}]);
    }
}
