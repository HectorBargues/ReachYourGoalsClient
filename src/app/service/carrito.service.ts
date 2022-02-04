import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';
import {
  ICarritoPage,
  ICarritoPlist,
  ICarritoToSend,
} from '../model/carrito-interfaces';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  sURL = API_URL + '/carrito';

  constructor(private http: HttpClient) {}

  getOne(id: number): Observable<ICarritoPlist> {
    return this.http.get<ICarritoPlist>(this.sURL + '/' + id, httpOptions);
  }
  buy():Observable<number>{
    return this.http.put<number>(this.sURL + '/comprar',null, httpOptions);
  };
  getPage(
    rpp: number,
    page: number,
    filter: string,
    order: string,
    direction: string,
    idservicio: number,
    idusuario: number
  ): Observable<ICarritoPage> {
    let strOrderUrl: string = '';
    if (order) {
      strOrderUrl += '&sort=' + order + ',' + direction;
    }

    if (filter) {
      strOrderUrl += '&filter=' + filter;
    }
    if (idservicio) {
      strOrderUrl += '&idservicio=' + idservicio;
    } else if (idusuario) {
      strOrderUrl += '&idusuario=' + idusuario;
    }

    return this.http.get<ICarritoPage>(
      this.sURL + '?page=' + page + '&size=' + rpp + strOrderUrl,
      httpOptions
    );
  }

  newOne(oCarrito2Send: ICarritoToSend): Observable<ICarritoPlist> {
    return this.http.post<ICarritoPlist>(
      this.sURL + '/',
      oCarrito2Send,
      httpOptions
    );
  }

  updateOne(oCarritoPlist: ICarritoToSend): Observable<ICarritoPlist> {
    return this.http.put<ICarritoPlist>(
      this.sURL + '/',
      oCarritoPlist,
      httpOptions
    );
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + '/' + id, httpOptions);
  }

  count(): Observable<number> {
    return this.http.get<number>(this.sURL + '/count', httpOptions);
  }

}
