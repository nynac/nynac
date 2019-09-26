import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'dm-ninos',
	templateUrl: './dm-ninos.component.html',
	styleUrls: ['./dm-ninos.component.css']
})
export class DmNinosComponent implements OnInit {
	url = "https://api-remota.conveyor.cloud/api/";

	//form buscar
	form_buscar : FormGroup;
	submitted = false;

	//form guardar
	form_guardar : FormGroup
	submitted2 = false;
	constructor(
		private http : HttpClient,
		private formBuilder: FormBuilder
		){}

	@Input('var_global') var_global: any;
	
	ngOnInit() {
		this.form_buscar = this.formBuilder.group({
			miembroID: ['', Validators.required]
		})

		this.form_guardar = this.formBuilder.group({
			idNinosDM : ['', Validators.required],
			miembroID : ['', Validators.required],

			alergia : [''],
			medicamento : [''],
			cuidadoespecial : [''],

			rebeola : [''],
			varicela : [''],
			escarlatina : [''],
			hepatitis : [''],
			influenza : [''],
			tifoidea : [''],

			paperas : [''],
			tosferina : [''],
			otraenfermedad : [''],

			ataquesepilepticos : [''],
			enfermedadcronica : [''],
			accidentesgraves : [''],

			hasidooperado : [''],
			tipooperacion : [''],
			cantidadoperaciones : [''],
			fechaoperacion : [''],
			piojos : [''],
			frecpiojos : [''],

			problemahabla : [''],
			problemavista : [''],
			problemaoido : [''],
			problematonomuscular : [''],
			otroproblema : [''],

			aparatodental : [''],
			aparatoanteojos : [''],
			aparatoauditivo : [''],
			aparatoortopedico : [''],
			otroaparato : ['']
		})
	}

	get f(){ return this.form_buscar.controls;}
	get f2(){ return this.form_guardar.controls;}

	limpiar_form_buscar(){
		this.submitted =false;
		this.form_buscar.reset();
	}

	limpiar_form_guardar(){
		this.submitted2 =false;
		this.form_guardar.reset();
	}

	ng_busq_Form(){

		var spinner_buscar = document.getElementById("spinner_buscarDM");
		spinner_buscar.removeAttribute("hidden");

		this.submitted = true;

		if (this.form_buscar.invalid) {
			spinner_buscar.setAttribute("hidden", "true");
			return;
		}
		else{
			this.form_buscar.disable();

			var response = this.http.get(this.url + "Nino_DM/" + this.form_buscar.value.miembroID);
			response.subscribe((resultado : any[])=> {
				this.form_guardar.patchValue(resultado);
				spinner_buscar.setAttribute("hidden", "true");
				this.form_buscar.enable();
			},
			error =>{
				console.log("Error", error);
				alert("No se encontraron resultados");
				spinner_buscar.setAttribute("hidden", "true");
				this.form_buscar.enable();
			});
		}
	}

	guardar_DM(){
		this.submitted2 = true;
		var spinner = document.getElementById("DM_spinner");
		
		if (this.form_guardar.invalid) {
			console.log("Formato incorrecto del formulario");
			spinner.setAttribute("hidden", "true");
			return;
		}
		else{

			var r = confirm("¿Deseas continuar?");
			if (r== false) {
				return;
			}else{
				this.form_guardar.disable();

				spinner.removeAttribute("hidden");
				console.log("Actualizando ...");

				this.http.put(this.url + "Nino_DM/" + this.form_guardar.value.miembroID, this.form_guardar.value).subscribe(data  => {
					alert("Se han guardado las modificaciones correctamente");
					this.limpiar_form_guardar();
					this.limpiar_form_buscar();

					spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();
				},
				error  => {
					console.log(error);
					spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();
				});
			}

		}
	}
}