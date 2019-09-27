import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
	selector: 'contenedor-ninos',
	templateUrl: './contenedor-ninos.component.html',
	styleUrls: ['./contenedor-ninos.component.css']
})
export class ContenedorNinosComponent implements OnInit {
	url = "https://api-remota.conveyor.cloud/api/";

	//Variables globales
	global: any = undefined;
	agregar_o_modificar: string = 'nuevo';

	//form buscar
	form_buscar : FormGroup;
	submitted = false;

	constructor(
		private http : HttpClient, 
		private formBuilder: FormBuilder
		) { }

	ngOnInit(){
		//Se rellena los campos al formulario 
		this.form_buscar = this.formBuilder.group({
			miembroID: ['', Validators.required]
		})
	}

	asig_hijo_a_padre($event){
		this.global = null;
	}

	radioChange(event: any){

		this.agregar_o_modificar = event.target.value;

		var eleccion = document.getElementById("btn_buscar");

		if (this.agregar_o_modificar == "nuevo"){
			this.limpiar_form_buscar();
			this.global = null;

			eleccion.setAttribute("disabled", "true");
		}
		else if(this.agregar_o_modificar == "modificar"){
			eleccion.removeAttribute("disabled");
			eleccion.setAttribute("enable", "true");

			this.limpiar_form_buscar();
			this.global = null;
		}
	}

	get f(){ return this.form_buscar.controls;}

	busq_Form(){
		var spinner_buscar = document.getElementById("spinner_buscar");
		spinner_buscar.removeAttribute("hidden");

		this.submitted = true;

		if (this.form_buscar.invalid) {
			spinner_buscar.setAttribute("hidden", "true");
			return;
		}
		else{
			this.form_buscar.disable();

			var response = this.http.get(this.url + "Miembro/" + this.form_buscar.value.miembroID);
			response.subscribe((resultado : any[])=> {
				this.global = resultado;
				
				spinner_buscar.setAttribute("hidden", "true");
				this.form_buscar.enable();
			},
			error =>{
				this.global = null;
				console.log("Error", error);
				alert("No se encontraron resultados");
				spinner_buscar.setAttribute("hidden", "true");
				this.form_buscar.enable();
			});
		}
	}

	limpiar_form_buscar(){
		this.submitted =false;
		this.form_buscar.reset();
	}
}
