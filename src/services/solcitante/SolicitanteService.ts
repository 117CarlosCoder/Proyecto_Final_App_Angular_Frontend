import { Injectable } from "@angular/core";
import { Observable, filter } from "rxjs";
import { Informacion } from "src/entities/Informacion";
import { Categoria } from "src/entities/Categoria";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Ofertas } from "src/entities/Ofertas";
import { Mensaje } from "src/entities/Mesaje";
import { Tarjeta } from "src/entities/Tarjeta";
import { Postulacion } from "src/entities/Postulacion";
import { EntrevistaN } from "src/entities/EntrevistaN";
import { OfertaCostos } from "src/entities/OfertaCostos";
import { EntrevistaFecha } from "src/entities/EntrevistaFecha";
import { EntrevistaInfo } from "src/entities/EntrevistaInfo";
import { RegistroRetirada } from "src/entities/RegistroRetirada";
import { Salario } from "src/entities/Salario";
import { Ubicacion } from "src/entities/Ubicacion";
import { Filtros } from "src/entities/Filtros";
import { UsuarioService } from "../usuario/UsuarioService";
import { Modalidad } from "src/entities/Modalidad";
import { TelefonoUsuario } from "src/entities/TelefonoUsuario";
import { CrearUsuario } from "src/entities/CrearUsuario";
import { NumTelefono } from "src/entities/NumTelefono";
import { UsuarioT } from "src/entities/UsuarioT";
import { ActualizarContrasena } from "src/entities/ActualizarContrasena";
import { OfertaInvitado } from "src/entities/OfertaInvitado";

@Injectable({
    providedIn: 'root'
})
export class SolicitanteService {

    readonly API_URL = "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-servlet";
    headers !: HttpHeaders;

    constructor(private httpClient: HttpClient,
        private usuarioService : UsuarioService) {
    }

