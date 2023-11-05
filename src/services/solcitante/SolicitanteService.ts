import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Informacion } from "src/entities/Informacion";
import { Categoria } from "src/entities/Categoria";
import { HttpClient } from "@angular/common/http";
import { Ofertas } from "src/entities/Ofertas";
import { Mensaje } from "src/entities/Mesaje";
import { Tarjeta } from "src/entities/Tarjeta";
import { Postulacion } from "src/entities/Postulacion";
import { Entrevista } from "src/entities/Entrevista";

@Injectable({
    providedIn: 'root'
})
export class SolicitanteService {

    readonly API_URL = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-servlet";

    constructor(private httpClient: HttpClient) {
    }

    public completarInformacion(informacion: Informacion): Observable<Informacion> {
        return this.httpClient.post<Informacion>(this.API_URL+"/completar-informacion", informacion);
    }

    public listarCategorias(): Observable<Categoria[]> {
        return this.httpClient.get<Categoria[]>(this.API_URL + "/listar-categorias");
    }

    public listarOfertas(): Observable<Ofertas[]> {
        return this.httpClient.get<Ofertas[]>(this.API_URL + "/listar-ofertas");
    }

    public listarPostulaciones(): Observable<Postulacion[]> {
        return this.httpClient.get<Postulacion[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/listar-postulaciones");
    }


    public listarOferta(codigo:String): Observable<Ofertas> {
        return this.httpClient.get<Ofertas>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/listar-oferta-postulacion?codigo="+codigo);
    }

    public listaEntrevista(): Observable<Entrevista[]> {
        return this.httpClient.get<Entrevista[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-interview-servlet/listar-entrevistas");
    }

    public elminarPostulacion(codigo:number) {
        return this.httpClient.delete<Postulacion>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/eliminar-postulacion?codigo="+codigo);
    }

    public enviaMensaje(mensaje : Mensaje):Observable<Mensaje>{
        return this.httpClient.post<Mensaje>(this.API_URL+"/aplicar-oferta",mensaje);    
    } 

    public enviaTarjeta(tarjeta : Tarjeta):Observable<Tarjeta>{
        return this.httpClient.post<Tarjeta>(this.API_URL+"/completar-informacion-tarjeta",tarjeta);    
    } 

    public elegirPagina(pagina:String){
    
        if (pagina == 'aplicar') {
            return 'solicitante-aplicar-oferta';
        }
        if (pagina == 'completar') {
            return 'solicitante-completar-tarjeta';
        }
        if (pagina == 'postular') {
           return 'solicitante-postulaciones';
        }
        if (pagina == 'entrevista') {
            return 'solicitante-entrevistas';
        }
        if (pagina == 'reportes') {
            return 'solicitante-reportes';
        }
        return 'solicitante-aplicar-ofeta';
    }

    public nombrePagina(pagina:String){
        if (pagina == "completar") {
            return 'Completar Informacion';
        }
        if (pagina == "aplicar") {
            return 'Aplicar Oferta';
        }
        if (pagina == "postular") {
           return 'Postulaciones';
        }
        if (pagina == "entrevista") {
            return 'Entrevistas';
         }
        return '';
    }

   

}