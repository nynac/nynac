import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common';

@Component({
	selector: 'historial-incidencias',
	templateUrl: './historial-incidencias.component.html',
	styleUrls: ['./historial-incidencias.component.css']
})
export class HistorialIncidenciasComponent implements OnInit {
	url = "https://api-remota.conveyor.cloud/api/";

	//Todo para el alert
	visible : boolean = false;
	tipo : string = "";
	mensaje : string = "";
	duracion: number = 5000; //1000 es 1 SEG

	//Resultado
	historial : any;

	//form guardar
	form_guardar : FormGroup
	guardando : boolean = false;
	submitted2 = false;

	constructor(
		private http : HttpClient,
		private formBuilder: FormBuilder
		){}

	ngOnInit() {
		this.obtener_historial();
		this.form_guardar = this.formBuilder.group({
			no_incidencia:['', ],
			quien_detecto	 : ['', Validators.required],
			area_actividad : [''],
			miembroID : ['', Validators.required], //del niño
			fecha_incidencia : ['', Validators.required],
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
		})
	}

	get f2(){ return this.form_guardar.controls;}

	obtener_historial(){
		var response = this.http.get(this.url + "historial_incidencias");
		response.subscribe((resultado : [])=> {
			resultado.length > 0 ?  this.historial = resultado.reverse() : this.mostrar_alert("No hay nada que mostrar", "info");
		},
		error =>{
			this.mostrar_alert("Error al consultar, intentalo mas tarde.", "warning");
		});
	}

	mostrar_alert(msg : string, tipo : string){
		if (tipo=="info")
			this.historial = null
		this.visible = true;
		this.mensaje = msg;
		this.tipo = tipo;
		
		setTimeout(() => { 
			this.cerrar_alert();
		}, this.duracion
		);
	}
	cerrar_alert(){
		this.visible = false;
		this.mensaje = null;
		this.tipo = null;
	}

	abrir_modal(valores : any){
		var datepipe  = new DatePipe("en-US");
		this.form_guardar.patchValue(valores);
		this.form_guardar.patchValue(valores.alumno);
		this.form_guardar.patchValue(valores.instructor);
		this.form_guardar.get("fecha_incidencia").setValue(datepipe.transform(valores.fecha_incidencia, 'yyyy-MM-dd'));
	}

	cancelar(){
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

	modificar(){
		if (this.form_guardar.invalid || this.guardando == true) {
			this.submitted2 = true;
			return;
		}
		else {
			var resp = confirm("¿Deseas continuar?");
			if (resp) {
				this.http.put(this.url + "Incidencia1/" + this.form_guardar.value.no_incidencia, this.form_guardar.value).subscribe(data  => {
					//spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();

					console.log("Se ha modificado")
					this.cancelar();
					this.obtener_historial();

				},
				error  => {
					//spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();
					//this.mostrar_alert("Ocurrió un error al modificar los datos, vuelve a intentarlo", "danger", 5000, null);
					console.log("Ocurrió un error al modificar los datos, vuelve a intentarlo");
				});
			}
		}
	}
}
