import { Component, OnInit, Input, Output, EventEmitter,ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'dm-ninos',
	templateUrl: './dm-ninos.component.html',
	styleUrls: ['./dm-ninos.component.css']
})
export class DmNinosComponent implements OnInit, OnChanges {
	@Input('global') global: any;
	@Input() prop!:any;

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

	ngOnInit() {
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

	ngOnChanges(changes: SimpleChanges){
		if (this.global != undefined && this.global["Nino_DM"][0] != undefined) {
			this.form_guardar.patchValue(this.global["Nino_DM"][0]);	
		}else if(this.global == null && this.form_guardar != undefined){
			this.limpiar_form_guardar();
		}
	}

	get f2(){ return this.form_guardar.controls;}

	limpiar_form_guardar(){
		this.submitted2 =false;
		this.form_guardar.reset();
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