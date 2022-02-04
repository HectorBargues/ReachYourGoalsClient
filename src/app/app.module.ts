import { PaginationService } from './service/pagination.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/shared/routed/login/login.component';
import { HomeComponent } from './component/shared/routed/home/home.component';
import { LogoutComponent } from './component/shared/routed/logout/logout.component';
import { MenuComponent } from './component/shared/unrouted/menu/menu.component';
import { SessionService } from './service/session.service';
import { HttpClientModule } from '@angular/common/http';
import { SessionResolver } from './resolve/session.resolve';
import { PostService } from './service/post.service';
import { TrimPipe } from './pipe/trim.pipe';
import { showDateTimePipe } from './pipe/showDateTime.pipe';
import { FooterComponent } from './component/shared/unrouted/footer/footer.component';
import { showBooleanPipe } from './pipe/showBoolean.pipe';
import { ModalComponent } from './component/shared/unrouted/modal/modal.component';
import { DateTimeService } from './service/datetime.service';
import { HeaderComponent } from './component/shared/unrouted/header/header.component';
import { TipousuarioPlistRoutedComponent } from './component/application/routed/tipousuario/plist/tipousuario-plist-routed.component';
import { TipousuarioEditRoutedComponent } from './component/application/routed/tipousuario/edit/tipousuario-edit-routed.component';
import { TipousuarioViewRoutedComponent } from './component/application/routed/tipousuario/view/tipousuario-view-routed.component';
import { PlistTiposervicioComponent } from './component/application/routed/tiposervicio/plist/tiposervicio-plist-routed.component';
import { NewTiposervicioComponent } from './component/application/routed/tiposervicio/new/new-tiposervicio.component';
import { EditTiposervicioComponent } from './component/application/routed/tiposervicio/edit/edit-tiposervicio.component';
import { RemoveTiposervicioComponent } from './component/application/routed/tiposervicio/remove/remove-tiposervicio.component';
import { ViewTiposervicioComponent } from './component/application/routed/tiposervicio/view/view-tiposervicio.component';
import { PlistServicioComponent } from './component/application/routed/servicio/plist/plist-servicio.component';
import { NewServicioComponent } from './component/application/routed/servicio/new/new-servicio.component';
import { EditServicioComponent } from './component/application/routed/servicio/edit/edit-servicio.component';
import { ServicioRemoveRoutedComponent } from './component/application/routed/servicio/remove/servicio-remove-routed.component';
import { ServicioViewRoutedComponent } from './component/application/routed/servicio/view/servicio-view-routed.component';
import { UsuarioPlistRoutedComponent } from './component/application/routed/usuario/plist/usuario-plist-routed.component';
import { UsuarioNewRoutedComponent } from './component/application/routed/usuario/new/usuario-new-routed.component';
import { UsuarioEditRoutedComponent } from './component/application/routed/usuario/edit/usuario-edit-routed.component';
import { UsuarioRemoveRoutedComponent } from './component/application/routed/usuario/remove/usuario-remove-routed.component';
import { UsuarioViewRoutedComponent } from './component/application/routed/usuario/view/usuario-view-routed.component';
import { PlistCarritoComponent } from './component/application/routed/carrito/plist/plist-carrito.component';
import { NewCarritoComponent } from './component/application/routed/carrito/new/new-carrito.component';
import { ViewCarritoComponent } from './component/application/routed/carrito/view/view-carrito.component';
import { RemoveCarritoComponent } from './component/application/routed/carrito/remove/remove-carrito.component';
import { EditCarritoComponent } from './component/application/routed/carrito/edit/edit-carrito.component';
import { PlistCompraComponent } from './component/application/routed/compra/plist/plist-compra.component';
import { NewCompraComponent } from './component/application/routed/compra/new/new-compra.component';
import { ViewCompraComponent } from './component/application/routed/compra/view/view-compra.component';
import { RemoveCompraComponent } from './component/application/routed/compra/remove/remove-compra.component';
import { EditCompraComponent } from './component/application/routed/compra/edit/edit-compra.component';
import { FacturaPlistRoutedComponent } from './component/application/routed/factura/plist/factura-plist-routed.component';
import { NewFacturaComponent } from './component/application/routed/factura/new/new-factura.component';
import { ViewFacturaComponent } from './component/application/routed/factura/view/view-factura.component';
import { RemoveFacturaComponent } from './component/application/routed/factura/remove/remove-factura.component';
import { EditFacturaComponent } from './component/application/routed/factura/edit/edit-factura.component';
import { CompraService } from './service/compra.service';
import { ServicioService } from './service/servicio.service';
import { CarritoService } from './service/carrito.service';
import { UsuarioService } from './service/usuario.service';
import { TipousuarioService } from './service/tipousuario.service';
import { TiposervicioService } from './service/tiposervicio.service';
import { FacturaService } from './service/factura.service';
import { IconService } from './service/icon.service';
import { GenerateComponent } from './component/shared/routed/generate/generate.component';
import { GenerateService } from './service/generate.service';
import { CountService } from './service/count.service';
import { ReportsComponent } from './component/shared/routed/reports/reports.component';
import { UsuarioPlistUnroutedComponent } from './component/application/unrouted/usuario/plist/usuario-plist-unrouted.component';
import { PopupComponent } from './component/shared/unrouted/popup/popup.component';
import { UsuarioViewUnroutedComponent } from './component/application/unrouted/usuario/view/usuario-view-unrouted.component';
import { FileService } from './service/file.service';
import { PrePrintComponent } from './component/shared/unrouted/preprint/preprint.component';
import { TipoServicioPlistUnroutedComponent } from './component/application/unrouted/tiposervicio/plist/tiposervicio-plist-unrouted.component';
import { ServicioPlistUnroutedComponent } from './component/application/unrouted/servicio/plist/servicio-plist-unrouted.component';

