import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms' 

@Component({
	selector: 'registro',
	templateUrl: './registro.component.html',
	styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
	url = "https://api-remota.conveyor.cloud/api/";

	//Todo para el alert
	visible : boolean = false;
	tipo : string = "";
	mensaje : string = "";
	miembroID : number;

	//form guardar
	form_guardar : FormGroup
	guardando : boolean = false;
	hora : any;

	constructor(
		private http : HttpClient, 
		private formBuilder: FormBuilder
		) { }

	ngOnInit() {
		this.form_guardar = this.formBuilder.group({
			idRegistroentrada : [''],
			miembroID: ['', Validators.required],
			fechaentrada : [''],
			fechasalida : ['']
		});
	}
	
	esta_activo(){
		this.miembroID = this.form_guardar.value.miembroID;
		var response = this.http.get(this.url + "esta_activo?id=" + this.form_guardar.value.miembroID);
		response.subscribe((resultado : number)=> {
			resultado > 0 ? this.ya_registro_entrada() : this.mostrar_alert("Verifica el número de miembro", "danger", 3000);
		},
		error =>{
			console.log("Error", error)
		});
	}

	ya_registro_entrada(){
		var response = this.http.get(this.url + "ya_registro_entrada?id=" + this.form_guardar.value.miembroID);
		response.subscribe((resultado : any)=> {
			//No ha registrado su entrada ? "crear entrada" SINO "guardar salida"
			resultado[0] == undefined ? this.obtener_ultima_entrada() : this.salida(resultado[0].idRegistroentrada, resultado[0].miembroID, resultado[0].fechaentrada);
		},
		error =>{
			console.log("error: " + error);
		});
	}

	//Obtener nuevo miembro MÉTODO AUXILIAR
	obtener_ultima_entrada(){
		var response = this.http.get(this.url + "ultima_entrada");
		response.subscribe((resultado : number)=> {
			this.form_guardar.get('idRegistroentrada').setValue(resultado + 1);

			this.entrada();
		},
		error =>{
			console.log("Error", error)
		});
	}

	//Si no ha registrado su entrada se ejecutará este método
	entrada(){

		console.log(this.form_guardar.value)
		this.form_guardar.disable();

		this.http.post(this.url + "CheckNinos", this.form_guardar.value).subscribe(data  => {
			this.form_guardar.enable();
			this.mostrar_alert("Se ha guardado la entrada", "success", 2000)
		},
		error  => {
			this.form_guardar.enable();
			console.log(error);
		});
	}

	//Si registrará su salida cuando previamente se haya realizado una entrada
	salida(id : number, miembro : number, fecha_entrada : any){
		console.log("salida")
		this.form_guardar.get('idRegistroentrada').setValue(id);
		this.form_guardar.get('miembroID').setValue(miembro);
		this.form_guardar.get('fechaentrada').setValue(fecha_entrada);
		this.form_guardar.get('fechasalida').setValue(null);

		this.http.put(this.url + "CheckNinos/" + id, this.form_guardar.value).subscribe(data  => {
			this.mostrar_alert("Se ha guardado la salida", "success", 2000)	
		},
		error  => {
			this.form_guardar.enable();
			console.log(error);
		});
	}

	mostrar_alert(msg : string, tipo : string, duracion : number){
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
