import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { ITipoServicio, ITipoServicio2Send } from 'src/app/model/tiposervicio-interfaces';
import { TiposervicioService } from 'src/app/service/tiposervicio.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';

declare let $: any;

@Component({
  selector: 'app-new-tiposervicio',
  templateUrl: './new-tiposervicio.component.html',
  styleUrls: ['./new-tiposervicio.component.css'],
})

export class NewTiposervicioComponent implements OnInit {


  strEntity: string = "tiposervicio"
  strOperation: string = "new"
  strTitleSingular: string = "Tipo de servicio";
  strTitlePlural: string = "Tipos de servicio";
  oTipoServicio2Send: ITipoServicio2Send = null;
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
    private oTipoServicioService: TiposervicioService,
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
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit(): void {
    if (this.oForm) {
      this.oTipoServicio2Send = {
        id: null,
        nombre: this.oForm.value.nombre,
      
      };
      this.new();
    }
  }

  new = (): void => {
    this.oTipoServicioService
      .newOne(this.oTipoServicio2Send)
      .subscribe((oTipoServicio: ITipoServicio) => {
        if (oTipoServicio.id) {
          this.id = oTipoServicio.id;
          this.strResult = this.strTitleSingular + ' creado correctamente con id=' + oTipoServicio.id;
        } else {
          this.strResult = this.strTitleSingular + ': error en la creación del registro';
        }
        this.openPopup();
      });
  };

  goBack(): void {
    this.oLocation.back();
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
