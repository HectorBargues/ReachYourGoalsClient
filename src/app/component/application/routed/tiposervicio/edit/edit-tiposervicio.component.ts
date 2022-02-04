import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { ITipoServicio, ITipoServicio2Send } from 'src/app/model/tiposervicio-interfaces';
import { TiposervicioService } from 'src/app/service/tiposervicio.service';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';


declare let $: any;

@Component({
  selector: 'app-edit-tiposervicio',
  templateUrl: './edit-tiposervicio.component.html',
  styleUrls: ['./edit-tiposervicio.component.css'],
})
export class EditTiposervicioComponent implements OnInit {

  strEntity: string = "tiposervicio"
  strOperation: string = "edit"
  strTitleSingular: string = "Tipo de servicio";
  strTitlePlural: string = "Tipos de servicio";
  oTipoServicio2Send: ITipoServicio2Send = null;
  oTipoServicio2Show: ITipoServicio = null;
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
    private oActivatedRoute: ActivatedRoute,
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

  getOne = (): void => {
    this.oTipoServicioService
      .getOne(this.id)
      .subscribe((oData: ITipoServicio) => {
        this.oTipoServicio2Show = oData;
        this.oForm = this.oFormBuilder.group({
          id: [this.oTipoServicio2Show.id],
          nombre: [
            this.oTipoServicio2Show.nombre,
            [Validators.required, Validators.minLength(5)],
          ],
        });
      });
  };

  onSubmit(): void {
    if (this.oForm) {
      this.oTipoServicio2Send = {
        id: this.oForm.value.id,
        nombre: this.oForm.value.nombre
      };
      this.update();
    }
  }

  update = (): void => {
    this.oTipoServicioService
      .updateOne(this.oTipoServicio2Send)
      .subscribe((oTipoServicio: ITipoServicio) => {
        if (oTipoServicio.id) {
          this.strResult = this.strTitleSingular + ' modificado correctamente';
        } else {
          this.strResult = this.strTitleSingular + ': error en la modificación del registro';
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
