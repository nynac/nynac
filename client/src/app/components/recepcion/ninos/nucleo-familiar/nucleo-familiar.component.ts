import { Component, OnInit, Input, Output, EventEmitter,ViewChild, OnChanges, SimpleChange} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'nucleo-familiar',
	templateUrl: './nucleo-familiar.component.html',
	styleUrls: ['./nucleo-familiar.component.css']
})
export class NucleoFamiliarComponent implements OnInit , OnChanges {
	
	@Input('var_global') var_global: any;
	@Input() prop!:number;


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
		this.form_buscar = this.formBuilder.group({
			miembroID: ['', Validators.required]
		})

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
	ngOnChanges(changes:SimpleChange)
	{
		console.log("Hola");
		this.form_buscar.get('miembroID').setValue(this.var_global);
 this.ng_busq_Form();
 console.log("negro");
	}

	get f(){ return this.form_buscar.controls;}
	get f2(){ return this.form_guardar.controls;}

	ng_busq_Form(){
		var spinner_buscar = document.getElementById("spinner_buscarNF");
		spinner_buscar.removeAttribute("hidden");

		this.submitted = true;

		if (this.form_buscar.invalid) {
			spinner_buscar.setAttribute("hidden", "true");
			return;
		}
		else{
			this.form_buscar.disable();

			var response = this.http.get(this.url + "Nino_NF/" + this.form_buscar.value.miembroID);
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

	limpiar_form_buscar(){
		this.submitted =false;
		this.form_buscar.reset();
	}
	limpiar_form_guardar(){
		this.submitted2 =false;
		this.form_guardar.reset();
	}

	guardar_NF(){
		this.submitted2 = true;
		var spinner = document.getElementById("spinner");

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