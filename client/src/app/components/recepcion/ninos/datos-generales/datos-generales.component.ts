import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { DomSanitizer } from '@angular/platform-browser'

import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({ selector: 'datos-generales', templateUrl: './datos-generales.component.html', styleUrls: ['./datos-generales.component.css']})

export class DatosGeneralesComponent  implements OnInit {
	url = "https://api-remota.conveyor.cloud/api/";
	agregar_o_modificar: string = 'nuevo';
	miembros : any; datos_miembro : any;
	foto : any;

	//form buscar
	form_buscar : FormGroup;
	submitted = false;

	//form guardar
	form_guardar : FormGroup
	submitted2 = false;


	constructor(
		private http : HttpClient, 
		private sanitazor: DomSanitizer,
		private formBuilder: FormBuilder
		) { }

	ngOnInit(){
		//Se rellena los campos al formulario 
		this.form_buscar = this.formBuilder.group({
			miembroID: ['', Validators.required]
		})

		
		this.form_guardar = this.formBuilder.group({
			sede: ['', Validators.required],
			foto : [''],
			estado : [true, Validators.required],
			visa : [false],
			religion : [''],
			tallacamisa : [''],
			fechainscripcion : ['', Validators.required],
			idNinosDG : ['',],
			miembroID : [''],
			nombres : ['', Validators.required],
			appaterno : ['', Validators.required],
			apmaterno : ['', Validators.required],
			fechanacimiento : ['', Validators.required],
			edad : ['',(Validators.required, Validators.min(6), Validators.max(16))],
			lugarnacimiento : [''],
			nacionalidad : [''],
			sexo : ['', Validators.required],
			derechohabiencia : [''],
			otroseguro : [''],
			vivecon : [''],
			telefono : [''],
			domcalle : [''],
			domcolonia : [''],
			domcodpost : [''],
			domdelegacion : [''],
			dommunicipio : [''],
			escuela : [''],
			escuelaturno : [''],
			recoge1nino : ['', Validators.required],
			parentrecoge1 : ['', Validators.required],
			emergencia1 : [''],
			parentemergencia1 : [''],
			telefonoemergencia1 : [''],
			emergencia2 : [''],
			parentemergencia2 : [''],
			telefonoemergencia2 : [''],
			emergencia3 : [''],
			parentemergencia3 : [''],
			telefonoemergencia3 : [''],

		})

		this.get_nuevo_miembro();

		WebcamUtil.getAvailableVideoInputs()
		.then((mediaDevices: MediaDeviceInfo[]) => {
			this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
		});
	}

	get f(){ return this.form_buscar.controls;}
	get f2(){ return this.form_guardar.controls;}


	ng_busq_Form_prueba(){
		this.submitted = true;

		if (this.form_buscar.invalid) {
			return;
		}
		else{

			var response = this.http.get(this.url + "miembroes/" + this.form_buscar.value.miembroID);
			response.subscribe((resultado : any[])=> {

				console.log(resultado);

				this.foto =  this.sanitazor.bypassSecurityTrustUrl("data:image/png;base64," + resultado['Nino_DG'][0].foto);
				this.form_guardar.get('foto').setValue(resultado['Nino_DG'][0].foto);
				this.form_guardar.get('sede').setValue(resultado['sede']);
				this.form_guardar.get('estado').setValue(resultado['estado']);
				this.form_guardar.get('visa').setValue(resultado['Nino_DG'][0].visa);
				this.form_guardar.get('religion').setValue(resultado['Nino_DG'][0].religion);
				this.form_guardar.get('tallacamisa').setValue(resultado['Nino_DG'][0].tallacamisa);
				this.form_guardar.get('fechainscripcion').setValue(resultado['Nino_DG'][0].fechainscripcion);
				this.form_guardar.get('idNinosDG').setValue(resultado['Nino_DG'][0].idNinosDG);
				this.form_guardar.get('miembroID').setValue(resultado['miembroID']);
				this.form_guardar.get('nombres').setValue(resultado['Nino_DG'][0].nombres);
				this.form_guardar.get('appaterno').setValue(resultado['Nino_DG'][0].appaterno);
				this.form_guardar.get('apmaterno').setValue(resultado['Nino_DG'][0].apmaterno);
				this.form_guardar.get('fechanacimiento').setValue(resultado['Nino_DG'][0].fechanacimiento, 'dd/MM/yyyy');
				this.form_guardar.get('edad').setValue(parseInt(resultado['Nino_DG'][0].edad));
				this.form_guardar.get('lugarnacimiento').setValue(resultado['Nino_DG'][0].lugarnacimiento);
				this.form_guardar.get('nacionalidad').setValue(resultado['Nino_DG'][0].nacionalidad);
				this.form_guardar.get('sexo').setValue(resultado['Nino_DG'][0].sexo);
				this.form_guardar.get('derechohabiencia').setValue(resultado['Nino_DG'][0].derechohabiencia);
				this.form_guardar.get('otroseguro').setValue(resultado['Nino_DG'][0].otroseguro);
				this.form_guardar.get('vivecon').setValue(resultado['Nino_DG'][0].vivecon);
				this.form_guardar.get('telefono').setValue(resultado['Nino_DG'][0].telefono);
				this.form_guardar.get('domcalle').setValue(resultado['Nino_DG'][0].domcalle);
				this.form_guardar.get('domcolonia').setValue(resultado['Nino_DG'][0].domcolonia);
				this.form_guardar.get('domcodpost').setValue(resultado['Nino_DG'][0].domcodpost);
				this.form_guardar.get('domdelegacion').setValue(resultado['Nino_DG'][0].domdelegacion);
				this.form_guardar.get('dommunicipio').setValue(resultado['Nino_DG'][0].dommunicipio);
				this.form_guardar.get('escuela').setValue(resultado['Nino_DG'][0].escuela);
				this.form_guardar.get('escuelaturno').setValue(resultado['Nino_DG'][0].escuelaturno);
				this.form_guardar.get('recoge1nino').setValue(resultado['Nino_DG'][0].recoge1nino);
				this.form_guardar.get('parentrecoge1').setValue(resultado['Nino_DG'][0].parentrecoge1);
				this.form_guardar.get('emergencia1').setValue(resultado['Nino_DG'][0].emergencia1);
				this.form_guardar.get('parentemergencia1').setValue(resultado['Nino_DG'][0].parentemergencia1);
				this.form_guardar.get('telefonoemergencia1').setValue(resultado['Nino_DG'][0].telefonoemergencia1);
				this.form_guardar.get('emergencia2').setValue(resultado['Nino_DG'][0].emergencia2);
				this.form_guardar.get('parentemergencia2').setValue(resultado['Nino_DG'][0].parentemergencia2);
				this.form_guardar.get('telefonoemergencia2').setValue(resultado['Nino_DG'][0].telefonoemergencia2);
				this.form_guardar.get('emergencia3').setValue(resultado['Nino_DG'][0].emergencia3);
				this.form_guardar.get('parentemergencia3').setValue(resultado['Nino_DG'][0].parentemergencia3);
				this.form_guardar.get('telefonoemergencia3').setValue(resultado['Nino_DG'][0].telefonoemergencia3);
			},
			error =>{
				console.log("Error", error)
			});
		}
	}

