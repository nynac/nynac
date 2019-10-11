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
		var hoy = new Date();
		var fech = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();

		this.form_buscar = this.formBuilder.group({
			miembroID: ['', Validators.required]
		})

		this.form_guardar = this.formBuilder.group({
			no_incidencia:['', ],
			quien_detecto	 : ['', Validators.required],
			area_actividad : [''],
			miembroID : ['', Validators.required], //del niño
			fecha_incidencia : [fech, Validators.required],
			grupo : [''],
			con_hermanos_primos : [''],
			conducta_problema : ['', Validators.required],
			descripcion : ['', Validators.required],
			canaliza : [''],
			solucion : [''],
			nombres: ['', Validators.required],
			appaterno: [''],
			apmaterno: [''],
			nombre: ['', Validators.required], //nombre del instructor
			ap_paterno: [''], // apellido p del instructor
			ap_materno: [''] // apellido m del instructor
		});
	}

	get f2(){ return this.form_guardar.controls;}
	
	limpiar_form_guardar(){
		this.form_guardar.reset();
	}

	obtener_datos(miembroID: string, controlador : string): void {
		if (miembroID == "") 
			return;

		var response = this.http.get(this.url + controlador+ "?id=" + miembroID);
		response.subscribe((resultado : any)=> {
			this.form_guardar.patchValue(resultado);
		},
		error =>{
			this.form_guardar.reset();
		});
	}

	limpiar_form_buscar(){
		this.submitted = false;
		this.form_buscar.reset();
	}

	//Obtener nueva incidencia MÉTODO AUXILIAR
	obtener_ultima_incidencia(){
		if (this.form_guardar.invalid || this.guardando == true) {
			this.submitted2 = true;
			return;
		}
		else {
			var resp = confirm("¿Deseas continuar?");
			if (resp) {
				var response = this.http.get(this.url + "ultimaincidencia");
				response.subscribe((resultado : number)=> {
					//Obtiene el último ID y incrementa el nuevo.
					this.form_guardar.get('no_incidencia').setValue(resultado + 1);

					//Registrará la nueva incidencia
					this.guardar_incidencia();
					this.submitted2 = false;
				},
				error =>{
					console.log("Error", error)
					this.submitted2 = false;
				});
			}
		}
	}

	guardar_incidencia(){
		this.form_guardar.disable();
		this.guardando = true;

		this.http.post(this.url + 'Incidencia1',this.form_guardar.value).subscribe(data  => {
			this.form_guardar.enable();
			console.log("Se guardó")	
		},
		error  => {
			this.form_guardar.enable();
			console.log("No se guardó")
		});
		this.form_guardar.reset();
		this.guardando = false;
	}

}
