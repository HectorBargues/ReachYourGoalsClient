import { IFactura } from "./factura-interfaces";
import { I2Send, IFecha } from "./model-interfaces";
import { IServicio } from "./servicio-interfaces";

export interface IPageCompra {
    content: ICompra[];
    totalElements: number,
    totalPages: number
}

export interface ICompra {
    id: number,
    cantidad: number,
    precio: number,
    fecha: IFecha,
    servicio: IServicio,
    factura: IFactura

}

export interface ICompraToSend {
    id: number,
    cantidad: number,
    precio: number,
    fecha: string,
    servicio: I2Send,
    factura: I2Send

}