import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Categoria } from "src/entities/Categoria";
import { Filtros } from "src/entities/Filtros";
import { Modalidad } from "src/entities/Modalidad";
import { OfertaInformacion } from "src/entities/OfertaInformacion";
import { OfertaInvitado } from "src/entities/OfertaInvitado";
import { Ofertas } from "src/entities/Ofertas";
import { OfertasDate } from "src/entities/OfertasDate";
import { Salario } from "src/entities/Salario";
import { Ubicacion } from "src/entities/Ubicacion";

@Injectable({
    providedIn: 'root'
})

export class InvitadoService {
    
    readonly API_URL = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/guest-servlet";

    constructor(private httpClient: HttpClient) {
    }

    public listarCategorias(): Observable<HttpResponse<Categoria[]>> {
        
        return this.httpClient.get<Categoria[]>(this.API_URL + "/listar-categorias", {observe : 'response'});
    }
    

    public listarOfertas(): Observable<Ofertas[]> {
        
        return this.httpClient.get<Ofertas[]>(this.API_URL + "/listar-ofertas");
    }

    public listarOferta(codigo:String, valor:boolean=true): Observable<OfertaInvitado> {
        return this.httpClient.get<OfertaInvitado>(this.API_URL +"/listar-oferta?codigo="+codigo+"&valor="+valor);
    }

    public listarSalarios(): Observable<Salario[]> {
        return this.httpClient.get<Salario[]>(this.API_URL + "/listar-salarios");
    }

    public listarUbicaciones(): Observable<Ubicacion[]> {
        return this.httpClient.get<Ubicacion[]>(this.API_URL + "/listar-ubicaciones");
    }

    public listarModalidades(): Observable<Modalidad[]> {
        return this.httpClient.get<Modalidad[]>(this.API_URL + "/listar-modalidades");
    }

    public vista() {
        return this.httpClient.get(this.API_URL + "/actualizar-vista");
    }

    public listarOfertasNombre(filtros: Filtros): Observable<Ofertas[]> {
        return this.httpClient.post<Ofertas[]>(this.API_URL + "/buscar-empresa",filtros);
    }

    public listarOfertasFiltros(listaFiltros:Filtros): Observable<Ofertas[]> {
        return this.httpClient.post<Ofertas[]>(this.API_URL + "/listar-ofertas-filtros", listaFiltros);
    }

    public listarOfertasEmpresa(codigo:number): Observable<OfertasDate[]> {
        return this.httpClient.get<OfertasDate[]>(this.API_URL + "/listar-ofertas-empresa?codigo="+codigo);
    }

    public listarEmpresa(codigo:number): Observable<OfertaInformacion> {
        return this.httpClient.get<OfertaInformacion>(this.API_URL + "/listar-empresa?codigo="+codigo);
    }

}