import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IconService } from 'src/app/service/icon.service';
import { debounceTime } from 'rxjs/operators';
import { PaginationService } from 'src/app/service/pagination.service';
import { TiposervicioService } from 'src/app/service/tiposervicio.service';
import {
  IPageTipoServicio,
  ITipoServicio,
} from 'src/app/model/tiposervicio-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-tiposervicioplistunrouted',
  templateUrl: './tiposervicio-plist-unrouted.component.html',
  styleUrls: ['./tiposervicio-plist-unrouted.component.css'],
})
export class TipoServicioPlistUnroutedComponent implements OnInit {
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  //@ContentChild(TemplateRef) toolTemplate: TemplateRef<any>;

  strEntity: string = 'Tiposervicio';
  strOperation: string = 'plist';
  strTitleSingular: string = 'Tipo Servicio';
  strTitlePlural: string = 'Tipos Servicios';
  aPosts: ITipoServicio[];
  nTotalElements: number;
  totalPages: number;
  page: number;
  barraPaginacion: string[];
  pageSize: number = 10;
  id2ShowViewModal: number = 0;
  strUsuarioSession: string;
  strResult: string = null;
  strFilter: string = '';
  currentSortField: string = '';
  currentSortDirection: string = '';
  strFilteredMessage: string = '';
  subjectFiltro$ = new Subject();
  usuario: IUsuario;

  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oPostService: TiposervicioService,
    public oIconService: IconService,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    console.log(this.usuario);
  }

  ngOnInit(): void {
    this.subjectFiltro$
      .pipe(debounceTime(1000))
      .subscribe(() => this.getPage());
    this.page = 1;
    this.getPage();
  }

  getPage = () => {
    this.oPostService
      .getPage(
        this.pageSize,
        this.page,
        this.strFilter,
        this.currentSortField,
        this.currentSortDirection
      )
      .subscribe((oPage: IPageTipoServicio) => {
        if (this.strFilter) {
          this.strFilteredMessage = 'Listado filtrado por ' + this.strFilter;
        } else {
          this.strFilteredMessage = 'Listado NO filtrado';
        }
        this.aPosts = oPage.content;
        this.nTotalElements = oPage.totalElements;
        this.totalPages = oPage.totalPages;
        this.barraPaginacion = this.oPaginationService.pagination(
          this.totalPages,
          this.page
        );
        console.log(oPage);
      });
  };

  jumpToPage = () => {
    this.getPage();
    return false;
  };

  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
  }

  doFilter() {
    this.getPage();
  }

  doResetFilter() {
    this.strFilter = '';
    this.getPage();
  }

  doResetOrder() {
    this.currentSortField = '';
    this.currentSortDirection = '';
    this.getPage();
  }

  doSetOrder(order: string) {
    this.currentSortField = order;
    if (this.currentSortDirection == 'asc') {
      this.currentSortDirection = 'desc';
    } else if (this.currentSortDirection == 'desc') {
      this.currentSortDirection = '';
    } else {
      this.currentSortDirection = 'asc';
    }
    this.getPage();
  }

  onSelection(id: number) {
    console.log('selection plist emite ' + id);
    this.selection.emit(id);
  }
}
