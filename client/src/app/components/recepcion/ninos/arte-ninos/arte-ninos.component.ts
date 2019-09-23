import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'arte-ninos',
	templateUrl: './arte-ninos.component.html',
	styleUrls: ['./arte-ninos.component.css']
})
export class ArteNinosComponent implements OnInit {
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

	@Input('miembro') miembro: any;
	ngOnInit() {
		this.form_buscar = this.formBuilder.group({
			miembroID: ['', Validators.required]
		})

		this.form_guardar = this.formBuilder.group({
			idNinosArt : ['', Validators.required],
			miembroID : ['', Validators.required],
			
			actividadartistica : [''],
			hanotadoparticipar : [''],

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

			recibiopremio : [''],

			premioartefecha1 : [''],
			premioartefecha2 : [''],
			premioartefecha3 : [''],
			premioartediciplina1 : [''],
			premioartediciplina2 : [''],
			premioartediciplina3 : [''],
			premioartelugar1 : [''],
			premioartelugar2 : [''],
			premioartelugar3 : ['']

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

	art_busq_Form(){

		var spinner_buscar = document.getElementById("spinner_buscarART");
		spinner_buscar.removeAttribute("hidden");

		this.submitted = true;

		if (this.form_buscar.invalid) {
			spinner_buscar.setAttribute("hidden", "true");
			return;
		}
		else{
			this.form_buscar.disable();

			var response = this.http.get(this.url + "Nino_Art/" + this.form_buscar.value.miembroID);
			response.subscribe((resultado : any[])=> {
				console.log(resultado)
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
