import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITipoServicio } from 'src/app/model/tiposervicio-interfaces';
import { Location } from '@angular/common';
import { IconService } from 'src/app/service/icon.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { CarritoService } from 'src/app/service/carrito.service';
import { ICarritoPlist } from 'src/app/model/carrito-interfaces';

@Component({
  selector: 'app-view-carrito',
  templateUrl: './view-carrito.component.html',
  styleUrls: ['./view-carrito.component.css'],
})
export class ViewCarritoComponent implements OnInit {
  strEntity: string = 'carrito';
  strOperation: string = 'view';
  strTitleSingular: string = 'Carrito';
  strTitlePlural: string = 'Carritos';
  id: number = 0;
  oCarritoPlist: ICarritoPlist;
  oUserSession: IUsuario;

  constructor(
    private oCarritoService: CarritoService,
    private oActivatedRoute: ActivatedRoute,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oLocation: Location,
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

  goBack() {
    this.oLocation.back();
  }
}
