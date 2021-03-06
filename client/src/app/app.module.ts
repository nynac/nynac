import { NgModule } from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';

import { FullCalendarModule } from '@fullcalendar/angular';
import { ColorPickerModule } from 'ngx-color-picker';

import { NavbarComponent } from './components/recepcion/navbar/navbar.component';

/*COMPONENTES DEL NIÑO*/
import { DsNinosComponent } from './components/recepcion/ninos/ds-ninos/ds-ninos.component';
import { DatosGeneralesComponent } from './components/recepcion/ninos/datos-generales/datos-generales.component';
import { NucleoFamiliarComponent } from './components/recepcion/ninos/nucleo-familiar/nucleo-familiar.component';
import { DmNinosComponent } from './components/recepcion/ninos/dm-ninos/dm-ninos.component';
import { EducacionNinosComponent } from './components/recepcion/ninos/educacion-ninos/educacion-ninos.component';
import { ArteNinosComponent } from './components/recepcion/ninos/arte-ninos/arte-ninos.component';
import { DHNinosComponent } from './components/recepcion/ninos/dh-ninos/dh-ninos.component';
import { DeporteNinosComponent } from './components/recepcion/ninos/deporte-ninos/deporte-ninos.component';

// COMPONENTES DONACION 
import { DonacionDonanteComponent } from './components/donacion/donante/donacion-donante/donacion-donante.component';
import { NavbarDonanteComponent } from './components/donacion/navbar-donante/navbar-donante.component';
import { ContactoDonanteComponent } from './components/donacion/donante/contacto-donante/contacto-donante.component';
import { TelefonoDonanteComponent } from './components/donacion/donante/telefono-donante/telefono-donante.component';
import { FormaDonanteComponent } from './components/donacion/donante/forma-donante/forma-donante.component';
import { DireccionDonanteComponent } from './components/donacion/donante/direccion-donante/direccion-donante.component';
import { DFiscalesDonanteComponent } from './components/donacion/donante/dfiscales-donante/dfiscales-donante.component';
import { NotaDonanteComponent } from './components/donacion/donante/nota-donante/nota-donante.component';
import { BuscadorDonanteComponent } from './components/donacion/donante/buscador-donante/buscador-donante.component';
import { AportacionDonanteComponent } from './components/donacion/donante/aportacion-donante/aportacion-donante.component';
import { LiderCatalogoComponent } from './components/donacion/catalogo/lider-catalogo/lider-catalogo.component';

//AGENDA
import { AgendaComponent } from './components/donacion/agenda/agenda.component';
import { AgendaDHComponent } from './components/desarrollo_humano/agenda-dh/agenda-dh.component';
import { AgendaRecepcionComponent } from './components/recepcion/agenda-recepcion/agenda-recepcion.component';

//login
import { LoginComponent } from './Inisiosesion/login/login.component';   
import {MyserviceService} from './myservice.service'  

//REPORTE 
import { ReportesComponent } from './components/donacion/reportes/reportes.component';

//CONTENEDOR DONACION
import { ContenedorDonanteComponent } from './components/donacion/donante/contenedor-donante/contenedor-donante.component';
import { ContenedorCatalogoComponent } from './components/donacion/catalogo/contenedor-catalogo/contenedor-catalogo.component';

//COMPONENTES DONACION
import { EventoCatalogoComponent } from './components/donacion/catalogo/evento-catalogo/evento-catalogo.component';
import { CampanaCatalogoComponent } from './components/donacion/catalogo/campana-catalogo/campana-catalogo.component';

//COMPONENTES DE ENTRADAS
import { RegistroComponent } from './components/recepcion/entradas/registro/registro.component';
import { HistorialComponent } from './components/recepcion/entradas/historial/historial.component';

//CONTENEDORES DE RECEPCION
import { ContenedorNinosComponent } from './components/recepcion/ninos/contenedor-ninos/contenedor-ninos.component';
import { ContenedorEntradasComponent } from './components/recepcion/entradas/contenedor-entradas/contenedor-entradas.component';
import { ContenedorBuscadorComponent } from './components/recepcion/ninos/contenedor-buscador/contenedor-buscador.component';

//CONTENEDORES DESARROLLO HUMANO
import { ContenedorDHComponent } from './components/desarrollo_humano/contenedor-dh/contenedor-dh.component';

