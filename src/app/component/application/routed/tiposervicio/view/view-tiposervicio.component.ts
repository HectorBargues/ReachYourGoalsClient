import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITipoServicio } from 'src/app/model/tiposervicio-interfaces';
import { TiposervicioService } from 'src/app/service/tiposervicio.service';
import { Location } from '@angular/common';
import { IconService } from 'src/app/service/icon.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';

@Component({
  selector: 'app-view-tiposervicio',
  templateUrl: './view-tiposervicio.component.html',
  styleUrls: ['./view-tiposervicio.component.css'],
})
export class ViewTiposervicioComponent implements OnInit {

  strEntity: string = "tiposervicio"
  strOperation: string = "view"
  strTitleSingular: string = "Tipo de servicio";
  strTitlePlural: string = "Tipos de servicio";
  id: number = 0;
  oTipoServicio: ITipoServicio;
  oUserSession: IUsuario;

  constructor(
    private oTiposervicioService: TiposervicioService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
    public oIconService: IconService
  ) {
    if (this.oRoute.snapshot.data.message) {
      this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem("user", JSON.stringify(this.oRoute.snapshot.data.message));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }

    this.id = this.oActivatedRoute.snapshot.params.id;
    this.getOne();
  }

  ngOnInit(): void { }

  getOne = () => {
    this.oTiposervicioService
      .getOne(this.id)
      .subscribe((oData: ITipoServicio) => {
        this.oTipoServicio = oData;
      });
  };

  goBack() {
    this.oLocation.back();
  }
}
