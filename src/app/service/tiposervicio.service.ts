import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from 'src/environments/environment';
import { ITipoServicio, IPageTipoServicio, ITipoServicio2Send } from '../model/tiposervicio-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TiposervicioService {
  constructor(private http: HttpClient) { }

  sURL = API_URL + '/tiposervicio';

  getPage(
    rpp: number,
    page: number,
    filter: string,
    order: string,
    direction: string
  ): Observable<IPageTipoServicio> {
    let strUrl: string = '';
    if (filter) {
      strUrl += '&filter=' + filter;
    }
    if (order) {
      strUrl += '&sort=' + order + ',' + direction;
    }
    return this.http.get<IPageTipoServicio>(
      this.sURL + '/?page=' + (page - 1) + '&size=' + rpp + strUrl, httpOptions);
  }

  getOne(id: number): Observable<ITipoServicio> {
    return this.http.get<ITipoServicio>(this.sURL + '/' + id, httpOptions);
  }

  newOne(oTipoServicio: ITipoServicio2Send): Observable<ITipoServicio> {
    return this.http.post<ITipoServicio>(
      this.sURL + '/',
      oTipoServicio,
      httpOptions
    );
  }

  updateOne(oTipoServicio: ITipoServicio2Send): Observable<ITipoServicio> {
    return this.http.put<ITipoServicio>(
      this.sURL + '/',
      oTipoServicio,
      httpOptions
    );
  }

  removeOne(id: number): Observable<number> {
    return this.http.delete<number>(this.sURL + '/' + id, httpOptions);
  }
}
