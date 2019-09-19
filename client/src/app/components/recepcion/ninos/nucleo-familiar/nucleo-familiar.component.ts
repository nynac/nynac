import { Component, OnInit,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../../../../registration.service';

@Component({
  selector: 'nucleo-familiar',
  templateUrl: './nucleo-familiar.component.html',
  styleUrls: ['./nucleo-familiar.component.css']
})
export class NucleoFamiliarComponent implements OnInit {
	id_miembro : any;
	
	url = "https://api-remota.conveyor.cloud/api/";
	constructor(private http : HttpClient) { }

	@Input('miembro') miembro: any;

  ngOnInit() {
  }

  guardar_NF(formData) {
		//GUARDAR DATOS GENERALES MIEMBRO
		formData['miembroID'] = 1;
    formData['idNinosNF'] = 1;
    
		this.http.post(this.url + "Nino_NF", formData).subscribe(data  => {
      console.log("Registro exitoso ", data);
      alert("Registro exitoso");
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
