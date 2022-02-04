import { ServicioService } from '../../../../../service/servicio.service';
import { IPageServicio, IServicio } from 'src/app/model/servicio-interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PaginationService } from 'src/app/service/pagination.service';
import { IconService } from 'src/app/service/icon.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { debounceTime } from 'rxjs/operators';
import { ICarritoPage, ICarritoPlist } from 'src/app/model/carrito-interfaces';
import { CarritoService } from 'src/app/service/carrito.service';
import { BuiltinType } from '@angular/compiler';

@Component({
  selector: 'app-plist-carrito',
  templateUrl: './plist-carrito.component.html',
  styleUrls: ['./plist-carrito.component.css'],
})
export class PlistCarritoComponent implements OnInit {
  strEntity: string = 'carrito';
  strOperation: string = 'plist';
  strTitleSingular: string = 'Carrito';
  strTitlePlural: string = 'Carritos';
  aCarritos: ICarritoPlist[];
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;
  strResult: string = null;
  strFilter: string = '';
  strSortField: string = '';
  strSortDirection: string = '';
  strFilteredMessage: string = '';
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();
  id_servicio: number = null;
  id_usuario: number = null;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oCarritoService: CarritoService,

    public oIconService: IconService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem(
        'user',
        JSON.stringify(this.oRoute.snapshot.data.message)
      );
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
    this.id_servicio = this.oRoute.snapshot.params.idservicio;
    this.id_usuario = this.oRoute.snapshot.params.idusuario;

    if (this.id_servicio) {
      this.strFilteredMessage =
        'Listado filtrado por el servicio ' + this.id_servicio;
    } else if (this.id_usuario) {
      this.strFilteredMessage =
        'Listado filtrado por el usuario' + this.id_usuario;
    } else {
      this.strFilteredMessage = '';
    }

    this.nPage = 1;
    this.getPage();
  }

  comprar(){
    this.oCarritoService.buy().subscribe(() => {
      this.getPage();
    });
  }
  ngOnInit(): void {
    this.subjectFiltro$
      .pipe(debounceTime(1000))
      .subscribe(() => this.getPage());
  }

  getPage = () => {
    console.log('buscando...', this.strFilter);
    this.oCarritoService
      .getPage(
        this.nPageSize,
        this.nPage - 1,
        this.strFilter,
        this.strSortField,
        this.strSortDirection,
        this.id_servicio,
        this.id_usuario
      )
      .subscribe((oPage: ICarritoPage) => {
        if (this.strFilter) {
          this.strFilteredMessage = 'Listado filtrado: ' + this.strFilter;
        } else {
          this.strFilteredMessage = '';
        }
        this.aCarritos = oPage.content;
        this.nTotalElements = oPage.totalElements;
        this.nTotalPages = oPage.totalPages;
        this.aPaginationBar = this.oPaginationService.pagination(
          this.nTotalPages,
          this.nPage
        );
      });
  };

  jumpToPage = () => {
    this.getPage();
    return false;
  };
  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
  }

  doResetOrder() {
    this.strSortField = '';
    this.strSortDirection = '';
    this.getPage();
  }

  doSetOrder(order: string) {
    this.strSortField = order;
    if (this.strSortDirection == 'asc') {
      this.strSortDirection = 'desc';
    } else if (this.strSortDirection == 'desc') {
      this.strSortDirection = '';
    } else {
      this.strSortDirection = 'asc';
    }
    this.getPage();
  }
}