	limpiar_form_buscar(){
		this.submitted =false;
		this.form_buscar.reset();
	}

	limpiar_form_guardar(){
		this.submitted2 =false;
		this.form_guardar.reset();
	}


	guardar_DG(){
		this.submitted2 = true;

		if (this.form_guardar.invalid) {
			console.log("Formato incorrecto del formulario");
			return;
		}
		else{
			
			if (this.agregar_o_modificar == "nuevo"){
				console.log("Creando ...");
				return;
				this.nuevo();
			}
			else if (this.agregar_o_modificar == "modificar"){
				console.log("Modificando ...");
				this.modificar();
			}
			else{
				console.log("se fue a ninguno")
			}
		}
	}

	radioChange(event: any){

		this.agregar_o_modificar = event.target.value;

		var eleccion = document.getElementById("btn_buscar");

		if (this.agregar_o_modificar == "nuevo"){
			this.limpiar_form_guardar();
			this.limpiar_form_buscar();
			this.get_nuevo_miembro();
			this.foto = "";

			eleccion.setAttribute("disabled", "true");
		}
		else if(this.agregar_o_modificar == "modificar"){
			eleccion.removeAttribute("disabled");
			eleccion.setAttribute("enable", "true");

			this.limpiar_form_guardar();
			this.limpiar_form_buscar();
			this.foto = "";
		}
	}

	//Obtener nuevo miembro MÉTODO AUXILIAR
	get_nuevo_miembro(){
		var response = this.http.get(this.url + "miembroes");
		response.subscribe((data)=> { 
			this.miembros = data;
			this.form_guardar.get('estado').setValue(true);
			this.form_guardar.get('visa').setValue(false);
			this.form_guardar.get('idNinosDG').setValue((this.miembros[this.miembros.length -1].miembroID + 1));
			this.form_guardar.get('miembroID').setValue((this.miembros[this.miembros.length -1].miembroID + 1));
		},
		error =>{
			console.log("Error", error)
		});
	}


	nuevo(){
		//1. Recalcula el número de miembro, en dado caso que ya hayan registrado uno mientras estaba en proceso
		this.get_nuevo_miembro()
		
		//2. Guardamos al niño en la tabla miembros
		this.datos_miembro = {
			miembroID : this.form_guardar.value.miembroID,
			estado : this.form_guardar.value.estado,
			tipo : "niño",
			sede: this.form_guardar.value.sede
		}

		this.http.post(this.url + 'miembroes', this.datos_miembro).subscribe(data  => {
			console.log("Se guardó el niño como nuevo miembro.");
			this.limpiar_form_guardar();
			this.limpiar_form_buscar();
			this.foto = "";
		},
		error  => {
			console.log("Error al guardar en la tabla miembro", error);
		});


		this.form_guardar.get("foto").setValue("" + this.webcamImage.imageAsBase64);
		this.http.post(this.url + "Nino_DG", this.form_guardar.value).subscribe(data  => {
			console.log("Se guardaron los datos generales.", data);
		},
		error  => {
			console.log("Error al guardar datos generales.", error);
		});
	}

	modificar(){
		//GUARDAR DATOS GENERALES MIEMBRO
		this.http.put(this.url + "Nino_DG/" + this.form_guardar.value.miembroID, this.form_guardar.value).subscribe(data  => {
			console.log("Se han modificado los valores correctamente");
			this.limpiar_form_guardar();
			this.limpiar_form_buscar();
			this.foto = "";
		},
		error  => {
			console.log(error);
		});
	}


	// toggle webcam on/off
	public showWebcam = false;
	public allowCameraSwitch = true;
	public multipleWebcamsAvailable = false;
	public deviceId: string;
	public videoOptions: MediaTrackConstraints = {};
	public errors: WebcamInitError[] = [];
	public webcamImage: WebcamImage = null;

	private trigger: Subject<void> = new Subject<void>();
	private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();

	public tomar_foto(): void {
		this.trigger.next();
		this.toggleWebcam();
		this.foto ="" + this.webcamImage.imageAsDataUrl;
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