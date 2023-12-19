import { Injectable } from "@angular/core";
import { Observable, filter } from "rxjs";
import { Informacion } from "src/entities/Informacion";
import { Categoria } from "src/entities/Categoria";
import { HttpClient } from "@angular/common/http";
import { Ofertas } from "src/entities/Ofertas";
import { Mensaje } from "src/entities/Mesaje";
import { Tarjeta } from "src/entities/Tarjeta";
import { Postulacion } from "src/entities/Postulacion";
import { Entrevista } from "src/entities/Entrevista";
import { EntrevistaN } from "src/entities/EntrevistaN";
import { OfertaCostos } from "src/entities/OfertaCostos";
import { EntrevistaFecha } from "src/entities/EntrevistaFecha";
import { EntrevistaInfo } from "src/entities/EntrevistaInfo";
import { FechasOferta } from "src/entities/FechasOferta";
import { RegistroRetirada } from "src/entities/RegistroRetirada";
import { Salario } from "src/entities/Salario";
import { Ubicacion } from "src/entities/Ubicacion";
import { Filtros } from "src/entities/Filtros";

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

    public crearRegitroRetirada(registro: RegistroRetirada) {
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/resgistrar-retirada-postulacion", registro);
    }

    public listarCategorias(): Observable<Categoria[]> {
        return this.httpClient.get<Categoria[]>(this.API_URL + "/listar-categorias");
    }

    public listarOfertas(): Observable<Ofertas[]> {
        return this.httpClient.get<Ofertas[]>(this.API_URL + "/listar-ofertas");
    }

    public listarOfertasSugerencia(): Observable<Ofertas[]> {
        return this.httpClient.get<Ofertas[]>(this.API_URL + "/listar-ofertas-sugerencias");
    }

    public listarOfertasNombre(filtros: Filtros): Observable<Ofertas[]> {
        return this.httpClient.post<Ofertas[]>(this.API_URL + "/buscar-empresa",filtros);
    }

    public listarOfertasFiltros(listaFiltros:Filtros): Observable<Ofertas[]> {
        return this.httpClient.post<Ofertas[]>(this.API_URL + "/listar-ofertas-filtros", listaFiltros);
    }

    public listarPostulaciones(): Observable<Postulacion[]> {
        return this.httpClient.get<Postulacion[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/listar-postulaciones");
    }


    public listarSalarios(): Observable<Salario[]> {
        return this.httpClient.get<Salario[]>(this.API_URL + "/listar-salarios");
    }

    public listarUbicaciones(): Observable<Ubicacion[]> {
        return this.httpClient.get<Ubicacion[]>(this.API_URL + "/listar-ubicaciones");
    }

    public descargarOfertasCostos() {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded//v1/employer-reports-servlet/ofertas-costos", { responseType: 'blob' });
    }

    public listarOfertasCostos(): Observable<OfertaCostos[]> {
        return this.httpClient.get<OfertaCostos[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/ofertas-costos");
    }

    public listarEntrevistaFecha(fecha : Date): Observable<EntrevistaFecha[]> {
        return this.httpClient.get<EntrevistaFecha[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-fechaEntrevista?fecha=" + fecha);
    }

    public listarOferta(codigo:String, valor:boolean=true): Observable<Ofertas> {
        console.log(valor)
        return this.httpClient.get<Ofertas>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/listar-oferta-postulacion?codigo="+codigo+"&valor="+valor);
    }

    public listarOfertaFecha(fechaA : String,fechaB : String,estado:String): Observable<Ofertas[]> {
        return this.httpClient.get<Ofertas[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-changer-servlet/ofertas-fecha?fechaA=" +fechaA+"&fechaB="+ fechaB+"&estado="+estado);
    }

    public listarEntrevistasInfo(): Observable<EntrevistaInfo[]> {
        return this.httpClient.get<EntrevistaInfo[]>( "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-changer-servlet/listar-entrevistas-info");
    }   

    public listarPostulacionesRetiradas(fechaA:String,fechaB: String): Observable<RegistroRetirada[]> {
        return this.httpClient.get<RegistroRetirada[]>( "http://localhost:8080/Proyecto_Final_Servlet_war_exploded//v1/applicant-reports-changer-servlet/listar-postulaciones-retiradas?fechaA="+fechaA+"&fechaB="+fechaB);
    }   

    public listaEntrevista(): Observable<EntrevistaN[]> {
        return this.httpClient.get<EntrevistaN[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-interview-servlet/listar-entrevistas");
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

    public descargarOfertasSinEmpleo() {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-servlet/oferta-sin-obtener-empleo", { responseType: 'blob' });
    }

    public descargarOfertasFaseSeleccion(fechaA : String,fechaB : String,estado:String) {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-servlet/oferta-fase-seleccion?fechaA=" +fechaA+"&fechaB="+ fechaB+"&estado="+estado, { responseType: 'blob' });
    }

    public descargarOfertasEntrevista(fechaA : String,fechaB : String,estado:String) {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-servlet/oferta-fase-entrevista?fechaA=" +fechaA+"&fechaB="+ fechaB+"&estado="+estado, { responseType: 'blob' });
    }

    public descargarPostulacioneRetiradas(fechaA : String,fechaB : String) {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-servlet/oferta-postulacion-retirada?fechaA=" +fechaA+"&fechaB="+ fechaB, { responseType: 'blob' });
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
        if (pagina == 'perfil') {
            return 'solicitante-editar-perfil';
        }
        return 'solicitante-aplicar-oferta';
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