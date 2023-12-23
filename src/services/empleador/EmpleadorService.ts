import { Injectable } from '@angular/core';
import { Info } from 'src/entities/Info';
import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ofertas } from 'src/entities/Ofertas';
import { Categoria } from 'src/entities/Categoria';
import { Modalidad } from 'src/entities/Modalidad'; 
import { Postulante } from 'src/entities/Postulante';
import { DatosPostulante } from 'src/entities/DatosPostulante';
import { DatosEntrevista } from 'src/entities/DatosEntrevista';
import { EntrevistaInfo } from 'src/entities/EntrevistaInfo';
import { EntrevistaFinal } from 'src/entities/EntrevistaFinal';
import { OfertaCostos } from 'src/entities/OfertaCostos';
import { Estados } from 'src/entities/Estados';
import { EntrevistaFecha } from 'src/entities/EntrevistaFecha';
import { Tarjeta } from 'src/entities/Tarjeta';
import { OfertasDate } from 'src/entities/OfertasDate';
import { UsuarioService } from '../usuario/UsuarioService';
import { TelefonoUsuario } from 'src/entities/TelefonoUsuario';
import { CrearUsuario } from 'src/entities/CrearUsuario';
import { NumTelefono } from 'src/entities/NumTelefono';
import { UsuarioT } from 'src/entities/UsuarioT';

@Injectable({
    providedIn: 'root'
})

export class EmpleadorService {
    readonly API_URL = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-servlet";
    headers : HttpHeaders = new HttpHeaders(this.usuarioService.getCredenciales());

    constructor(private httpClient: HttpClient,
        private usuarioService: UsuarioService) {
    }

    public completarInformacion(informacion: Info): Observable<HttpResponse<Info>> {
        return this.httpClient.post<Info>(this.API_URL+"/completar-informacion", informacion, {observe: 'response', headers:this.headers});
    }

    public enviarOferta(oferta: Ofertas): Observable<HttpResponse<Ofertas>> {
        return this.httpClient.post<Ofertas>(this.API_URL+"/crear-oferta", oferta, {observe: 'response', headers:this.headers});
    }

    public enviaTarjeta(tarjeta : Tarjeta):Observable<HttpResponse<Tarjeta>>{
        return this.httpClient.post<Tarjeta>(this.API_URL+"/completar-informacion-tarjeta",tarjeta, {observe: 'response', headers:this.headers});    
    } 

    public eliminarOferta(codigo: number){
        return this.httpClient.delete<Ofertas>(this.API_URL+"/eliminar-oferta?codigo="+codigo, {observe: 'response', headers:this.headers});
    }

    public actualizarOferta(oferta: Ofertas): Observable<HttpResponse<Ofertas>> {
        console.log(oferta)
        return this.httpClient.put<Ofertas>(this.API_URL+"/actualizar-oferta", oferta, {observe: 'response', headers:this.headers});
    }

    public listarOfertas(): Observable<HttpResponse<OfertasDate[]>> {
        return this.httpClient.get<OfertasDate[]>(this.API_URL + "/cargar-ofertas", {observe: 'response', headers:this.headers});
    }

    public listarOfertasFechas(fechaA : String,fechaB : String): Observable<HttpResponse<OfertasDate[]>> {
        return this.httpClient.get<OfertasDate[]>(this.API_URL + "/cargar-ofertas-fecha?fechaA="+fechaA+"&fechaB="+fechaB, {observe: 'response', headers:this.headers});
    }

    public listarOfertasPostulacion(): Observable<HttpResponse<OfertasDate[]>> {
        return this.httpClient.get<OfertasDate[]>(this.API_URL + "/cargar-ofertas-postulantes", {observe: 'response', headers:this.headers});
    }

    public listarOferta(codigo:number): Observable<HttpResponse<Ofertas>> {
        return this.httpClient.get<Ofertas>(this.API_URL + "/listar-oferta?codigo="+codigo, {observe: 'response', headers:this.headers});
    }

