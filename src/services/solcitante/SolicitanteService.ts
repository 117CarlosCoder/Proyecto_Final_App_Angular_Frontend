import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Informacion } from "src/entities/Informacion";
import { Categoria } from "src/entities/Categoria";
import { HttpClient } from "@angular/common/http";
import { Ofertas } from "src/entities/Ofertas";

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

    public elegirPagina(pagina:String){
    
        if (pagina == 'aplicar') {
            return 'solicitante-aplicar-oferta';
        }
        if (pagina == 'postular') {
           return 'solicitante-postulaciones';
        }
        if (pagina == 'entrevista') {
            return 'solicitante-entrevistas';
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