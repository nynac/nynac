import { Component, OnInit, Input, Output, EventEmitter,ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'deporte-ninos',
	templateUrl: './deporte-ninos.component.html',
	styleUrls: ['./deporte-ninos.component.css']
})
export class DeporteNinosComponent implements OnInit, OnChanges {
	@Input('global') global: any;
	@Input() prop!:any;

	url = "https://api-remota.conveyor.cloud/api/";

	//Todo para el alert
	visible : boolean = false;
	tipo : string = null;
	mensaje : string = null;
	guardando : boolean = false;

	//form guardar
	form_guardar : FormGroup

	constructor(
		private http : HttpClient,
		private formBuilder: FormBuilder
		){}
	ngOnInit() {
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

	ngOnChanges(changes: SimpleChanges){
		if (this.global != undefined  && this.global["Nino_Dep"][0] != undefined) {
			this.form_guardar.patchValue(this.global["Nino_Dep"][0]);	
		}else if(this.global == null && this.form_guardar != undefined){
			this.limpiar_form_guardar();
		}
	}

	get f2(){ return this.form_guardar.controls;}

	limpiar_form_guardar(){
		this.form_guardar.reset();
	}
	
	guardar_DEP(){
		var spinner = document.getElementById("spinner_dep");
		
		if (this.form_guardar.invalid) {
			console.log("Formato incorrecto del formulario");
			spinner.setAttribute("hidden", "true");
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
				spinner.removeAttribute("hidden");

				this.http.put(this.url + "Nino_Dep/" + this.form_guardar.value.miembroID, this.form_guardar.value).subscribe(data  => {
					spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();

					this.mostrar_alert("Se guardó correctamente", "success", 5000, null);	
				},
				error  => {
					spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();
					this.mostrar_alert("Ocurrió un error al guardar los datos, vuelve a intentarlo", "danger", 5000, null);
					console.log(error);
				});
			}

		}
	}
	mostrar_alert(msg : string, tipo : string, duracion : number, accion : string){
		this.visible = true;
		this.mensaje = msg;
		this.tipo = tipo;

		setTimeout(() => { 
			this.cerrar_alert();
		}, duracion
		);
	}
	cerrar_alert(){
		this.visible = false;
		this.mensaje = null;
		this.tipo = null;
		this.guardando = false;
	}
}
