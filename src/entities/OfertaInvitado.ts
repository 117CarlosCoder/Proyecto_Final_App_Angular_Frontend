export interface OfertaInvitado {
    codigo: number,
    nombre: String,
    descripcion: String,
    empresa: String,
    codigoEmpresa: number,
    categoria: number,
    estado: String,
    fechaPublicacion: Date | string,
    fechaLimite: Date | string,
    salario: String,
    modalidad: String,
    ubicacion: String,
    detalles: String,
    usuarioElegido: number
}