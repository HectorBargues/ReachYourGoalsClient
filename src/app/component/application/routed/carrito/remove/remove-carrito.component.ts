import { ITipoServicio } from '../../../../../model/tiposervicio-interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { ICarritoPlist } from 'src/app/model/carrito-interfaces';
import { CarritoService } from 'src/app/service/carrito.service';

@Component({
  selector: 'app-remove-carrito',
  templateUrl: './remove-carrito.component.html',
  styleUrls: ['./remove-carrito.component.css'],
})
export class RemoveCarritoComponent implements OnInit {
  strEntity: string = 'carrito';
  strOperation: string = 'view';
  strTitleSingular: string = 'Carrito';
  strTitlePlural: string = 'Carritos';
  id: number = 0;
  oCarritoPlist: ICarritoPlist;
  oUserSession: IUsuario;
  strResult: string = null;

  constructor(
    private oCarritoService: CarritoService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private _location: Location,
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

    this.id = this.oActivatedRoute.snapshot.params.id;
    this.getOne();
  }

  ngOnInit(): void {}

  getOne = () => {
    this.oCarritoService.getOne(this.id).subscribe((oData: ICarritoPlist) => {
      this.oCarritoPlist = oData;
    });
  };

  removeOne() {
    this.oCarritoService.removeOne(this.id).subscribe((data: number) => {
      if (data) {
        this.strResult =
          this.strTitleSingular +
          ' con ID=' +
          this.id +
          ' ha sido borrado con éxito';
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
    
  }
}
