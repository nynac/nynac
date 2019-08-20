import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Componentes de materialize
import {MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import { ContenedorNinosComponent } from './components/contenedor-ninos/contenedor-ninos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DsNinosComponent } from './components/ds-ninos/ds-ninos.component';
import { DatosGeneralesComponent } from './components/datos-generales/datos-generales.component';
import { NucleoFamiliarComponent } from './components/nucleo-familiar/nucleo-familiar.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenedorNinosComponent,
    NavbarComponent,
    DsNinosComponent,
    DatosGeneralesComponent,
    NucleoFamiliarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
