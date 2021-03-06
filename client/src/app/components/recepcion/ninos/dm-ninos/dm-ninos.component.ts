import { Component, OnInit, Input, Output, EventEmitter,ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
	selector: 'dm-ninos',
	templateUrl: './dm-ninos.component.html',
	styleUrls: ['./dm-ninos.component.css']
})
export class DmNinosComponent implements OnInit, OnChanges {
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

	submitted2 :boolean = false;

	constructor(
		private http : HttpClient,
		private formBuilder: FormBuilder
		){}

	ngOnInit() {
		this.form_guardar = this.formBuilder.group({
			idNinosDM : ['', Validators.required],
			miembroID : ['', Validators.required],

			alergia : [''],
			medicamento : [''],
			cuidadoespecial : [''],

			rebeola : [''],
			varicela : [''],
			escarlatina : [''],
			hepatitis : [''],
			influenza : [''],
			tifoidea : [''],

			paperas : [''],
			tosferina : [''],
			otraenfermedad : [''],

			ataquesepilepticos : [''],
			enfermedadcronica : [''],
			accidentesgraves : [''],

			hasidooperado : [''],
			tipooperacion : [''],
			cantidadoperaciones : [''],
			fechaoperacion : [''],
			piojos : [''],
			frecpiojos : [''],

			problemahabla : [''],
			problemavista : [''],
			problemaoido : [''],
			problematonomuscular : [''],
			otroproblema : [''],

			aparatodental : [''],
			aparatoanteojos : [''],
			aparatoauditivo : [''],
			aparatoortopedico : [''],
			otroaparato : ['']
		})
	}
	
	ngOnChanges(changes: SimpleChanges){
		var datepipe  = new DatePipe("en-US");
		if (this.global != undefined) {
			this.form_guardar.patchValue(this.global["Nino_DM"][0]);	
			this.form_guardar.get("fechaoperacion").setValue(datepipe.transform(this.global["Nino_DM"][0]['fechaoperacion'], 'yyyy-MM-dd'));
		}else if(this.global == null && this.form_guardar != undefined){
			this.limpiar_form_guardar();
		}
	}

	get f2(){ return this.form_guardar.controls;}

	limpiar_form_guardar(){
		this.form_guardar.reset();
	}

	guardar_DM(){
		var spinner = document.getElementById("DM_spinner");
		
		if (this.form_guardar.invalid) {
			console.log("Formato incorrecto del formulario");
			spinner.setAttribute("hidden", "true");
			return;
		}
		else{
			if(this.guardando == true)
				return;

			var r = confirm("¿Deseas continuar?");
			if (r== false) {
				return;
			}else{
				this.form_guardar.disable();
				this.guardando = true;
				spinner.removeAttribute("hidden");

				this.http.put(this.url + "Nino_DM/" + this.form_guardar.value.miembroID, this.form_guardar.value).subscribe(data  => {
					spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();
					window.scroll(0,0);
					this.mostrar_alert("Se guardó correctamente", "success", 5000, null);	
				},
				error  => {
					spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();
					window.scroll(0,0);
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