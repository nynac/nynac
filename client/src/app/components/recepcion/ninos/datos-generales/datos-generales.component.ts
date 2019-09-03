import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../../../../registration.service';

@Component({
	selector: 'datos-generales',
	templateUrl: './datos-generales.component.html',
	styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent implements OnInit {
	miembros : any;
	datos_miembro : any;
	nuevo_id_miembro : any;
	url = "https://api-remota.conveyor.cloud/api/";

	constructor(private http : HttpClient) { }
	

	ngOnInit() {
		var response = this.http.get(this.url + "/miembro");
		response.subscribe((data)=>this.miembros = data);
	}

	guardar_DG(formData) {
		this.nuevo_id_miembro = (this.miembros[this.miembros.length -1].miembroID);

		//GUARDAR MIEMBRO
		/*this.datos_miembro = {
			tipo : "niño",
			estado : "true",
			miembroID : this.nuevo_id_miembro
		}

		this.http.post(this.url + 'miembro', this.datos_miembro).toPromise().then((data:any) => {
			alert("Se ha insertado el miembro");
		});*/

		//GUARDAR DATOS GENERALES MIEMBRO
		formData['miembroID'] = this.nuevo_id_miembro;
		formData['idNinosDG'] = this.nuevo_id_miembro;
/*
		this.http.post(this.url + "Nino_DG", formData).subscribe(data  => {
			console.log("POST Request is successful ", data);
		},
		error  => {
			console.log("Error", error);
		});
		*/

		//GUARDAR DATOS GENERALES MIEMBRO
		this.http.put(this.url + "Nino_DG/1", formData).subscribe(data  => {
			console.log("Se han modificado los valores correctamente", data);
		},
		error  => {
			console.log("Error", error);
		});
	}

	//Opciones agregar o modificar
	nuevo(obj){
		alert("Se agregará un nuevo miembro");
	}
	modificar(obj){
		alert("Semodificará un niño");
	}

}