    public listarPostulantes(codigo:number ): Observable<HttpResponse<Postulante[]>> {
        return this.httpClient.post<Postulante[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/cargar-postulantes?codigo="+codigo,null, {observe: 'response', headers:this.headers});
    }

    public listarPostulante(codigo:number, oferta:number): Observable<HttpResponse<DatosPostulante>> {
        return this.httpClient.post<DatosPostulante>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/obtener-postulante?codigo="+codigo+"&oferta="+oferta ,null, {observe: 'response', headers:this.headers});
    }

    public listarPdf(codigo:number) {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-servlet/listar-curriculum?codigo="+codigo,{ responseType: "arraybuffer", observe: 'response', headers:this.headers });
    }

    public generarEntrevista( datosEntrevista:DatosEntrevista, codigo : number, oferta: number): Observable<HttpResponse<DatosEntrevista>> {
        return this.httpClient.post<DatosEntrevista>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/generar-entrevista?codigo="+codigo+"&oferta="+oferta,datosEntrevista, {observe: 'response', headers:this.headers});
    }

    public descargarOfertasCostos() {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-servlet/ofertas-costos", { responseType: 'blob' , observe: 'response', headers:this.headers});
    }

    public crearTelefonosUsuario(telefonos : TelefonoUsuario[]){
        return this.httpClient.post(this.API_URL+"/crear-telefonos-usuario",telefonos,{observe: 'response', headers:this.headers});
    }

    public actualizarUsuario(usuario : CrearUsuario){
        return this.httpClient.put(this.API_URL+"/actualizar-usuario",usuario,{observe: 'response', headers:this.headers});
    }

    public actualizarTelefono( telefonos:NumTelefono[]){
        return this.httpClient.put(this.API_URL+"/actualizar-telefonos", telefonos, {observe: 'response', headers:this.headers});
        
    }public listarUsuarioEspecifico(): Observable<HttpResponse<UsuarioT>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<UsuarioT>(this.API_URL+"/listar-usuario-especifico", {observe: 'response', headers});
    }

    public listarTelefonosEspecifico(): Observable<HttpResponse<NumTelefono[]>> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<NumTelefono[]>(this.API_URL+"//listar-telefonos-usuario-especifico", {observe: 'response', headers});
    }

    public descargarEntrevistaFecha(fecha:String, estado:String) {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-servlet/entrevista-fecha-especifica?fecha="+fecha+"&estado="+estado, { responseType: 'blob' , observe: 'response', headers:this.headers});
    }
    
    public descargarEntrevistaEstado(fechaA:String,fechaB:String, estado:String) {
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-servlet/entrevista-fecha-estado?fechaA="+fechaA+"&fechaB="+fechaB+"&estado="+estado, { responseType: 'blob',observe: 'response',  headers:this.headers });
    }

    public listarEstados(): Observable<HttpResponse<Estados[]>> {
        return this.httpClient.get<Estados[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-estados", {observe: 'response', headers:this.headers});
    }

    public listarOfertasCostos(): Observable<HttpResponse<OfertaCostos[]>> {
        return this.httpClient.get<OfertaCostos[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/ofertas-costos", {observe: 'response', headers:this.headers});
    }

    public listarEstadosOferta(): Observable<HttpResponse<Estados[]>> {
        return this.httpClient.get<Estados[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-estados-oferta", {observe: 'response', headers:this.headers});
    }

    public listarCategorias(): Observable<HttpResponse<Categoria[]>> {
        return this.httpClient.get<Categoria[]>(this.API_URL + "/listar-categorias", {observe: 'response', headers:this.headers});
    }

    public listarEntrevistas(): Observable<HttpResponse<EntrevistaInfo[]>> {
        return this.httpClient.get<EntrevistaInfo[]>( "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/cargar-entrevistas", {observe: 'response', headers:this.headers});
    }

    public listarModalidades(): Observable<HttpResponse<Modalidad[]>> {
        return this.httpClient.get<Modalidad[]>(this.API_URL + "/listar-modalidades", {observe: 'response', headers:this.headers});
    }

    public listarEntrevistaFecha(fecha : String,estado:String): Observable<HttpResponse<EntrevistaFecha[]>> {
        return this.httpClient.get<EntrevistaFecha[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-fechaEntrevista?fecha=" + fecha+"&estado="+ estado, {observe: 'response', headers:this.headers});
    }

    public listarOfertaFecha(fechaA : String,fechaB : String,estado:String): Observable<HttpResponse<Ofertas[]>> {
        return this.httpClient.get<Ofertas[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-fecha-Oferta?fechaA=" + fechaA+"&fechaB="+ fechaB+"&estado="+estado, {observe: 'response', headers:this.headers});
    }

    public finalizarEntrevista(entrevista : EntrevistaFinal): Observable<HttpResponse<EntrevistaFinal>> {
        return this.httpClient.put<EntrevistaFinal>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/finalizar-entrevista",entrevista, {observe: 'response', headers:this.headers});
    }

    public contratar(entrevista : EntrevistaFinal): Observable<HttpResponse<EntrevistaFinal>> {
        return this.httpClient.put<EntrevistaFinal>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-nomination-servlet/contratar",entrevista, {observe: 'response', headers:this.headers});
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
        if (pagina == 'perfil') {
            return 'empleador-editar-perfil';
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