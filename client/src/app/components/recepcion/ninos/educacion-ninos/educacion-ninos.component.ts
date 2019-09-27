import { Component, OnInit, Input, Output, EventEmitter,ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'educacion-ninos',
	templateUrl: './educacion-ninos.component.html',
	styleUrls: ['./educacion-ninos.component.css']
})
export class EducacionNinosComponent implements OnInit, OnChanges {
	@Input('global') global: any;
	@Input() prop!:any;

	url = "https://api-remota.conveyor.cloud/api/";

	//form guardar
	form_guardar : FormGroup
	submitted2 = false;
	constructor(
		private http : HttpClient,
		private formBuilder: FormBuilder
		){}

	ngOnInit() {
		this.form_guardar = this.formBuilder.group({
			idNinosED : ['', Validators.required],
			miembroID : ['', Validators.required],

			promediogrados : [''],

			cicloeducacion1 : [''],
			cicloeducacion2 : [''],
			cicloeducacion3 : [''],
			escuelaeducacion1 : [''],
			escuelaeducacion2 : [''],
			escuelaeducacion3 : [''],
			gradoeducacion1 : [''],
			gradoeducacion2 : [''],
			gradoeducacion3 : [''],
			promedioinicioeducacion1 : [''],
			promedioinicioeducacion2 : [''],
			promedioinicioeducacion3 : [''],
			promediofinaleducacion1 : [''],
			promediofinaleducacion2 : [''],
			promediofinaleducacion3 : [''],

			mejorasignaturaeducacion1 : [''],
			mejorasignaturaeducacion2 : [''],
			mejorasignaturaeducacion3 : [''],
			mejorpromedioeducacion1 : [''],
			mejorpromedioeducacion2 : [''],
			mejorpromedioeducacion3 : [''],

			menorasignaturaeducacion1 : [''],
			menorasignaturaeducacion2 : [''],
			menorasignaturaeducacion3 : [''],
			menorpromedioeducacion1 : [''],
			menorpromedioeducacion2 : [''],
			menorpromedioeducacion3 : [''],

			leer : [''],
			palabraxminutoInicio : [''],
			nivellecturaInicio : [''],
			palabraxminutoFinal : [''],
			nivellecturaFinal : [''],

			nivelcomprencionInicio : [''],
			nivelcomprencionFinal : [''],

			escribir : [''],
			nivelescrituraFinal : [''],
			nivelescrituraInicio : [''],

			becas : [''],
			nombrebeca : [''],
			datoBecafecha1 : [''],
			datoBecafecha2 : [''],
			datoBecafecha3 : [''],
			datoBecaasignatura1 : [''],
			datoBecaasignatura2 : [''],
			datoBecaasignatura3 : [''],
			datoBecalugar1 : [''],
			datoBecalugar2 : [''],
			datoBecalugar3 : [''],

			espanol : [''],
			matematicas : [''],
			cienciasnaturales : [''],
			cienciassociales : [''],
			fisicomatematicas : [''],
			humanidades : [''],
			administracion : ['']
		})
	}


	ngOnChanges(changes: SimpleChanges){
		if (this.global != undefined) {
			this.form_guardar.patchValue(this.global["Nino_ED"][0]);	
		}else if(this.global == null && this.form_guardar != undefined){
			this.limpiar_form_guardar();
		}
	}

	get f2(){ return this.form_guardar.controls;}

	limpiar_form_guardar(){
		this.submitted2 =false;
		this.form_guardar.reset();
	}

	guardar_ED(){
		this.submitted2 = true;
		var spinner = document.getElementById("spinner_ED");
		
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

				this.http.put(this.url + "Nino_ED/" + this.form_guardar.value.miembroID, this.form_guardar.value).subscribe(data  => {
					alert("Se han guardado las modificaciones correctamente");
				
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