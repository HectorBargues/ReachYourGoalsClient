import { ITipoServicio } from 'src/app/model/tiposervicio-interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/service/servicio.service';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';
import { IServicio, IServicio2Send } from 'src/app/model/servicio-interfaces';
import { IUsuario } from 'src/app/model/usuario-interfaces';
import { IconService } from 'src/app/service/icon.service';
import { FileService } from 'src/app/service/file.service';
declare let $: any;

@Component({
  selector: 'app-new-servicio',
  templateUrl: './new-servicio.component.html',
  styleUrls: ['./new-servicio.component.css'],
})
export class NewServicioComponent implements OnInit {
  strEntity: string = 'servicio';
  strOperation: string = 'new';
  strTitleSingular: string = 'Servicio';
  strTitlePlural: string = 'Servicios';
  oProduct2Send: IServicio2Send = null;
  oServshow: IServicio=null
  id: number = null;
  oForm: FormGroup = null;
  strResult: string = null;
  oTipoProd: ITipoServicio;
  oUserSession: IUsuario;
  OServ2Send: IServicio2Send= null;
  get f() {
    return this.oForm.controls;
  }

  constructor(
    private oFormBuilder: FormBuilder,
    private oRoute: ActivatedRoute,
    private oRouter: Router,
    private oServicioService: ServicioService,
    private oLocation: Location,
    public oIconService: IconService,
    private oFileService: FileService

  ) {
    if (this.oRoute.snapshot.data.message) {
     this.oUserSession = this.oRoute.snapshot.data.message;
      localStorage.setItem('user', JSON.stringify(this.oUserSession));
    } else {
      localStorage.clear();
      oRouter.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.oForm = this.oFormBuilder.group({
      codigo: ['', [Validators.required]],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      existencias: [''],
      precio: [''],
      imagen: [''],
      tiposervicio: ['', Validators.required],
    });
  }


  processFile($event: any) {
    const reader = new FileReader();

    if ($event.target.files && $event.target.files.length) {
      this.selectedFiles = $event.target.files;      
      if (this.selectedFiles) {
        this.file2Send = this.selectedFiles.item(0);
        this.selectedFile = this.file2Send.name;
        if (this.file2Send) {
          reader.readAsDataURL(this.file2Send);
          reader.onload = () => {
            this.imageSrc = reader.result as string;
            this.oForm.controls['imagen'].markAsDirty();
            //this.oForm.patchValue({
            //  imagen: reader.result
            //});

          };
        }
      }
    }
  }

  selectedFiles?: FileList;
  imageSrc: string = null;
  file2Send: File = null;
  selectedFile:string;



  // onSubmit(): void {
  //   if (this.oForm) {
  //     this.oProduct2Send = {
  //       id: null,
  //       codigo: this.oForm.value.codigo,
  //       nombre: this.oForm.value.nombre,
  //       descripcion: this.oForm.value.descripcion,
  //       existencias: this.oForm.value.existencias,
  //       precio: this.oForm.value.precio,
  //       imagen: this.oForm.value.imagen,
  //       tiposervicio: {
  //         id: this.oForm.value.tiposervicio,
  //       },
  //     };
  //     this.new();
  //   }
  // }

  onSubmit(): void {
  
    console.log("-->nombre: " , this.selectedFile);
    //const file: File = imageInput.files[0];
    //this.selectedFile = new ImageSnippet(  this.imageSrc , file);
    this.oFileService.uploadImage(this.file2Send).subscribe(
      (serverResponse) => {
        if (this.oForm) {
          this.OServ2Send = {
            id: null,
            codigo: this.oForm.value.codigo,
            nombre: this.oForm.value.nombre,
            descripcion: this.oForm.value.descripcion,
            existencias: this.oForm.value.existencias,
            precio: this.oForm.value.precio,
            imagen: serverResponse,
           
            tiposervicio: {
              id: this.oForm.value.tiposervicio,
            }
          }
          console.log(this.OServ2Send)
          this.oServicioService
            .newOne(this.OServ2Send)
            .subscribe((oPeces: IServicio) => {
              if (oPeces.id) {
                this.strResult = this.strTitleSingular + ' modificado correctamente';
              } else {
                this.strResult = this.strTitleSingular + ': error en la modificación del registro';
              }
              this.openPopup();
            });
        }
      },
      (err) => {
        this.strResult = this.strTitleSingular + 'Error al cambiar el registro: ' + err.error.message;
        console.log("Upload error:", err.error.message);
        this.openPopup();
      })

  }

  new = (): void => {
    this.oServicioService
      .newOne(this.oProduct2Send)
      .subscribe((oProduct: IServicio) => {
        console.log('dentro de new');
        if (oProduct.id) {
          this.id = oProduct.id;
          console.log('El servicio se ha creado correctamente');
          this.strResult = 'El servicio se ha creado correctamente';
        } else {
          this.strResult = 'Error en la creación del registro';
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
    
  }
}
