import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Componentes de materialize
import {MatButtonModule, MatProgressSpinnerModule} from '@angular/material';
import { ContenedorNinosComponent } from './components/contenedor-ninos/contenedor-ninos.component';
import { DatosGeneralesComponent } from './components/datos-generales/datos-generales.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenedorNinosComponent,
    DatosGeneralesComponent,
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
