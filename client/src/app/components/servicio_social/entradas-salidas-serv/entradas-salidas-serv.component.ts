import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-entradas-salidas-serv',
	templateUrl: './entradas-salidas-serv.component.html',
	styleUrls: ['./entradas-salidas-serv.component.css']
})
export class EntradasSalidasServComponent implements OnInit {
	historial : any;

	url = "https://api-remota.conveyor.cloud/api/";

	//Todo para el alert
	visible : boolean = false;
	tipo : string = "";
	mensaje : string = "";
	duracion: number = 1500; //1000 es 1 SEG

	horas_acumuladas : number = 0;

	@ViewChild('id', {static: false})id: number;

	datos_check : any;
	submited : boolean = true;

	constructor(
		private http : HttpClient
		){}

	ngOnInit() {
	}

	limpiar(){
		var miembroID = (<HTMLInputElement>document.getElementById("miembroID"));
		miembroID.value="";
		this.historial = null;
		
		miembroID.focus();
	}

	esta_activo(){
		var miembroID = (<HTMLInputElement>document.getElementById("miembroID"));
		if(miembroID.value==""){
			this.limpiar();
			return;
		}
		var response = this.http.get(this.url + "esta_activo_staff?id=" + miembroID.value);

		response.subscribe((resultado : number)=> {
			//Resultado = 1 signifuca que si está activo, Resultado = 0 significa que no está activo
			resultado > 0 ? this.ya_registro_entrada(miembroID.value) : this.mostrar_alert("Verifica el número de miembro", "danger");
		},
		error =>{
			this.mostrar_alert("Verifica el número de miembro", "warning");
		});
	}

	ya_registro_entrada(miembroID : any){
		var response = this.http.get(this.url + "ya_registro_entrada_staff?id=" + miembroID);
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
		var response = this.http.get(this.url + "ultima_entrada_staff");
		response.subscribe((idUltimaEntrada : number)=> {
			
			//Registrará la nueva entrada
			this.entrada(idUltimaEntrada + 1);
		},
		error =>{
			console.log("Error", error)
		});
	}

	//Si no ha registrado su entrada se ejecutará este método
	entrada(idUltimaEntrada : number){
		var miembroID = (<HTMLInputElement>document.getElementById("miembroID"));
		var spinner_guardar = document.getElementById("spinner_guardar");
		spinner_guardar.removeAttribute("hidden");

		//2. Guardamos al staff en la tabla del registro
		this.datos_check = {
			idRegistroentrada : idUltimaEntrada,
			miembroID : miembroID.value
		}

		this.http.post(this.url + 'RegistroEntradasStaffs', this.datos_check).subscribe(data  => {
			spinner_guardar.setAttribute("hidden", "true");
			this.mostrar_alert("Se ha guardado la entrada", "success")
		},
		error  => {
			spinner_guardar.setAttribute("hidden", "true");
			this.mostrar_alert("Error guardar la entrada", "danger")
		});
	}

	//Si registrará su salida cuando previamente se haya realizado una entrada
	salida(id : number, miembro : number, fecha_entrada : any){
		var miembroID = (<HTMLInputElement>document.getElementById("miembroID"));
		var spinner_guardar = document.getElementById("spinner_guardar");
		spinner_guardar.removeAttribute("hidden");

		this.datos_check = {
			idRegistroentrada : id,
			miembroID : miembroID.value,
			fechaentrada : fecha_entrada,
			fechasalida : null,
		}

		this.http.put(this.url + "RegistroEntradasStaffs/" + id, this.datos_check).subscribe(data  => {
			spinner_guardar.setAttribute("hidden", "true");
			this.mostrar_alert("Se ha guardado la salida", "success")	
		},
		error  => {
			spinner_guardar.setAttribute("hidden", "true");
			this.mostrar_alert("Error guardar la salida", "danger")	
			console.log(error);
		});
	}

	mostrar_alert(msg : string, tipo : string){
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
		this.submited = false;

		var miembroID = (<HTMLInputElement>document.getElementById("miembroID"));
		miembroID.value="";
		miembroID.focus();

		this.horas_acumuladas = 0;
	}

	mi_historial(){
		var miembroID = (<HTMLInputElement>document.getElementById("miembroID"));
		if(miembroID.value==""){
			this.limpiar();
			return;
		}

		var spinner_historial = document.getElementById("spinner_historial");
		spinner_historial.removeAttribute("hidden");

		var response = this.http.get(this.url + "RegistroEntradaSalidaStaff?id=" + miembroID.value);
		response.subscribe((resultado : [])=> {
			spinner_historial.setAttribute("hidden", "true");
			resultado.length > 0 ?  this.calcular_num_horas(resultado.reverse()) : this.mostrar_alert("No hay nada que mostrar", "info");
		},
		error =>{
			spinner_historial.setAttribute("hidden", "true");
			this.mostrar_alert("Error al consultar, intentalo mas tarde.", "warning");
		});
	}

	calcular_num_horas(historial : any){
		this.historial = historial;

		for(let i = 0; i < historial.length; i++){
			if (historial[i].fechasalida != null){
				var milisegundos = Date.parse(historial[i].fechasalida) - Date.parse(historial[i].fechaentrada);
				var horas = milisegundos / 1000 / 60 / 60;

				this.horas_acumuladas += horas;
			}
		}
	}
}
