import { Component, OnInit, Input, Output, EventEmitter,ViewChild,OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'crear-incidencia',
	templateUrl: './crear-incidencia.component.html',
	styleUrls: ['./crear-incidencia.component.css']
})
export class CrearIncidenciaComponent implements OnInit {
	url = "https://api-remota.conveyor.cloud/api/";

	agregar_o_modificar: string = 'nuevo';

	//Todo para el alert
	visible : boolean = false;
	tipo : string = null;
	mensaje : string = null;
	guardando : boolean = false;

	//form guardar
	form_guardar : FormGroup
	submitted2 = false;

	//form buscar
	form_buscar : FormGroup;
	submitted = false;

	constructor(
		private http : HttpClient,
		private formBuilder: FormBuilder
		){}

	ngOnInit() {
		this.form_buscar = this.formBuilder.group({
			miembroID: ['', Validators.required]
		})

		this.form_guardar = this.formBuilder.group({
			no_incidencia:[''],
			quien_detecto	 : [''],
			area_actividad : [''],
			miembroID : [''], //del niño
			fecha_incidencia : [''],
			grupo : [''],
			con_hermanos_primos : [''],
			conducta_problema : [''],
			descripcion : [''],
			canaliza : [''],
			solucion : [''],
			nombres: [''],
			appaterno: [''],
			apmaterno: [''],
			nombres_guia: [''],
			appaterno_guia: [''],
			apmaterno_guia: ['']
		});
	}

	get f2(){ return this.form_guardar.controls;}
	
	limpiar_form_guardar(){
		this.form_guardar.reset();
	}

	buscar_nombres(miembroID: string): void {
		if (miembroID == "") 
			return;

		var response = this.http.get(this.url + "datos_nino_incidencia?id=" + miembroID);
		response.subscribe((resultado : any)=> {
			if (resultado == null) {
				this.form_guardar.reset();
			}
			this.form_guardar.get('nombres').setValue(resultado["nombres"]);
			this.form_guardar.get('appaterno').setValue(resultado["appaterno"]);
			this.form_guardar.get('apmaterno').setValue(resultado["apmaterno"]);
		},
		error =>{
			
		});
	}
	buscar_nombres_instructor(miembroID: string): void {
		if (miembroID == "") 
			return;

		var response = this.http.get(this.url + "datos_instructor_incidencia?id=" + miembroID);
		response.subscribe((resultado : any)=> {
			if (resultado == null) {
				this.form_guardar.reset();
			}
			this.form_guardar.get('nombres_guia').setValue(resultado["nombre"]);
			this.form_guardar.get('appaterno_guia').setValue(resultado["ap_paterno"]);
			this.form_guardar.get('apmaterno_guia').setValue(resultado["ap_materno"]);
		},
		error =>{
			
		});
	}

	limpiar_form_buscar(){
		this.submitted = false;
		this.form_buscar.reset();
	}

	radioChange(event: any){

		this.agregar_o_modificar = event.target.value;

		var eleccion = document.getElementById("btn_buscar");

		if (this.agregar_o_modificar == "nuevo"){
			this.limpiar_form_buscar();

			eleccion.setAttribute("disabled", "true");
		}
		else if(this.agregar_o_modificar == "modificar"){
			eleccion.removeAttribute("disabled");
			eleccion.setAttribute("enable", "true");

			this.limpiar_form_buscar();
		}
	}

	//Obtener nuevo miembro MÉTODO AUXILIAR
	obtener_ultima_incidencia(){
		var response = this.http.get(this.url + "ultimaincidencia");
		response.subscribe((resultado : number)=> {
			//Obtiene el último ID y incrementa el nuevo.
			this.form_guardar.get('no_incidencia').setValue(resultado + 1);

			//Registrará la nueva entrada
			this.guardar_incidencia();
		},
		error =>{
			console.log("Error", error)
		});
	}

	guardar_incidencia(){
		console.log(this.form_guardar.value);

		if (this.form_guardar.invalid) {
			console.log("Formato incorrecto del formulario");
			return;
		}
		else{
			if(this.guardando == true)
				return;

			var r = confirm("¿Deseas continuar?");
			if (r== false ) {
				return;
			}else{
				this.form_guardar.disable();
				this.guardando = true;

				this.http.post(this.url + 'Incidencia1',this.form_guardar.value).subscribe(data  => {
					this.form_guardar.enable();

					window.scroll(0,0);
					console.log("Se guardó")	
					this.guardando = false;
				},
				error  => {
					this.form_guardar.enable();
					window.scroll(0,0);
					console.log("No se guardó")
					console.log(error);
					this.guardando = false;
				});
			}
		}
	}
}
