import { Component, OnInit,Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'contenedor-ninos',
	templateUrl: './contenedor-ninos.component.html',
	styleUrls: ['./contenedor-ninos.component.css']
})
export class ContenedorNinosComponent implements OnInit {
	
	mensaje: any;
	variablex: number=2;
	var_global: number = 25;
	url = "https://api-remota.conveyor.cloud/api/";

	constructor(private http : HttpClient) {
		
	}

	asignacion_valor_variables_padre($event){
		this.var_global=$event;
	}

	papu(){
		this.var_global=31;
	}
	nopasa(){
		this.variablex=50;
		console.log("Noooo el carbon nos quemaaaa");
	}

	ngOnInit() {
	}
}
