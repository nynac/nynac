import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-contenedor-buscador',
	templateUrl: './contenedor-buscador.component.html',
	styleUrls: ['./contenedor-buscador.component.css']
})
export class ContenedorBuscadorComponent implements OnInit {
	url = "https://api-remota.conveyor.cloud/api/";

	//Todo para el alert
	visible : boolean = false;
	tipo : string = "";
	mensaje : string = "";
	duracion: number = 1500; //1000 es 1 SEG

	//Resultado
	resultado_info : any;

	//form guardar
	form_buscar : FormGroup
	buscando : boolean = false;
	submitted2 = false;

	constructor(
		private http : HttpClient,
		private formBuilder: FormBuilder
		){}

	ngOnInit() {
		this.form_buscar = this.formBuilder.group({
			campo_busqueda:[null, Validators.required],
		})
	}
	get f2(){ return this.form_buscar.controls;}

	obtener_datos(){
		if (this.form_buscar.invalid || this.buscando == true) {
			this.resultado_info = null;
			this.submitted2 = true;
			return;
		}
		this.buscando = true
		var response = this.http.get(this.url + "nino_por_nombre?nombre=" + this.form_buscar.value.campo_busqueda);
		response.subscribe((resultado : [])=> {
			this.resultado_info = resultado;

		},
		error =>{
		});
		this.buscando = false
	}

}
