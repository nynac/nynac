import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'nucleo-familiar',
	templateUrl: './nucleo-familiar.component.html',
	styleUrls: ['./nucleo-familiar.component.css']
})
export class NucleoFamiliarComponent implements OnInit {
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
				this.form_guardar.get('idNinosNF').setValue(resultado['idNinosNF']);
				this.form_guardar.get('miembroID').setValue(resultado['miembroID']);
				
				this.form_guardar.get('restriccionlegal').setValue(resultado['restriccionlegal']);
				this.form_guardar.get('razonrestriccion').setValue(resultado['razonrestriccion']);
				this.form_guardar.get('padresituacion').setValue(resultado['padresituacion']);

				this.form_guardar.get('nombrepadre').setValue(resultado['nombrepadre']);
				this.form_guardar.get('edadpadre').setValue(resultado['edadpadre']);
				this.form_guardar.get('fechaylugarpadre').setValue(resultado['fechaylugarpadre']);
				this.form_guardar.get('nacionalidadpadre').setValue(resultado['nacionalidadpadre']);
				this.form_guardar.get('escolaridadpadre').setValue(resultado['escolaridadpadre']);
				this.form_guardar.get('ocupacionpadre').setValue(resultado['ocupacionpadre']);
				this.form_guardar.get('lugartrabajopadre').setValue(resultado['lugartrabajopadre']);
				this.form_guardar.get('telparticularpadre').setValue(resultado['telparticularpadre']);
				this.form_guardar.get('teltrabajopadre').setValue(resultado['teltrabajopadre']);
				this.form_guardar.get('celularpadre').setValue(resultado['celularpadre']);
				this.form_guardar.get('emailpadre').setValue(resultado['emailpadre']);

				this.form_guardar.get('nombremadre').setValue(resultado['nombremadre']);
				this.form_guardar.get('edadmadre').setValue(resultado['edadmadre']);
				this.form_guardar.get('fechaylugarmadre').setValue(resultado['fechaylugarmadre']);
				this.form_guardar.get('nacionalidadmadre').setValue(resultado['nacionalidadmadre']);
				this.form_guardar.get('escolaridadmadre').setValue(resultado['escolaridadmadre']);
				this.form_guardar.get('ocupacionmadre').setValue(resultado['ocupacionmadre']);
				this.form_guardar.get('lugartrabajomadre').setValue(resultado['lugartrabajomadre']);
				this.form_guardar.get('telparticularmadre').setValue(resultado['telparticularmadre']);
				this.form_guardar.get('teltrabajomadre').setValue(resultado['teltrabajomadre']);
				this.form_guardar.get('celularmadre').setValue(resultado['celularmadre']);
				this.form_guardar.get('emailmadre').setValue(resultado['emailmadre']);

				this.form_guardar.get('tutorsustituto').setValue(resultado['tutorsustituto']);
				this.form_guardar.get('edadtutor').setValue(resultado['edadtutor']);
				this.form_guardar.get('ocupaciontutor').setValue(resultado['ocupaciontutor']);
				this.form_guardar.get('teltutor').setValue(resultado['teltutor']);

				this.form_guardar.get('nucleofamiliarnombre1').setValue(resultado['nucleofamiliarnombre1']);
				this.form_guardar.get('nucleofamiliarnombre2').setValue(resultado['nucleofamiliarnombre2']);
				this.form_guardar.get('nucleofamiliarnombre3').setValue(resultado['nucleofamiliarnombre3']);
				this.form_guardar.get('nucleofamiliaredad1').setValue(resultado['nucleofamiliaredad1']);
				this.form_guardar.get('nucleofamiliaredad2').setValue(resultado['nucleofamiliaredad2']);
				this.form_guardar.get('nucleofamiliaredad3').setValue(resultado['nucleofamiliaredad3']);
				this.form_guardar.get('nucleofamiliargrado1').setValue(resultado['nucleofamiliargrado1']);
				this.form_guardar.get('nucleofamiliargrado2').setValue(resultado['nucleofamiliargrado2']);
				this.form_guardar.get('nucleofamiliargrado3').setValue(resultado['nucleofamiliargrado3']);

				this.form_guardar.get('desintegracionfamiliar').setValue(resultado['desintegracionfamiliar']);
				this.form_guardar.get('fallecimientos').setValue(resultado['fallecimientos']);
				this.form_guardar.get('nacimientos').setValue(resultado['nacimientos']);
				this.form_guardar.get('situacion_economica').setValue(resultado['situacion_economica']);
				this.form_guardar.get('cambiosrutina').setValue(resultado['cambiosrutina']);

				this.form_guardar.get('disciplica').setValue(resultado['disciplica']);
				this.form_guardar.get('juegos').setValue(resultado['juegos']);
				this.form_guardar.get('alacostarse').setValue(resultado['alacostarse']);
				this.form_guardar.get('horaalimentos').setValue(resultado['horaalimentos']);
				this.form_guardar.get('allevantarse').setValue(resultado['allevantarse']);
				this.form_guardar.get('horabano').setValue(resultado['horabano']);

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

/*



//Generando los módulos para el niño

guardar_DG(){
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
			spinner.removeAttribute("hidden");
			console.log("Creando ...");
			//this.nuevo();
		}

	}
}*/