//COMPONENTES DESARROLLO HUMANO
import { NavbarDHComponent } from './components/desarrollo_humano/navbar-dh/navbar-dh.component';
import { CrearIncidenciaComponent } from './components/desarrollo_humano/crear-incidencia/crear-incidencia.component';
import { HistorialIncidenciasComponent } from './components/desarrollo_humano/historial-incidencias/historial-incidencias.component';

//autentificacion de token existente
import { AuthGuard } from '../app/auth.guard';
import { BloqueoComponent } from './Inisiosesion/bloqueo/bloqueo.component';

//COMPONENTES SERVICIO SOCIAL
import { NavbarServicioComponent } from './components/servicio_social/navbar-servicio/navbar-servicio.component';
import { AgregarMiembroComponent } from './components/servicio_social/agregar-miembro/agregar-miembro.component';
import { BuscarServicioComponent } from './components/servicio_social/buscar-servicio/buscar-servicio.component';
import { EntradasSalidasServComponent } from './components/servicio_social/entradas-salidas-serv/entradas-salidas-serv.component';
import { EntradasSalidasConfComponent } from './components/servicio_social/entradas-salidas-conf/entradas-salidas-conf.component';


//configuracion usuario
import { ConfigReporteComponent } from './components/reporte/config-reporte/config-reporte.component';
import { ConfigDHComponent } from './components/desarrollo_humano/config-dh/config-dh.component';
import { ConfigDonacionComponent } from './components/donacion/config-donacion/config-donacion.component';
import { ConfigRecepcionComponent } from './components/recepcion/config-recepcion/config-recepcion.component';
import { ConfigSSComponent } from './components/servicio_social/config-ss/config-ss.component';
import { ConfigAdminComponent } from './components/Admin/config-admin/config-admin.component';

//Reportes CO
import { NavbarCOComponent } from './components/reporte/navbar-co/navbar-co.component';
import { RpNinosComponent } from './components/reporte/rp-ninos/rp-ninos.component';
import { RpDonacionComponent } from './components/reporte/rp-donacion/rp-donacion.component';
import { RpSSComponent } from './components/reporte/rp-ss/rp-ss.component';
import { RpIncidenciaComponent } from './components/reporte/rp-incidencia/rp-incidencia.component';
import { ContenedorReporteComponent } from './components/reporte/contenedor-reporte/contenedor-reporte.component';
import { AgendaReporteComponent } from './components/reporte/agenda-reporte/agenda-reporte.component';

//servicio excel
import { ExcelService } from './excel.service';

//Admin Menu
import { NavbarAdminComponent } from './components/Admin/navbar-admin/navbar-admin.component';
import { AgendaAdminComponent } from './components/Admin/agenda-admin/agenda-admin.component';
import { NewuserAdminComponent } from './components/Admin/newuser-admin/newuser-admin.component';
import { ModifuserAdminComponent } from './components/Admin/modifuser-admin/modifuser-admin.component';
import { ContenedorAdminComponent } from './components/Admin/contenedor-admin/contenedor-admin.component';
import { InformeAdminComponent } from './components/Admin/informe-admin/informe-admin.component';

