import { Component, OnInit, Input, Output, EventEmitter,ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'arte-ninos',
	templateUrl: './arte-ninos.component.html',
	styleUrls: ['./arte-ninos.component.css']
})
export class ArteNinosComponent implements OnInit, OnChanges {
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

	@Input('miembro') miembro: any;
	ngOnInit() {
		this.form_guardar = this.formBuilder.group({
			idNinosArt : ['', Validators.required],
			miembroID : ['', Validators.required],
			actividadartistica : [''],
			actividadfecha1 : [''],
			actividadfecha2 : [''],
			actividadfecha3 : [''],
			actividaddiciplina1 : [''],
			actividaddiciplina2 : [''],
			actividaddiciplina3 : [''],
			actividadlugar1 : [''],
			actividadlugar2 : [''],
			actividadlugar3 : [''],

			danza : [''],
			manualidades : [''],
			pintura : [''],
			teatro : [''],
			canto : [''],
			musica : [''],
			otro : [''],
			premioartefecha1 : [''],
			premioartefecha2 : [''],
			premioartefecha3 : [''],
			premioartediciplina1 : [''],
			premioartediciplina2 : [''],
			premioartediciplina3 : [''],
			premioartelugar1 : [''],
			premioartelugar2 : [''],
			premioartelugar3 : [''],
			hanotadoparticipar : [''],
			recibiopremio : ['']
		})
	}

	ngOnChanges(changes: SimpleChanges){
		if (this.global != undefined) {
			this.form_guardar.patchValue(this.global["Nino_Art"][0]);	
		}else if(this.global == null && this.form_guardar != undefined){
			this.limpiar_form_guardar();
		}
	}

	get f2(){ return this.form_guardar.controls;}

	limpiar_form_guardar(){
		this.submitted2 =false;
		this.form_guardar.reset();
	}

	guardar_ART(){
		this.submitted2 = true;
		var spinner = document.getElementById("spinner_art");
		
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

				this.http.put(this.url + "Nino_Art/" + this.form_guardar.value.miembroID, this.form_guardar.value).subscribe(data  => {
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
