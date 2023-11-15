import { Injectable } from '@angular/core';
import { Info } from 'src/entities/Info';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ofertas } from 'src/entities/Ofertas';
import { Categoria } from 'src/entities/Categoria';
import { Modalidad } from 'src/entities/Modalidad';
import { Codigo } from 'src/entities/Codigo';
import { Postulacion } from 'src/entities/Postulacion';
import { Postulante } from 'src/entities/Postulante';
import { DatosPostulante } from 'src/entities/DatosPostulante';
import { DatosEntrevista } from 'src/entities/DatosEntrevista';
import { Entrevista } from 'src/entities/Entrevista';
import { EntrevistaInfo } from 'src/entities/EntrevistaInfo';
import { EntrevistaFinal } from 'src/entities/EntrevistaFinal';
import { OfertaCostos } from 'src/entities/OfertaCostos';
import { Estados } from 'src/entities/Estados';
import { EntrevistaFecha } from 'src/entities/EntrevistaFecha';
import { FechasOferta } from 'src/entities/FechasOferta';

@Injectable({
    providedIn: 'root'
})

export class EmpleadorService {
    readonly API_URL = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-servlet";

    constructor(private httpClient: HttpClient) {
    }

    public completarInformacion(informacion: Info): Observable<Info> {
        return this.httpClient.post<Info>(this.API_URL+"/completar-informacion", informacion);
    }

    public enviarOferta(oferta: Ofertas): Observable<Ofertas> {
        return this.httpClient.post<Ofertas>(this.API_URL+"/crear-oferta", oferta);
    }

    public eliminarOferta(codigo: number){
        return this.httpClient.delete<Ofertas>(this.API_URL+"/eliminar-oferta?codigo="+codigo);
    }

    public actualizarOferta(oferta: Ofertas): Observable<Ofertas> {
        console.log(oferta)
        return this.httpClient.put<Ofertas>(this.API_URL+"/actualizar-oferta", oferta);
    }

    public listarOfertas(): Observable<Ofertas[]> {
        return this.httpClient.get<Ofertas[]>(this.API_URL + "/cargar-ofertas");
    }

    public listarOferta(codigo:number): Observable<Ofertas> {
        return this.httpClient.get<Ofertas>(this.API_URL + "/listar-oferta?codigo="+codigo);
    }

    public listarPostulantes(codigo:number): Observable<Postulante[]> {
        return this.httpClient.post<Postulante[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/cargar-postulantes?codigo="+codigo,null);
    }

    public listarPostulante(codigo:number): Observable<DatosPostulante> {
        return this.httpClient.post<DatosPostulante>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/obtener-postulante?codigo="+codigo,null);
    }

    public generarEntrevista( datosEntrevista:DatosEntrevista): Observable<DatosEntrevista> {
        return this.httpClient.post<DatosEntrevista>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/generar-entrevista",datosEntrevista);
    }

    public descargarOfertasCostos() {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-servlet/ofertas-costos", { responseType: 'blob' });
    }

    public descargarEntrevistaFecha(fecha:String, estado:String) {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-servlet/entrevista-fecha-especifica?fecha="+fecha+"&estado="+estado, { responseType: 'blob' });
    }
    
    public descargarEntrevistaEstado(fechaA:String,fechaB:String, estado:String) {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-servlet/entrevista-fecha-estado?fechaA="+fechaA+"&fechaB="+fechaB+"&estado="+estado, { responseType: 'blob' });
    }

    public listarEstados(): Observable<Estados[]> {
        return this.httpClient.get<Estados[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-estados");
    }

    public listarOfertasCostos(): Observable<OfertaCostos[]> {
        return this.httpClient.get<OfertaCostos[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/ofertas-costos");
    }

    public listarEstadosOferta(): Observable<Estados[]> {
        return this.httpClient.get<Estados[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-estados-oferta");
    }

    public listarCategorias(): Observable<Categoria[]> {
        return this.httpClient.get<Categoria[]>(this.API_URL + "/listar-categorias");
    }

    public listarEntrevistas(): Observable<EntrevistaInfo[]> {
        return this.httpClient.get<EntrevistaInfo[]>( "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/cargar-entrevistas");
    }

    public listarModalidades(): Observable<Modalidad[]> {
        return this.httpClient.get<Modalidad[]>(this.API_URL + "/listar-modalidades");
    }

    public listarEntrevistaFecha(fecha : String,estado:String): Observable<EntrevistaFecha[]> {
        return this.httpClient.get<EntrevistaFecha[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-fechaEntrevista?fecha=" + fecha+"&estado="+ estado);
    }

    public listarOfertaFecha(fechaA : String,fechaB : String,estado:String): Observable<Ofertas[]> {
        return this.httpClient.get<Ofertas[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-fecha-Oferta?fechaA=" + fechaA+"&fechaB="+ fechaB+"&estado="+estado);
    }

    public finalizarEntrevista(entrevista : EntrevistaFinal): Observable<EntrevistaFinal> {
        return this.httpClient.put<EntrevistaFinal>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/finalizar-entrevista",entrevista);
    }


    public elegirPagina(pagina:String){
    
        if (pagina == 'gestion') {
            return 'empleador-gestion';
        }
        if (pagina == 'crear') {
            return 'crear-oferta';
        }
        if (pagina == 'actualizar') {
           return 'actualizar-oferta';
        }
        if (pagina == 'reportes') {
            return 'empleador-reportes';
        }
        if (pagina == 'postular') {
            return 'revisar-postulaciones';
        }
        if (pagina == 'entrevista') {
            return 'revisar-entrevistas';
        }
        return 'solicitante-aplicar-ofeta';
    }
    
    public nombrePagina(pagina:String){
        if (pagina == "completar") {
            return 'Completar Informacion';
        }
        if (pagina == "gestion") {
            return 'Gestion';
        }
        if (pagina == "postulacion") {
           return 'Revision Postulaciones';
        }
        if (pagina == "entrevista") {
            return 'Revision Entrevista';
        }
        if (pagina == "reportes") {
            return 'Revision Entrevista';
        }
        return '';
    }

}