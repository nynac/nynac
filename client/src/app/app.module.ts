import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {FormsModule} from '@angular/forms';

import { NavbarComponent } from './components/recepcion/navbar/navbar.component';

/*COMPONENTES DEL NIÑO*/
import { DsNinosComponent } from './components/recepcion/ninos/ds-ninos/ds-ninos.component';
import { DatosGeneralesComponent } from './components/recepcion/ninos/datos-generales/datos-generales.component';
import { NucleoFamiliarComponent } from './components/recepcion/ninos/nucleo-familiar/nucleo-familiar.component';
import { DmNinosComponent } from './components/recepcion/ninos/dm-ninos/dm-ninos.component';
import { EducacionNinosComponent } from './components/recepcion/ninos/educacion-ninos/educacion-ninos.component';
import { ArteNinosComponent } from './components/recepcion/ninos/arte-ninos/arte-ninos.component';



//COMPONENTES DE ENTRADAS
import { RegistroComponent } from './components/recepcion/entradas/registro/registro.component';
import { HistorialComponent } from './components/recepcion/entradas/historial/historial.component';

//CONTENEDORES DE RECEPCION
import { ContenedorNinosComponent } from './components/recepcion/ninos/contenedor-ninos/contenedor-ninos.component';
import { ContenedorEntradasComponent } from './components/recepcion/entradas/contenedor-entradas/contenedor-entradas.component';
import { ContenedorBuscadorComponent } from './components/recepcion/ninos/contenedor-buscador/contenedor-buscador.component';

//RUTAS DEL PROYECTO
const appRoutes: Routes = [
  { path: 'agregar-modificar', component: ContenedorNinosComponent },
  { path: 'entradas-salidas', component: ContenedorEntradasComponent },
  { path: 'buscar-niño', component: ContenedorBuscadorComponent }
];


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
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
