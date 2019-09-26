import { Component, OnInit, Input, Output, EventEmitter,ViewChild, OnChanges, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'deporte-ninos',
	templateUrl: './deporte-ninos.component.html',
	styleUrls: ['./deporte-ninos.component.css']
})
export class DeporteNinosComponent implements OnInit, OnChanges {
	
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

	mostrar(){
		console.log(this.var_global);
	}

	ngOnInit() {
		this.form_buscar = this.formBuilder.group({
			miembroID: ['', Validators.required]
		})

		this.form_guardar = this.formBuilder.group({
			idNinosDep : ['', Validators.required],
			miembroID : ['', Validators.required],
			
			edaddeporte1 : [''],
			edaddeporte2 : [''],
			edaddeporte3 : [''],
			ciclodeporte1 : [''],
			ciclodeporte2 : [''],
			ciclodeporte3 : [''],
			estaturadeporte1 : [''],
			estaturadeporte2 : [''],
			estaturadeporte3 : [''],
			pesodeporte1 : [''],
			pesodeporte2 : [''],
			pesodeporte3 : [''],
			imcdeporte1 : [''],
			imcdeporte2 : [''],
			imcdeporte3 : [''],

			actividaddeportiva : [''],
			box : [''],
			atletismo : [''],
			basquetbol : [''],
			volibol : [''],
			animaciondeportiva : [''],
			beisbol : [''],
			gimnasia : [''],
			artesmarciales : [''],
			futbol : [''],
			otro : [''],

			equipo : [''],
			problemaejercicio : [''],
			fechapremiodeporte1 : [''],
			fechapremiodeporte2 : [''],
			fechapremiodeporte3 : [''],
			diciplinapremiodeporte1 : [''],
			diciplinapremiodeporte2 : [''],
			diciplinapremiodeporte3 : [''],
			lugarpremiodeporte1 : [''],
			lugarpremiodeporte2 : [''],
			lugarpremiodeporte3 : ['']

		})
	}
	ngOnChanges(changes:SimpleChange)
	{
		console.log("Hola");
		this.form_buscar.get('miembroID').setValue(this.var_global);
 this.dep_busq_Form();
 console.log("negro");
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

	dep_busq_Form(){

		var spinner_buscar = document.getElementById("spinner_buscarDEP");
		spinner_buscar.removeAttribute("hidden");

		this.submitted = true;

		if (this.form_buscar.invalid) {
			spinner_buscar.setAttribute("hidden", "true");
			return;
		}
		else{
			this.form_buscar.disable();

			var response = this.http.get(this.url + "Nino_Dep/" + this.form_buscar.value.miembroID);
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

	guardar_DEP(){
		this.submitted2 = true;
		var spinner = document.getElementById("spinner_dep");
		
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

				this.http.put(this.url + "Nino_Dep/" + this.form_guardar.value.miembroID, this.form_guardar.value).subscribe(data  => {
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
