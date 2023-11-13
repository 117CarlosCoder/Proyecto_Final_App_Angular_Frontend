import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { DatosPostulante } from 'src/entities/DatosPostulante';
import { Postulante } from 'src/entities/Postulante';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';

@Component({
  selector: 'app-datos-postulante',
  templateUrl: './datos-postulante.component.html',
  styleUrls: ['./datos-postulante.component.css']
})
export class DatosPostulanteComponent implements OnInit {
  listarPostulante!:DatosPostulante;
  codigo!:number;
  carga!:boolean;

  constructor(private empleadorService:EmpleadorService,
    private route: ActivatedRoute,
    private router: Router){

  }

  ngOnInit(){
    this.carga=false;
    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log("Codigo");
      console.log(this.codigo)
    });

    this.empleadorService.listarPostulante(this.codigo).subscribe({
      next: (dato: DatosPostulante) => {
        console.log("Cargar Postulante");
        console.log(dato);
        this.listarPostulante = dato;
        this.carga= true;
      }
    });

    

    
  }

  pasarEntrevista(){
    console.log(this.listarPostulante.codigoOferta)
    this.router.navigate(['generar-entrevista', {codigo:this.listarPostulante.codigoOferta}]);
  }
  
  cancelar(){
    this.router.navigate(['revisar-postulaciones']);
  }
}