//RUTAS DEL PROYECTO
const appRoutes: Routes = [
  { path: 'recepcion/agregar-modificar', component: ContenedorNinosComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Recepcion','Administrador','Desarrollo Humano' ]} },
  { path: 'recepcion/entradas-salidas', component: ContenedorEntradasComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Recepcion','Administrador','Desarrollo Humano' ]} },
  { path: 'recepcion/buscar-niño', component: ContenedorBuscadorComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Recepcion','Administrador','Desarrollo Humano' ]} },
  { path: 'recepcion/agenda', component: AgendaRecepcionComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Recepcion','Administrador','Desarrollo Humano' ]} },
  { path: 'recepcion/config', component: ConfigRecepcionComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Recepcion','Administrador','Desarrollo Humano' ]} },

  { path: 'donacion', component: NavbarDonanteComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Institucional' ]} },
  { path: 'donacion/agregar-donante', component: ContenedorDonanteComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Institucional' ]} },
  { path: 'donacion/busqueda', component: BuscadorDonanteComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Institucional' ]} },
  { path: 'donacion/Otra-Aportacion', component: AportacionDonanteComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Institucional' ]} },
  { path: 'donacion/Catalogo', component: ContenedorCatalogoComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Institucional' ]} },
  { path: 'donacion/agenda', component: AgendaComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Institucional' ]} },
  { path: 'donacion/config', component: ConfigDonacionComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Institucional' ]} },
  { path: 'donacion/reporte', component: ReportesComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Institucional' ]} },

  { path: 'desarrollo_humano', component: ContenedorDHComponent ,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Humano','Recepcion']} },
  { path: 'desarrollo_humano/agenda', component: AgendaDHComponent ,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Humano','Recepcion']} },
  { path: 'desarrollo_humano/config', component: ConfigDHComponent ,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Humano','Recepcion']} },

  { path: 'coordinacion_operativa', component: ContenedorReporteComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Coordinacion Operativa']}},
  { path: 'coordinacion_operativa/agenda', component: AgendaReporteComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Coordinacion Operativa']}},
  { path: 'coordinacion_operativa/config', component: ConfigReporteComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Coordinacion Operativa']}},

  { path: 'login', component: LoginComponent },
  { path: 'bloqueo' ,   component :   BloqueoComponent ,   canActivate :   [ AuthGuard ] },
  
  { path: 'servicio_social', component: AgregarMiembroComponent ,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Humano' ]} },
  { path: 'servicio_social/nuevo', component: AgregarMiembroComponent ,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Humano' ]} },
  { path: 'servicio_social/buscar-modificar', component: BuscarServicioComponent ,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Humano' ]} },
  { path: 'servicio_social/entradas-salidas', component: EntradasSalidasServComponent },
  { path: 'servicio_social/entradas-salidas-config', component: EntradasSalidasConfComponent, canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Humano' ]} },
  { path: 'servicio_social/config', component: ConfigSSComponent ,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador','Desarrollo Humano' ]} },
  
  { path: '', component: ContenedorAdminComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador' ]}  },
  { path: 'admin/agenda', component: AgendaAdminComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador' ]}  },
  { path: 'admin/config', component: ConfigAdminComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador' ]}  },
  { path: 'admin/newUser', component: NewuserAdminComponent,canActivate : [ AuthGuard ], data: { roles:[ 'Administrador' ]}  },
];
//validar token
//canActivate : [ AuthGuard ]

//authentificate role
// data :   {   roles :   [ 'Admin' ]

@NgModule({
  declarations: [
    AppComponent,
    ContenedorNinosComponent,
    NavbarComponent,
    DsNinosComponent,
    DatosGeneralesComponent,
    NucleoFamiliarComponent,
    DmNinosComponent,
    EducacionNinosComponent,
    ArteNinosComponent,
    ContenedorEntradasComponent,
    RegistroComponent,
    HistorialComponent,
    ContenedorBuscadorComponent,
    DeporteNinosComponent,
    DHNinosComponent,
    DonacionDonanteComponent,
    NavbarDonanteComponent,
    ContenedorDonanteComponent,
    ContactoDonanteComponent,
    TelefonoDonanteComponent,
    FormaDonanteComponent,
    DireccionDonanteComponent,
    DFiscalesDonanteComponent,
    NotaDonanteComponent,
    BuscadorDonanteComponent,
    AportacionDonanteComponent,
    ContenedorCatalogoComponent,
    LiderCatalogoComponent,
    EventoCatalogoComponent,
    CampanaCatalogoComponent,
    AgendaComponent,
    ReportesComponent,
    NavbarDHComponent,
    ContenedorDHComponent,
    CrearIncidenciaComponent,
    HistorialIncidenciasComponent,
    AgregarMiembroComponent,
    NavbarServicioComponent,
    BuscarServicioComponent,
    EntradasSalidasServComponent,
    LoginComponent,
    BloqueoComponent,
    AgendaDHComponent,
    AgendaRecepcionComponent,
    NavbarCOComponent,
    RpNinosComponent,
    RpDonacionComponent,
    RpSSComponent,
    RpIncidenciaComponent,
    ContenedorReporteComponent,
    AgendaReporteComponent,
    EntradasSalidasConfComponent,
    ConfigReporteComponent,
    ConfigDHComponent,
    ConfigDonacionComponent,
    ConfigRecepcionComponent,
    ConfigSSComponent,
    NavbarAdminComponent,
    AgendaAdminComponent,
    ConfigAdminComponent,
    NewuserAdminComponent,
    ModifuserAdminComponent,
    ContenedorAdminComponent,
    InformeAdminComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    WebcamModule,
    FullCalendarModule,
    ColorPickerModule,
  ],
  providers: [
    MyserviceService,
    AuthGuard,
    ExcelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
