import { IServicio } from './servicio-interfaces';
import { IUsuario } from './usuario-interfaces';

export interface ICarritoPlist {
  id: number;
  cantidad: number;
  precio: number;
  servicio: IServicio;
  usuario: IUsuario;
}

export interface ICarritoPage {
  content: ICarritoPlist[];
  totalElements: number;
  totalPages: number;
}

export interface ICarritoToSend {
  id: number;
  cantidad: number;
  precio: number;
  servicio: number;
  usuario: number;
}
