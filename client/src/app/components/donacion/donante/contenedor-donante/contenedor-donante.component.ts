import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenedor-donante',
  templateUrl: './contenedor-donante.component.html',
  styleUrls: ['./contenedor-donante.component.css']
})
export class ContenedorDonanteComponent implements OnInit {

  gl_donante: number=undefined;
  constructor() { }

  ngOnInit() {
  }

  asignacion_valor_donante($event){
		this.gl_donante=$event;
  }

}
