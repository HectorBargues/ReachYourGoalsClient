import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IPageServicio, IServicio } from 'src/app/model/servicio-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { PostService } from 'src/app/service/post.service';
import { ServicioService } from 'src/app/service/servicio.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  @Input() id_tipousuario_session: number = null;
  @Input() id_tiposervicio: number = null;
  @Input() mode: boolean = true; //true=edición; false=selección
  @Output() selection = new EventEmitter<number>();
  @ContentChild(TemplateRef) toolTemplate: TemplateRef<any>;

  strEntity: string = "servicio"
  strOperation: string = "plist"
  strTitleSingular: string = "Servicio";
  strTitlePlural: string = "Servicios";
  aServicios: IServicio[];
  aPaginationBar: string[];
  nTotalElements: number;
  nTotalPages: number;
  nPage: number;
  nPageSize: number = 10;
  strResult: string = null;
  strFilter: string = "";
  strSortField: string = "";
  strSortDirection: string = "";
  strFilteredMessage: string = "";
  oUserSession: IUsuario;
  subjectFiltro$ = new Subject();
  barraPaginacion: string[];
  constructor(
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oPaginationService: PaginationService,
    private oServicioService: ServicioService,

    public oIconService: IconService
  ) { 
 
   
    this.id_tiposervicio = this.oRoute.snapshot.params.id_tiposervicio;
    if (this.id_tiposervicio) {
      this.strFilteredMessage = "Listado filtrado por el tipo de servicio " + this.id_tiposervicio;
    } else {
      this.strFilteredMessage = "";
    }

    this.nPage = 1;
    this.getPage();
  }

  ngOnInit(): void {
    this.subjectFiltro$.pipe(
      debounceTime(1000)
    ).subscribe(() => this.getPage());

  }
  addCarrito(id_servicio:number){

  }
  getPage = () => {
    console.log("buscando...", this.strFilter);
    this.oServicioService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection, this.id_tiposervicio).subscribe((oPage: IPageServicio) => {
      if (this.strFilter) {
        this.strFilteredMessage = "Listado filtrado: " + this.strFilter;
      } else {
        this.strFilteredMessage = "";
      }
      this.aServicios = oPage.content;
      this.nTotalElements = oPage.totalElements;
      this.nTotalPages = oPage.totalPages;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);
    })
  }
  filtrointensidad (id:number) {
    this.oServicioService.getPage(this.nPageSize, this.nPage, this.strFilter, this.strSortField, this.strSortDirection, id).subscribe((data:IPageServicio)=>{
      this.aServicios=data.content;
      this.nTotalPages = data.totalPages;
      this.nTotalElements = data.totalElements;
      this.aPaginationBar = this.oPaginationService.pagination(this.nTotalPages, this.nPage);
    })
  }


  jumpToPage = () => {
    this.getPage();
    return false;
  }
  onKeyUpFilter(event: KeyboardEvent): void {
    this.subjectFiltro$.next();
  }

  doResetOrder() {
    this.strSortField = "";
    this.strSortDirection = "";
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

  onSelection(id: number) {
    console.log("selection plist emite " + id);
    this.selection.emit(id);
  }
}
