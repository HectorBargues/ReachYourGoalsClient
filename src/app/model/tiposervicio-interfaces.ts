import { NumberSymbol } from "@angular/common";

export interface ITipoServicio {
    id: number,
    nombre: string,
    servicios: number
}

export interface ITipoServicio2Send {
    id: number,
    nombre: string
}

export interface IPageTipoServicio {
    content: ITipoServicio[];
    totalElements: number,
    totalPages: number
}