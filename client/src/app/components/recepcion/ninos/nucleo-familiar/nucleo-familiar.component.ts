import { Component, OnInit, Input, Output, EventEmitter,ViewChild,OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'nucleo-familiar',
	templateUrl: './nucleo-familiar.component.html',
	styleUrls: ['./nucleo-familiar.component.css']
})
export class NucleoFamiliarComponent implements OnInit, OnChanges{
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
			idNinosNF : ['', Validators.required],
			miembroID : ['', Validators.required],
			restriccionlegal : [''],
			razonrestriccion : [''],
			padresituacion : [''],
			nombrepadre : [''],
			edadpadre : [''],
			fechaylugarpadre : [''],
			nacionalidadpadre : [''],
			escolaridadpadre : [''],
			ocupacionpadre : [''],
			lugartrabajopadre : [''],
			telparticularpadre : [''],
			teltrabajopadre : [''],
			celularpadre : [''],
			emailpadre : [''],
			nombremadre : [''],
			edadmadre : [''],
			fechaylugarmadre : [''],
			nacionalidadmadre : [''],
			escolaridadmadre : [''],
			ocupacionmadre : [''],
			lugartrabajomadre : [''],
			telparticularmadre : [''],
			teltrabajomadre : [''],
			celularmadre : [''],
			emailmadre: [''],
			tutorsustituto : [''],
			edadtutor : [''],
			ocupaciontutor : [''],
			teltutor: [''],
			nucleofamiliarnombre1 : [''],
			nucleofamiliarnombre2 : [''],
			nucleofamiliarnombre3 : [''],
			nucleofamiliaredad1 : [''],
			nucleofamiliaredad2 : [''],
			nucleofamiliaredad3 : [''],
			nucleofamiliargrado1 : [''],
			nucleofamiliargrado2 : [''],
			nucleofamiliargrado3: [''],
			desintegracionfamiliar : [''],
			fallecimientos : [''],
			nacimientos : [''],
			situacion_economica : [''],
			cambiosrutina : [''],
			disciplica : [''],
			juegos : [''],
			alacostarse : [''],
			horaalimentos : [''],
			allevantarse : [''],
			horabano: [''],
		});
	}

	ngOnChanges(changes: SimpleChanges){
		if (this.global != undefined && this.global["Nino_NF"][0] != undefined) {
			this.form_guardar.patchValue(this.global["Nino_NF"][0]);	
		}else if(this.global == null && this.form_guardar != undefined){
			this.limpiar_form_guardar();
		}
	}

	get f2(){ return this.form_guardar.controls;}
	
	limpiar_form_guardar(){
		this.submitted2 =false;
		this.form_guardar.reset();
	}

	guardar_NF(){
		this.submitted2 = true;
		var spinner = document.getElementById("spinner_NF");

		if (this.form_guardar.invalid) {
			console.log("Formato incorrecto del formulario");
			spinner.setAttribute("hidden", "true");
			return;
		}
		else{

			var r = confirm("Estas seguro que deseas completar esta acción");
			if (r== false) {
				return;
			}else{
				this.form_guardar.disable();

				spinner.removeAttribute("hidden");
				console.log("Actualizando ...");

				this.http.put(this.url + "Nino_NF/" + this.form_guardar.value.miembroID, this.form_guardar.value).subscribe(data  => {
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