import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { DatosPostulante } from 'src/entities/DatosPostulante';
import { Usuario } from 'src/entities/Usuario';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';
import { UsuarioService } from 'src/services/usuario/UsuarioService';


@Component({
  selector: 'app-datos-postulante',
  templateUrl: './datos-postulante.component.html',
  styleUrls: ['./datos-postulante.component.css']
})
export class DatosPostulanteComponent implements OnInit {
  listarPostulante!:DatosPostulante;
  codigo!:number;
  oferta!:number;
  carga!:boolean;
  pdfUrl!: SafeResourceUrl;


  constructor(private empleadorService:EmpleadorService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer){

  }

  ngOnInit(){
    this.carga=false;
    this.route.params.subscribe(params => {
      const valorRecibido = params['codigo'];
      this.codigo = valorRecibido;
      console.log("Codigo");
      console.log(this.codigo)
    });

    this.route.params.subscribe(params => {
      const valorRecibido = params['oferta'];
      this.oferta = valorRecibido;
      console.log("oferta");
      console.log(this.oferta)
    });

    this.empleadorService.listarPostulante(this.codigo, this.oferta).subscribe({
      next: (response: HttpResponse<DatosPostulante>) => {
        console.log("Cargar Postulante");
        var dato: DatosPostulante | null= null; 
          if (response.body) {
            dato = response.body;
            console.log(dato);
            this.listarPostulante = dato;
            this.carga= true;
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


    this.empleadorService.listarPdf(this.codigo).subscribe(
      
        (response: HttpResponse<ArrayBuffer>) =>{
          var data: ArrayBuffer | null= null; 
          if (response.body) {
            data = response.body;
            console.log(data);
            const blob = new Blob([data], { type: 'application/pdf' });
            this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
            console.log(data)
            console.log(this.pdfUrl);
          }     
        },
        (error) => {
          console.error('Error al obtener el PDF', error);
         
          if(error.status === 406){
            this.router.navigate(['**']);
          }
        
        }
      
    );

    
  }

  pasarEntrevista(){
    console.log(this.listarPostulante.codigoOferta)
    
    this.router.navigate(['generar-entrevista', {codigo:this.listarPostulante.codigo, oferta:this.oferta}]);
  }
  
  cancelar(){
    this.router.navigate(["empleador-postulantes",{codigo:this.oferta}]);
  }
}
