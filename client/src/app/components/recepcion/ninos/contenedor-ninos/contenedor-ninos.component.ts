import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'contenedor-ninos',
	templateUrl: './contenedor-ninos.component.html',
	styleUrls: ['./contenedor-ninos.component.css']
})
export class ContenedorNinosComponent implements OnInit {
	
	mensaje: any;
	url = "https://api-remota.conveyor.cloud/api/";

	constructor(private http : HttpClient) {
	}


	global: number = 33;

	asig_hijo_a_padre($event){
		this.global = $event;
	}

	ngOnInit() {
	}

	onClickMe(){
		this.global = 31;
		console.log("entró");
	}
}
