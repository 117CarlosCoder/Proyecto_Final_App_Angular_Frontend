import { Component, OnInit } from '@angular/core';
import { DomSanitizer,SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouteReuseStrategy, Router } from '@angular/router';
import { DatosPostulante } from 'src/entities/DatosPostulante';
import { Postulante } from 'src/entities/Postulante';
import { UsuarioPdf } from 'src/entities/UsuarioPdf';
import { EmpleadorService } from 'src/services/empleador/EmpleadorService';


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
      next: (dato: DatosPostulante) => {
        console.log("Cargar Postulante");
        console.log(dato);
        this.listarPostulante = dato;
        this.carga= true;
      }
    });


    this.empleadorService.listarPdf(this.codigo).subscribe(
      
        (data) =>{
          // Convierte los bytes a un Blob
          const blob = new Blob([data], { type: 'application/pdf' });

          // Crea una URL segura para el Blob
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
          console.log(data)
          console.log(this.pdfUrl);
          
        },
        (error) => {
          console.error('Error al obtener el PDF', error);
        }
      
    );

    
  }

  pasarEntrevista(){
    console.log(this.listarPostulante.codigoOferta)
    this.router.navigate(['generar-entrevista', {codigo:this.listarPostulante.codigoOferta}]);
  }
  
  cancelar(){
    this.router.navigate(['revisar-postulaciones']);
  }
}
