import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'contenedor-ninos',
	templateUrl: './contenedor-ninos.component.html',
	styleUrls: ['./contenedor-ninos.component.css']
})
export class ContenedorNinosComponent implements OnInit {
	
	mensaje: any;
	miembros: number = 33;
	url = "https://api-remota.conveyor.cloud/api/";

	constructor(private http : HttpClient) {
		
	}

	exampleMethodParent($event){
		this.miembros=$event;
	}

	ngOnInit() {
	}
}
