import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import {
  ICarritoPlist,
  ICarritoToSend,
} from 'src/app/model/carrito-interfaces';
import { CarritoService } from 'src/app/service/carrito.service';
import { ServicioService } from 'src/app/service/servicio.service';
import { IServicio } from 'src/app/model/servicio-interfaces';

declare let $: any;

@Component({
  selector: 'app-new-carrito',
  templateUrl: './new-carrito.component.html',
  styleUrls: ['./new-carrito.component.css'],
})
export class NewCarritoComponent implements OnInit {
  strEntity: string = 'carrito';
  strOperation: string = 'new';
  strTitleSingular: string = 'Carrito';
  strTitlePlural: string = 'Carritos';
  oCarritoToSend: ICarritoToSend = null;
  oCarritoPlist: ICarritoPlist = null;
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oUserSession: IUsuario;

  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oCarritoService: CarritoService,
    private oLocation: Location,
    public oIconService: IconService,
    private oServicioService: ServicioService,

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
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      cantidad: ['',],
      precio: ['', ],
      servicio: ['', ],
      usuario: ['', ],
    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oCarritoToSend = {
        id: this.oForm.value.id,
        cantidad: this.oForm.value.cantidad,
        precio: this.oForm.value.precio,
        servicio: this.oForm.value.servicio,
        usuario: this.oForm.value.usuario,
      };
      this.new();
    }
  }

  new = (): void => {
    this.oCarritoService
      .newOne(this.oCarritoToSend)
      .subscribe((oTipoServicio: ICarritoPlist) => {
        if (oTipoServicio.id) {
          this.id = oTipoServicio.id;
          this.strResult =
            this.strTitleSingular +
            ' creado correctamente con id=' +
            oTipoServicio.id;
        } else {
          this.strResult =
            this.strTitleSingular + ': error en la creación del registro';
        }
        this.openPopup();
      });
  };

  goBack(): void {
    this.oLocation.back();
  }

  //modal
  showingModalServicio: boolean = false;

  eventsSubjectShowModalServicio: Subject<void> = new Subject<void>();
  eventsSubjectHideModalServicio: Subject<void> = new Subject<void>();

  openModalServicio(): void {
    this.eventsSubjectShowModalServicio.next();
    this.showingModalServicio = true;
  }

  closeModalServicio(): void {
    this.eventsSubjectHideModalServicio.next();
    this.showingModalServicio = false;
  }

  onSelectionServicio($event: any) {
    console.log("edit evento recibido: " + $event)
    this.oForm.controls['servicio'].setValue($event);
  }

  onChangeServicio($event: any) {

    console.log("--->" + this.oForm.controls['servicio'].value);
    this.oForm.controls['servicio'].markAsDirty();

    //aqui cerrar la ventana emergente 
    if (this.showingModalServicio) {
      this.closeModalServicio();
    }

    //actualizar el usuario
    this.oServicioService
      .get(this.oForm.controls['servicio'].value)
      .subscribe((oData: IServicio) => {
        this.oCarritoPlist.servicio = oData;
        //this.oUsuario = oData;
      });

    return false;
  }


  //popup

  eventsSubjectShowPopup: Subject<void> = new Subject<void>();

  openPopup(): void {
    this.eventsSubjectShowPopup.next();
  }

  onClosePopup(): void {
   
  }
}