import { FacturaPlistUnroutedComponent } from './component/application/unrouted/factura/plist/factura-plist-unrouted.component';
import { TipousuarioPlistUnroutedComponent } from './component/application/unrouted/tipousuario/plist/tipousuario-plist-unrouted.component';
import { ServicioCPlistUnroutedComponent } from './component/application/unrouted/servicio/cplist/servicio-cplist-unrouted.component';

@NgModule({
  declarations: [
    AppComponent,
    // shared unrouted
    ModalComponent,
    PopupComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    PrePrintComponent,
    // shared routed
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    GenerateComponent,
    ReportsComponent,
    // pipes
    TrimPipe,
    showDateTimePipe,
    showBooleanPipe,
    // Tipousuario routed components
    TipousuarioPlistRoutedComponent,
    TipousuarioViewRoutedComponent,
    TipousuarioEditRoutedComponent,
    // Usuario routed components
    UsuarioPlistRoutedComponent,
    UsuarioViewRoutedComponent,
    UsuarioNewRoutedComponent,
    UsuarioEditRoutedComponent,
    UsuarioRemoveRoutedComponent,
    // Tiposervicio routed components
    PlistTiposervicioComponent,
    NewTiposervicioComponent,
    ViewTiposervicioComponent,
    EditTiposervicioComponent,
    RemoveTiposervicioComponent,
    // Servicio routed components
    PlistServicioComponent,
    ServicioViewRoutedComponent,
    NewServicioComponent,
    EditServicioComponent,
    ServicioRemoveRoutedComponent,
    // Compra routed components
    PlistCompraComponent,
    ViewCompraComponent,
    NewCompraComponent,
    EditCompraComponent,
    RemoveCompraComponent,
    // Factura routed components
    FacturaPlistRoutedComponent,
    ViewFacturaComponent,
    NewFacturaComponent,
    EditFacturaComponent,
    RemoveFacturaComponent,
    // Carrito routed components
    PlistCarritoComponent,
    NewCarritoComponent,
    ViewCarritoComponent,
    RemoveCarritoComponent,
    EditCarritoComponent,
    // Usuario unrouted components
    UsuarioPlistUnroutedComponent,
    UsuarioViewUnroutedComponent,

    // TipoServicio unrouted components
    TipoServicioPlistUnroutedComponent,

    // Servicio unrouted components
    ServicioPlistUnroutedComponent,

    // Factura unrouted components
    FacturaPlistUnroutedComponent,

    // TipoUsuario unrouted components
    TipousuarioPlistUnroutedComponent,

    ServicioCPlistUnroutedComponent,
  ],
  imports:[ 

    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SessionService,
    SessionResolver,
    PostService,
    PaginationService,
    DateTimeService,
    CompraService,
    FacturaService,
    ServicioService,
    TiposervicioService,
    UsuarioService,
    TipousuarioService,
    CarritoService,
    IconService,
    GenerateService,
    CountService,
    FileService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
