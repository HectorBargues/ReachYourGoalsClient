import { I2Send } from "./model-interfaces";
import { ITipoServicio } from "./tiposervicio-interfaces";

export interface IFile {
    file: File
}
export interface IServicio {
    id: number,
    codigo: string,
    nombre: string,
    existencias: number,
    precio: number,
    imagen: number,
    tiposervicio: ITipoServicio,

    compras: number,
    carritos: number
}
export interface IServicio2Send {
    id: number,
    codigo: string,
    nombre: string,
    existencias: number,
    precio: number,
    imagen: number,    
    tiposervicio: I2Send
}

export interface IPageServicio {
    content: IServicio[];
    totalElements: number,
    totalPages: number
}
