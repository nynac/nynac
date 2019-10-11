import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
	duracion: number = 1500; //1000 es 1 SEG

	//Resultado
	historial : any;

	constructor( private http : HttpClient ) { }

	ngOnInit() {
		this.obtener_historial();
	}

	obtener_historial(){
		var response = this.http.get(this.url + "historial_incidencias");
		response.subscribe((resultado : [])=> {
			resultado.length > 0 ?  this.historial = resultado.reverse() : this.mostrar_alert("No hay nada que mostrar", "info");
		},
		error =>{
			this.mostrar_alert("Verifica el número de miembro", "warning");
		});
	}

	mostrar_alert(msg : string, tipo : string){
		this.visible = true;
		this.mensaje = msg;
		this.tipo = tipo;
		
		setTimeout(() => { 
			var input = document.getElementById("miembroID");
			input.focus();
			this.cerrar_alert();
		}, this.duracion
		);
	}
	cerrar_alert(){
		this.visible = false;
		this.mensaje = null;
		this.tipo = null;

		var input = document.getElementById("miembroID");
		input.focus();
	}

}
