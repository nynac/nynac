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
			idNinosDG : ['', Validators.required],
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
			emailmadr: [''],
			tutorsustituto : [''],
			edadtutor : [''],
			ocupaciontutor : [''],
			teltuto: [''],
			nucleofamiliarnombre1 : [''],
			nucleofamiliarnombre2 : [''],
			nucleofamiliarnombre3 : [''],
			nucleofamiliaredad1 : [''],
			nucleofamiliaredad2 : [''],
			nucleofamiliaredad3 : [''],
			nucleofamiliargrado1 : [''],
			nucleofamiliargrado2 : [''],
			nucleofamiliargrado: [''],
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
			horaban: [''],
		});
	}
	get f(){ return this.form_buscar.controls;}
	get f2(){ return this.form_guardar.controls;}

	ng_busq_Form_prueba(){
		var spinner_buscar = document.getElementById("spinner_buscar");
		spinner_buscar.removeAttribute("hidden");

		this.submitted = true;

		if (this.form_buscar.invalid) {
			spinner_buscar.setAttribute("hidden", "true");
			return;
		}
		else{

			var response = this.http.get(this.url + "miembroes/" + this.form_buscar.value.miembroID);
			response.subscribe((resultado : any[])=> {
				this.form_guardar.get('idNinosNF').setValue(resultado['Nino_DG'][0].idNinosNF);
				this.form_guardar.get('miembroID').setValue(resultado['Nino_DG'][0].miembroID);
				
				this.form_guardar.get('restriccionlegal').setValue(resultado['Nino_DG'][0].restriccionlegal);
				this.form_guardar.get('razonrestriccion').setValue(resultado['Nino_DG'][0].razonrestriccion);
				this.form_guardar.get('padresituacion').setValue(resultado['Nino_DG'][0].padresituacion);

				this.form_guardar.get('nombrepadre').setValue(resultado['Nino_DG'][0].nombrepadre);
				this.form_guardar.get('edadpadre').setValue(resultado['edadpadre']);
				this.form_guardar.get('fechaylugarpadre').setValue(resultado['Nino_DG'][0].fechaylugarpadre);
				this.form_guardar.get('nacionalidadpadre').setValue(resultado['Nino_DG'][0].nacionalidadpadre);
				this.form_guardar.get('escolaridadpadre').setValue(resultado['Nino_DG'][0].escolaridadpadre);
				this.form_guardar.get('ocupacionpadre').setValue(parseInt(resultado['Nino_DG'][0].ocupacionpadre));
				this.form_guardar.get('lugartrabajopadre').setValue(resultado['Nino_DG'][0].lugartrabajopadre);
				this.form_guardar.get('telparticularpadre').setValue(resultado['Nino_DG'][0].telparticularpadre);
				this.form_guardar.get('teltrabajopadre').setValue(resultado['Nino_DG'][0].teltrabajopadre);
				this.form_guardar.get('celularpadre').setValue(resultado['Nino_DG'][0].celularpadre);
				this.form_guardar.get('emailpadre').setValue(resultado['Nino_DG'][0].emailpadre);

				this.form_guardar.get('nombremadre').setValue(resultado['Nino_DG'][0].nombremadre);
				this.form_guardar.get('edadmadre').setValue(resultado['edadmadre']);
				this.form_guardar.get('fechaylugarmadre').setValue(resultado['Nino_DG'][0].fechaylugarmadre);
				this.form_guardar.get('nacionalidadmadre').setValue(resultado['Nino_DG'][0].nacionalidadmadre);
				this.form_guardar.get('escolaridadmadre').setValue(resultado['Nino_DG'][0].escolaridadmadre);
				this.form_guardar.get('ocupacionmadre').setValue(parseInt(resultado['Nino_DG'][0].ocupacionmadre));
				this.form_guardar.get('lugartrabajomadre').setValue(resultado['Nino_DG'][0].lugartrabajomadre);
				this.form_guardar.get('telparticularmadre').setValue(resultado['Nino_DG'][0].telparticularmadre);
				this.form_guardar.get('teltrabajomadre').setValue(resultado['Nino_DG'][0].teltrabajomadre);
				this.form_guardar.get('celularmadre').setValue(resultado['Nino_DG'][0].celularmadre);
				this.form_guardar.get('emailmadre').setValue(resultado['Nino_DG'][0].emailmadre);

				this.form_guardar.get('tutorsustituto').setValue(resultado['Nino_DG'][0].tutorsustituto);
				this.form_guardar.get('edadtutor').setValue(resultado['Nino_DG'][0].edadtutor);
				this.form_guardar.get('ocupaciontutor').setValue(resultado['Nino_DG'][0].ocupaciontutor);
				this.form_guardar.get('teltutor').setValue(resultado['Nino_DG'][0].teltutor);

				this.form_guardar.get('nucleofamiliarnombre1').setValue(resultado['Nino_DG'][0].nucleofamiliarnombre1);
				this.form_guardar.get('nucleofamiliarnombre2').setValue(resultado['Nino_DG'][0].nucleofamiliarnombre2);
				this.form_guardar.get('nucleofamiliarnombre3').setValue(resultado['Nino_DG'][0].nucleofamiliarnombre3);
				this.form_guardar.get('nucleofamiliaredad1').setValue(resultado['Nino_DG'][0].nucleofamiliaredad1);
				this.form_guardar.get('nucleofamiliaredad2').setValue(resultado['Nino_DG'][0].nucleofamiliaredad2);
				this.form_guardar.get('nucleofamiliaredad3').setValue(resultado['Nino_DG'][0].nucleofamiliaredad3);
				this.form_guardar.get('nucleofamiliargrado1').setValue(resultado['Nino_DG'][0].nucleofamiliargrado1);
				this.form_guardar.get('nucleofamiliargrado2').setValue(resultado['Nino_DG'][0].nucleofamiliargrado2);
				this.form_guardar.get('nucleofamiliargrado3').setValue(resultado['Nino_DG'][0].nucleofamiliargrado3);


				this.form_guardar.get('desintegracionfamiliar').setValue(resultado['Nino_DG'][0].desintegracionfamiliar);
				this.form_guardar.get('fallecimientos').setValue(resultado['Nino_DG'][0].fallecimientos);
				this.form_guardar.get('nacimientos').setValue(resultado['Nino_DG'][0].nacimientos);
				this.form_guardar.get('situacion_economica').setValue(resultado['Nino_DG'][0].situacion_economica);
				this.form_guardar.get('cambiosrutina').setValue(resultado['Nino_DG'][0].cambiosrutina);

				this.form_guardar.get('disciplica').setValue(resultado['Nino_DG'][0].disciplica);
				this.form_guardar.get('juegos').setValue(resultado['Nino_DG'][0].juegos);
				this.form_guardar.get('alacostarse').setValue(resultado['Nino_DG'][0].alacostarse);
				this.form_guardar.get('horaalimentos').setValue(resultado['Nino_DG'][0].horaalimentos);
				this.form_guardar.get('allevantarse').setValue(resultado['Nino_DG'][0].allevantarse);
				this.form_guardar.get('horabano').setValue(resultado['Nino_DG'][0].horabano);

				spinner_buscar.setAttribute("hidden", "true");
			},
			error =>{
				console.log("Error", error);
				alert("No se encontraron resultados");
				spinner_buscar.setAttribute("hidden", "true");
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
			}
			
			
			spinner.removeAttribute("hidden");

			if (this.agregar_o_modificar == "nuevo"){
				console.log("Creando ...");
				this.nuevo();
			}
			else if (this.agregar_o_modificar == "modificar"){
				console.log("Modificando ...");
				this.modificar();
			}
			else{
				console.log("se fue a ninguno")
			}
		}
	}
}
