import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationService } from '../../../../registration.service';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';

import { DomSanitizer } from '@angular/platform-browser'


@Component({
	selector: 'datos-generales',
	templateUrl: './datos-generales.component.html',
	styleUrls: ['./datos-generales.component.css']
})
export class DatosGeneralesComponent {
	opcion: string = '';
	miembros : any;
	datos_miembro : any;
	nuevo_id_miembro : string = '';
	url = "https://api-remota.conveyor.cloud/api/";
	foto : any;


	//Resultados de busqueda
	resultado : any = "";
	

	constructor(private http : HttpClient, private sanitazor: DomSanitizer) { }

	radioChange(event: any){
		this.opcion = event.target.value;
		var eleccion = document.getElementById("btn_buscar");

		if (this.opcion == "nuevo"){
			this.get_nuevo_miembro();
			eleccion.setAttribute("disabled", "true");
		}
		else if(this.opcion == "modificar"){
			eleccion.removeAttribute("disabled");
			eleccion.setAttribute("enable", "true");
		}
	}

	//EVENTO DEL FORMULARIO DE DATOS GENERALES
	guardar_DG(datos_formulario) {
		if (this.opcion == "nuevo")
			this.nuevo(datos_formulario);
		else
			this.modificar(datos_formulario);
	}

	//Obtener nuevo miembro MÉTODO AUXILIAR
	get_nuevo_miembro(){
		var response = this.http.get(this.url + "miembroes");
		response.subscribe((data)=> { 
			this.miembros = data;
			//Asignamos el id a nuevo_id_miembro porque será utilizada en el DOM
			this.nuevo_id_miembro =  (this.miembros[this.miembros.length -1].miembroID + 1);
		},
		error =>{
			console.log("Error", error)
		});
	}

	nuevo(datos_formulario){
		//1. Recalcula el número de miembro, en dado caso que ya hayan registrado uno mientras estaba en proceso
		this.get_nuevo_miembro()
		
		//2. Guardamos al niño en la tabla miembros
		this.datos_miembro = {
			miembroID : this.nuevo_id_miembro,
			tipo : "niño",
			estado : "true",
			sede: "camino",
			foto: this.webcamImage.imageAsBase64
		}

		this.http.post(this.url + 'miembroes', this.datos_miembro).subscribe(data  => {
			console.log("Se guardó el niño como nuevo miembro.", data);
		},
		error  => {
			console.log("Error al guardar en la tabla miembro", error);
		});

		//3. Guardamos al niño en la tabla ninos_DG
		datos_formulario['miembroID'] = this.nuevo_id_miembro;
		datos_formulario['idNinosDG'] = this.nuevo_id_miembro;

		this.http.post(this.url + "Nino_DG", datos_formulario).subscribe(data  => {
			console.log("Se guardaron los datos generales.", data);
		},
		error  => {
			console.log("Error al guardar datos generales.", error);
		});
	}



	//TODO PARA MODIFICAR UN MIEMBRO DE TIPO NIÑO
	ng_busq_Form(form_buscar){
		var response = this.http.get(this.url + "miembroes/" + form_buscar['miembroID']);
		response.subscribe((data : any[])=> { 
			this.resultado = data;
			
			this.foto =  this.sanitazor.bypassSecurityTrustUrl("data:image/png;base64," + this.resultado.foto);
		},
		error =>{
			console.log("Error", error)
		});
	}

	modificar(datos_formulario){
		console.log(datos_formulario);
		//GUARDAR DATOS GENERALES MIEMBRO
		this.http.put(this.url + "Nino_DG/1", datos_formulario).subscribe(data  => {
			console.log("Se han modificado los valores correctamente", data);
		},
		error  => {
			console.log("Error", error);
		});
	}
	// toggle webcam on/off
	public showWebcam = false;
	public allowCameraSwitch = true;
	public multipleWebcamsAvailable = false;
	public deviceId: string;
	public videoOptions: MediaTrackConstraints = {
		// width: {ideal: 1024},
		// height: {ideal: 576}
	};
	public errors: WebcamInitError[] = [];
	public webcamImage: WebcamImage = null;

	private trigger: Subject<void> = new Subject<void>();
	private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

	public ngOnInit(): void {
		WebcamUtil.getAvailableVideoInputs()
		.then((mediaDevices: MediaDeviceInfo[]) => {
			this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
		});
	}

	public tomar_foto(): void {
		this.trigger.next();
		this.toggleWebcam();
		
		this.foto = this.webcamImage.imageAsDataUrl
	}

	public toggleWebcam(): void {
		this.showWebcam = !this.showWebcam;
	}

	public handleInitError(error: WebcamInitError): void {
		this.errors.push(error);
	}

	public handleImage(webcamImage: WebcamImage): void {
		this.webcamImage = webcamImage;
	}

	public cameraWasSwitched(deviceId: string): void {
		this.deviceId = deviceId;
	}

	public get triggerObservable(): Observable<void> {
		return this.trigger.asObservable();
	}

	public get nextWebcamObservable(): Observable<boolean|string> {
		return this.nextWebcam.asObservable();
	}
}