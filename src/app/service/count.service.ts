import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})


export class CountService {
  constructor(private http: HttpClient) { }

  getCountServicios(): Observable<number> {
    return this.http.get<number>(API_URL + '/servicio/count', httpOptions);
  }

  getCountUsuarios(): Observable<number> {
    return this.http.get<number>(API_URL + '/usuario/count', httpOptions);
  }

  getCountTiposUsuario(): Observable<number> {
    return this.http.get<number>(API_URL + '/tipousuario/count', httpOptions);
  }

  getCountTiposServicio(): Observable<number> {
    return this.http.get<number>(API_URL + '/tiposervicio/count', httpOptions);
  }

  getCountCompras(): Observable<number> {
    return this.http.get<number>(API_URL + '/compra/count', httpOptions);
  }

  getCountFacturas(): Observable<number> {
    return this.http.get<number>(API_URL + '/factura/count', httpOptions);
  }

  getCountCarritos(): Observable<number> {
    return this.http.get<number>(API_URL + '/carrito/count', httpOptions);
  }

}
