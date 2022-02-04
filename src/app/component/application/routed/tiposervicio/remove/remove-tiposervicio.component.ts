import { ITipoServicio } from '../../../../../model/tiposervicio-interfaces';
import { Component, OnInit } from '@angular/core';
import { TiposervicioService } from 'src/app/service/tiposervicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';

@Component({
  selector: 'app-remove-tiposervicio',
  templateUrl: './remove-tiposervicio.component.html',
  styleUrls: ['./remove-tiposervicio.component.css'],
})
export class RemoveTiposervicioComponent implements OnInit {

  strEntity: string = "tiposervicio"
  strOperation: string = "view"
  strTitleSingular: string = "Tipo de servicio";
  strTitlePlural: string = "Tipos de servicio";
  id: number = 0;
  oTipoServicio: ITipoServicio;
  oUserSession: IUsuario;
  strResult: string = null;

  constructor(
    private oTiposervicioService: TiposervicioService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private _location: Location,
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

  removeOne() {
    this.oTiposervicioService.removeOne(this.id).subscribe((data: number) => {
      if (data) {
        this.strResult = this.strTitleSingular + ' con ID=' + this.id + ' ha sido borrado con éxito';
      } else {
        this.strResult = 'Error en el borrado de ' + this.strTitleSingular;
      }
      this.openPopup();
    });
  }

  goBack() {
    this._location.back();
  }

  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
    this.oRouter.navigate([this.strEntity + '/view/' + this.id]);
  }
}
