import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DatePipe } from '@angular/common';

import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { DomSanitizer } from '@angular/platform-browser'

import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({ selector: 'datos-generales', templateUrl: './datos-generales.component.html', styleUrls: ['./datos-generales.component.css']})

export class DatosGeneralesComponent  implements OnInit, OnChanges {
	@Output('padre_var') padre_var = new EventEmitter<any>();

	@Input('global') global: any; 
	@Input() prop!:any;

	@Input('agregar_o_modificar') agregar_o_modificar: any; 
	@Input() prop2!:any;

	url = "https://api-remota.conveyor.cloud/api/";
	miembros : any; datos_miembro : any; aux_datos : any;
	foto : any;

	guardando : boolean = false;
	porcentaje : number;
	porcentaje_actual = 0;

	//form guardar
	form_guardar : FormGroup
	submitted2 = false;

	constructor(
		private http : HttpClient, 
		private sanitazor: DomSanitizer,
		private formBuilder: FormBuilder
		) { }

	ngOnInit(){
		this.form_guardar = this.formBuilder.group({
			sede: ['', Validators.required],
			foto : [''],
			estado : [true, Validators.required],
			visa : [false],
			religion : [''],
			tallacamisa : [''],
			fechainscripcion : [''],
			idNinosDG : ['',],
			miembroID : [''],
			nombres : ['', Validators.required],
			appaterno : ['', Validators.required],
			apmaterno : ['', Validators.required],
			fechanacimiento : [''],
			edad : ['',(Validators.required, Validators.min(6), Validators.max(16))],
			lugarnacimiento : [''],
			nacionalidad : [''],
			sexo : ['',],
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
		});

		WebcamUtil.getAvailableVideoInputs()
		.then((mediaDevices: MediaDeviceInfo[]) => {
			this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
		});
	}

	ngOnChanges(changes: SimpleChanges){
		if (this.global != undefined) {
			this.form_guardar.patchValue(this.global["Nino_DG"][0]);
			this.form_guardar.patchValue(this.global);
			
			this.foto =  this.sanitazor.bypassSecurityTrustUrl("data:image/png;base64," + this.global["Nino_DG"][0]['foto']);
		}else if(this.global == null && this.form_guardar != undefined){
			this.limpiar_form_guardar();
			this.foto = "";
		}

		if(this.agregar_o_modificar == "nuevo")
			this.get_nuevo_miembro();
	}

	prueba(){
		this.padre_var.emit(10);
	}

	get f2(){ return this.form_guardar.controls;}

	limpiar_form_guardar(){
		this.submitted2 =false;
		this.form_guardar.reset();
	}

	guardar_DG(){
		this.submitted2 = true;

		var spinner = document.getElementById("spinner");

		if (this.form_guardar.invalid) {
			console.log("Formato incorrecto del formulario");
			console.log(this.form_guardar.value);
			spinner.setAttribute("hidden", "true");
			return;
		}
		else{
			var r = confirm("Estas seguro que deseas completar esta acción");
			if (r== false) 
				return;
			spinner.removeAttribute("hidden");

			if (this.agregar_o_modificar == "nuevo"){
				console.log("Creando ...");
				this.nuevo_miembro();
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

	//Obtener nuevo miembro MÉTODO AUXILIAR
	get_nuevo_miembro(){
		var response = this.http.get(this.url + "ultimoMiembro");
		response.subscribe((resultado : number)=> {
			this.form_guardar.get('estado').setValue(true);
			this.form_guardar.get('visa').setValue(false);
			this.form_guardar.get('idNinosDG').setValue(resultado + 1);
			this.form_guardar.get('miembroID').setValue(resultado + 1);

			console.log(resultado + 1);
		},
		error =>{
			console.log("Error", error)
		});
	}

	nuevo_miembro(){
		this.form_guardar.disable();
		var spinner = document.getElementById("spinner");

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
			alert(this.form_guardar.value.nombres + " se agregó correctamente. Su No. Miembro es: " + this.form_guardar.value.miembroID);
			this.guardando = true;
			this.porcentaje = 100/9;


			this.guardar_miembro_en_tabla("Nino_DG", "idNinosDG", this.form_guardar.value.idNinosDG, this.porcentaje); //Datos generales 
			this.guardar_miembro_en_tabla("Nino_NF", "idNinosNF", this.form_guardar.value.idNinosDG, this.porcentaje); //Nucleo familiar
			this.guardar_miembro_en_tabla("Nino_ES", "idNinosES", this.form_guardar.value.idNinosDG, this.porcentaje); //Socioeconomico
			this.guardar_miembro_en_tabla("Nino_DM", "idNinosDM", this.form_guardar.value.idNinosDG, this.porcentaje); //Medicos
			this.guardar_miembro_en_tabla("Nino_ED", "idNinosED", this.form_guardar.value.idNinosDG, this.porcentaje); //educación
			this.guardar_miembro_en_tabla("Nino_Dep", "idNinosDep", this.form_guardar.value.idNinosDG, this.porcentaje); //deporte
			this.guardar_miembro_en_tabla("Nino_Art", "idNinosArt", this.form_guardar.value.idNinosDG, this.porcentaje); //arte
			this.guardar_miembro_en_tabla("Nino_DH", "idNinosDH", this.form_guardar.value.idNinosDG, this.porcentaje); //desarrollo humano

			this.modificar();
			//this.padre_var.emit(this.form_guardar.value.miembroID);
			
		},
		error  => {
			console.log("Error al guardar en la tabla miembro", error);
		});
	}

	modificar(){
		this.form_guardar.disable();
		var spinner = document.getElementById("spinner");
		if (this.webcamImage != null) {
			this.form_guardar.get("foto").setValue(this.webcamImage.imageAsBase64);
		}
		
		this.http.put(this.url + "Nino_DG1/" + this.form_guardar.value.miembroID, this.form_guardar.value).subscribe(data  => {
			spinner.setAttribute("hidden", "true");
			this.guardando = false;
			this.form_guardar.enable();
		},
		error  => {
			console.log(error);
			spinner.setAttribute("hidden", "true");
			this.form_guardar.enable();
		});

	}

	guardar_miembro_en_tabla(tabla : string, columnaID : string, valorID : number, porcentaje : any){
		
		var datos_aux = JSON.parse('{"'+columnaID+'":'+valorID+', "miembroID":'+valorID+'}');

		this.http.post(this.url + tabla, datos_aux).subscribe(data  => {
			console.log("Se han guardado: " + tabla);
			this.progreso(porcentaje);
		},
		error  => {
			console.log("Error al guardar en la tabla: " + tabla + "\n Se está volviendo a intentar", error);
			this.guardar_miembro_en_tabla(tabla, columnaID, this.form_guardar.value.idNinosDG, porcentaje);
		});
	}

	progreso(sumar_porcentaje){
		var progress = document.getElementById("progress");
		progress.removeAttribute("aria-valuemin");
		progress.removeAttribute("style");

		this.porcentaje_actual += sumar_porcentaje;
		progress.setAttribute("aria-valuemin", this.porcentaje_actual.toString());
		progress.setAttribute("style","width:" + this.porcentaje_actual + "%;");
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