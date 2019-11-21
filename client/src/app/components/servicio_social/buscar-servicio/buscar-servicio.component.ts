import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-buscar-servicio',
	templateUrl: './buscar-servicio.component.html',
	styleUrls: ['./buscar-servicio.component.css']
})
export class BuscarServicioComponent implements OnInit {
	url = "https://api-remota.conveyor.cloud/api/";

	//Todo para el alert
	visible : boolean = false;
	tipo : string = "";
	mensaje : string = "";
	duracion: number = 1500; //1000 es 1 SEG

	//Resultado
	historial : any;

	//form guardar
	form_guardar : FormGroup
	guardando : boolean = false;
	submitted2 = false;

	@ViewChild('closeAddExpenseModal', {static: false} ) closeAddExpenseModal: ElementRef;

	constructor(
		private http : HttpClient,
		private formBuilder: FormBuilder
		){}

	ngOnInit() {
		this.obtener_historial();
		this.form_guardar = this.formBuilder.group({
			sede: [null, Validators.required],
			estado : [true, Validators.required],
			idStaff : [null, Validators.required],
			miembroID : [null, Validators.required],
			nombre : [null, Validators.required],
			apellido_paterno : ['', Validators.required],
			apellido_materno : ['', ],
			fecha_nacimiento : ['', ],
			telefono_particular : ['', ],
			celular : ['', ],
			correo : ['', Validators.email],
			domcalle : ['', ],
			domcolonia : ['', ],
			domcodpost : ['', ],
			domdelegacion : ['', ],
			dommunicipio : ['', ],
			escuela : ['', ],
			semestre : ['', ],
			tipo : ['', ],
			otro_estudio : ['', ],
			idiomas : ['', ],
			padece_enfermedad : ['', ],
			cual_enfermedad : ['', ],
			alergias : ['', ],
			comunicarnos_con : ['', ],
			telefono_emergencia : ['', ],
			parentesco_emergencia : ['', ],
			experiencia_voluntario : ['', ],
			donde_experiencia : ['', ],
			tratado_ninos : ['', ],
			lunes : ['', ],
			horas_lunes : ['', ],
			martes : ['', ],
			horas_martes : ['', ],
			miercoles : ['', ],
			horas_miercoles : ['', ],
			jueves : ['', ],
			horas_jueves : ['', ],
			viernes : ['', ],
			horas_viernes : ['', ],

		});
	}

	get f2(){ return this.form_guardar.controls;}

	obtener_historial(){
		var response = this.http.get(this.url + "historial_staff");
		response.subscribe((resultado : [])=> {
			resultado.length > 0 ?  this.historial = resultado.reverse() : this.mostrar_alert("No hay nada que mostrar", "info");
		},
		error =>{
			this.mostrar_alert("Error al consultar, intentalo mas tarde.", "warning");
		});
	}

	mostrar_alert(msg : string, tipo : string){
		if (tipo=="info")
			this.historial = null

		this.visible = true;
		this.mensaje = msg;
		this.tipo = tipo;
		
		setTimeout(() => { 
			if (tipo=="success") {
				this.closeAddExpenseModal.nativeElement.click();
				this.obtener_historial();
			}
			this.cerrar_alert();
		}, this.duracion
		);
	}
	cerrar_alert(){
		this.visible = false;
		this.mensaje = null;
		this.tipo = null;
	}

	abrir_modal(valores : any){
		var datepipe  = new DatePipe("en-US");
		this.form_guardar.patchValue(valores);
		this.form_guardar.patchValue(valores.datos_miembro);
		this.form_guardar.get("fecha_nacimiento").setValue(datepipe.transform(valores.fecha_nacimiento, 'yyyy-MM-dd'));
		console.log(valores);
	}

	cancelar(){
		this.form_guardar.reset();
	}

	obtener_datos(miembroID: string, controlador : string): void {
		if (miembroID == "") 
			return;

		var response = this.http.get(this.url + controlador+ "?id=" + miembroID);
		response.subscribe((resultado : any)=> {
			this.form_guardar.patchValue(resultado);
		},
		error =>{
			this.form_guardar.reset();
		});
	}

	modificar(){
		if (this.form_guardar.invalid || this.guardando == true) {
			this.submitted2 = true;
			return;
		}
		else {
			var resp = confirm("¿Deseas continuar?");
			if (resp) {
				this.http.put(this.url + "staff/" + this.form_guardar.value.idStaff, this.form_guardar.value).subscribe(data  => {
					//spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();

					this.mostrar_alert("Se ha guardado correctamente", "success");

				},
				error  => {
					//spinner.setAttribute("hidden", "true");
					this.form_guardar.enable();
					this.mostrar_alert("Ocurrió un error al modificar los datos, vuelve a intentarlo", "danger");
				});
			}
		}
	}

}
