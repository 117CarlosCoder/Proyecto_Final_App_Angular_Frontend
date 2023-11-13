import { Time } from "@angular/common";

export interface EntrevistaInfo {
    codigo:number,
    usuario: number,
    fecha: String,
    hora: Time,
    ubicacion: String,
    estado: String,
    notas: String,
    codigoOferta:number,
    nombre: String,
    nombreOferta: String
}