    public completarInformacion(informacion: Informacion): Observable<Informacion> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post<Informacion>(this.API_URL+"/completar-informacion", informacion, {headers:this.headers});
    }

    public crearRegitroRetirada(registro: RegistroRetirada) {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/resgistrar-retirada-postulacion", registro, {headers:this.headers});
    }

    public listarCategorias(): Observable<Categoria[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Categoria[]>(this.API_URL + "/listar-categorias", {headers:this.headers});
    }

    public listarOfertas(): Observable<Ofertas[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Ofertas[]>(this.API_URL + "/listar-ofertas", {headers:this.headers});
    }

    public listarOfertasCodigo(): Observable<Ofertas[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Ofertas[]>(this.API_URL + "/listar-ofertas-codigo", {headers:this.headers});
    }

    public listarPdf(codigo:number) {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-servlet/listar-curriculum?codigo="+codigo,{ responseType: "arraybuffer", observe: 'response', headers:this.headers });
    }

    public listarOfertasSugerencia(): Observable<Ofertas[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Ofertas[]>(this.API_URL + "/listar-ofertas-sugerencias", {headers:this.headers});
    }

    public listarOfertasNombre(filtros: Filtros): Observable<Ofertas[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post<Ofertas[]>(this.API_URL + "/buscar-empresa",filtros, {headers:this.headers});
    }

    public listarOfertasFiltros(listaFiltros:Filtros): Observable<Ofertas[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post<Ofertas[]>(this.API_URL + "/listar-ofertas-filtros", listaFiltros, {headers:this.headers});
    }

    public listarPostulaciones(): Observable<Postulacion[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Postulacion[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/listar-postulaciones", {headers:this.headers});
    }

    public crearTelefonosUsuario(telefonos : TelefonoUsuario[]){
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post(this.API_URL+"/crear-telefonos-usuario",telefonos,{observe: 'response', headers:this.headers});
    }

    public cambiarContrasena(contrasena : ActualizarContrasena){
        this.headers = new HttpHeaders({'Content-Type': 'application/json', ...this.usuarioService.getCredenciales()});
        return this.httpClient.post(this.API_URL+"/actualizar-contrasena",contrasena,{ observe: 'response', headers:this.headers});
    }

    public actualizarUsuario(usuario : CrearUsuario){
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.put(this.API_URL+"/actualizar-usuario",usuario,{observe: 'response', headers:this.headers});
    }

    public actualizarTelefono( telefonos:NumTelefono[]){
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.put(this.API_URL+"/actualizar-telefonos", telefonos, {headers:this.headers});
        
    }

    public crearNotificacion(mensaje: String, codigo: number){
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-servlet/crear-notificaciones?mensaje="+mensaje+"&codigo="+codigo,{observe: 'response', headers:this.headers});
    }

    public listarUsuarioEspecifico(): Observable<UsuarioT> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<UsuarioT>(this.API_URL+"/listar-usuario-especifico", {headers});
    }

    public listarTelefonosEspecifico(): Observable<NumTelefono[]> {
        const headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<NumTelefono[]>(this.API_URL+"//listar-telefonos-usuario-especifico", {headers});
    }

    public listarSalarios(): Observable<Salario[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Salario[]>(this.API_URL + "/listar-salarios", {headers:this.headers});
    }

    public listarUbicaciones(): Observable<Ubicacion[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Ubicacion[]>(this.API_URL + "/listar-ubicaciones", {headers:this.headers});
    }

    public descargarOfertasCostos() {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded//v1/employer-reports-servlet/ofertas-costos", { responseType: 'blob', headers: this.headers });
    }

    public listarOfertasCostos(): Observable<OfertaCostos[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<OfertaCostos[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/ofertas-costos", {headers:this.headers});
    }

    public listarEntrevistaFecha(fecha : Date): Observable<EntrevistaFecha[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<EntrevistaFecha[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/employer-reports-changer-servlet/listar-fechaEntrevista?fecha=" + fecha, {headers:this.headers});
    }

    public listarOferta(codigo:String, valor:boolean=true): Observable<Ofertas> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        console.log(valor)
        return this.httpClient.get<Ofertas>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/listar-oferta-postulacion?codigo="+codigo+"&valor="+valor, {headers:this.headers});
    }

    public listarOfertCodigo(codigo: number): Observable<OfertaInvitado> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<OfertaInvitado>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/listar-oferta-codigo?codigo="+codigo, {headers:this.headers});
    }

    public listarOfertaFecha(fechaA : String,fechaB : String,estado:String): Observable<Ofertas[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Ofertas[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-changer-servlet/ofertas-fecha?fechaA=" +fechaA+"&fechaB="+ fechaB+"&estado="+estado, {headers:this.headers});
    }

    public listarEntrevistasInfo(): Observable<EntrevistaInfo[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<EntrevistaInfo[]>( "http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-changer-servlet/listar-entrevistas-info", {headers:this.headers});
    }   

    public listarPostulacionesRetiradas(fechaA:String,fechaB: String): Observable<RegistroRetirada[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<RegistroRetirada[]>( "http://localhost:8080/Proyecto_Final_Servlet_war_exploded//v1/applicant-reports-changer-servlet/listar-postulaciones-retiradas?fechaA="+fechaA+"&fechaB="+fechaB, {headers:this.headers});
    }   

    public listarModalidades(): Observable<Modalidad[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<Modalidad[]>(this.API_URL + "/listar-modalidades", {headers:this.headers});
    }

    public listaEntrevista(): Observable<EntrevistaN[]> {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get<EntrevistaN[]>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-interview-servlet/listar-entrevistas", {headers:this.headers});
    }

    public elminarPostulacion(codigo:number) {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.delete<Postulacion>("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-nomination-servlet/eliminar-postulacion?codigo="+codigo, {headers:this.headers});
    }

    public enviaMensaje(mensaje : Mensaje):Observable<Mensaje>{
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post<Mensaje>(this.API_URL+"/aplicar-oferta",mensaje, {headers:this.headers});    
    } 

    public enviaTarjeta(tarjeta : Tarjeta):Observable<Tarjeta>{
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.post<Tarjeta>(this.API_URL+"/completar-informacion-tarjeta",tarjeta, {headers:this.headers});    
    } 

    public descargarOfertasSinEmpleo() {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-servlet/oferta-sin-obtener-empleo", { responseType: 'blob', headers:this.headers });
    }

    public descargarOfertasFaseSeleccion(fechaA : String,fechaB : String,estado:String) {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-servlet/oferta-fase-seleccion?fechaA=" +fechaA+"&fechaB="+ fechaB+"&estado="+estado, { responseType: 'blob', headers:this.headers });
    }

    public descargarOfertasEntrevista(fechaA : String,fechaB : String,estado:String) {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-servlet/oferta-fase-entrevista?fechaA=" +fechaA+"&fechaB="+ fechaB+"&estado="+estado, { responseType: 'blob', headers:this.headers });
    }

    public descargarPostulacioneRetiradas(fechaA : String,fechaB : String) {
        this.headers = new HttpHeaders(this.usuarioService.getCredenciales());
        return this.httpClient.get("http://localhost:8080/Proyecto_Final_Servlet_war_exploded/v1/applicant-reports-servlet/oferta-postulacion-retirada?fechaA=" +fechaA+"&fechaB="+ fechaB, { responseType: 'blob', headers:this.headers });
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