import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'donacion-donante',
  templateUrl: './donacion-donante.component.html',
  styleUrls: ['./donacion-donante.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class DonacionDonanteComponent implements OnInit, OnChanges {
  @Input('gl_donante') gl_donante: any;
  @Input() prop!: number;

  new_Var_global: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    console.log("3");
    if (this.form_buscar !== undefined) {
      this.form_buscar.get('buscarID').setValue(this.gl_donante);
      this.buscar_donante();
    }
  }

  @Output() donante_variable = new EventEmitter<number>();

  //busqueda
  resultado: any;
  miembro: any;
  //fechas
  fecha1: any;
  fecha2: any;
  //Tabla
  arreglo: any;

  //radio Option
  agregar_o_modificar: string = 'nuevo';

  //Formularios
  form_buscar: FormGroup;
  form_agregar: FormGroup;

  //validacion
  submit_buscar = false;
  submit_agregar = false;

  url = "https://api-remota.conveyor.cloud/api/";

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { 
   }

  ngOnInit() {
    this.get_nuevo_donacion();
        //Se rellena los campos al formulario 
    //buscar
    this.form_buscar = this.formBuilder.group({
      buscarID: ['', Validators.required],
    })

    //agregar
    this.form_agregar = this.formBuilder.group({
      donacionID: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombrefiscal: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required],
      tipodonante: ['', Validators.required],
      fechanacimiento: [this.fecha1],
      edad: [''],
      fechadonacion: [this.fecha2],
      liderID: [''],
      campanaID: [''],
      eventoID: [''],
      observacion: [''],
    })
  }

  //controls Buscar
  get f_B() {
    return this.form_buscar.controls;
  }

  //controls Agregar
  get f_A() {
    return this.form_agregar.controls;
  }
  
  //Cambio a padre
  cambiar_valor_Padre() {
    this.donante_variable.emit(this.form_buscar.value.buscarID);
  }

  buscar_donante() {
    //spinner
    var spinner_buscar_donacion = document.getElementById("spinner_buscar_donacion");
    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {
      this.form_buscar.disable();
      var response = this.http.get(this.url + "Donacion/" + this.form_buscar.value.buscarID);
      response.subscribe((resultado: any[]) => {
        this.form_agregar.patchValue(resultado);

        spinner_buscar_donacion.setAttribute("hidden", "true");
        this.form_buscar.enable();
      },
        error => {
          spinner_buscar_donacion.setAttribute("hidden", "true");
          console.log("Error", error)
        });
    }
  }


  opcion_donante() {
    this.submit_agregar = true;
    if (this.form_agregar.invalid) {
      return;
    }
    else {
      var r = confirm("¿Esta seguro que desea " + this.agregar_o_modificar + " donante?");
      if (r == false) {
        return;
      }
      if (this.agregar_o_modificar == "nuevo") {
        console.log("Creando ...");
        this.agregar_donante();
      }
      else if (this.agregar_o_modificar == "modificar") {
        console.log("Modificando ...");
        this.modificar_donante();
      }
      else {
        console.log("se fue a ninguno")
      }
    }
  }

   //Obtener nuevo miembro 
	get_nuevo_donacion(){
		var response = this.http.get(this.url + "ultimoDonacion");
		response.subscribe((resultado : number)=> {
      
//nombres
// apellidos
// nombrefiscal
// status
// email
// tipodonante
// fechanacimiento
// edad
// fechadonacion
// liderID
// campanaID
// eventoID
// observacion
			this.form_agregar.get('donacionID').setValue(resultado + 1);

			console.log(resultado + 1);
		},
		error =>{
			console.log("Error", error)
		});
	}

  agregar_donante() {
    //Spiner
    var spinner_agregar_donacion = document.getElementById("spinner_agregar_donacion");
    spinner_agregar_donacion.removeAttribute("hidden");
    //fecha
    var datePipe = new DatePipe("en-US");
    this.fecha1 = datePipe.transform(this.fecha1, 'yyyy/MM/dd');
    this.form_agregar.get('fechanacimiento').setValue(this.fecha1);
    this.fecha2 = datePipe.transform(this.fecha2, 'yyyy/MM/dd');
    this.form_agregar.get('fechadonacion').setValue(this.fecha2);

    //Donacion
    this.http.post(this.url + "Donacion", this.form_agregar.value).subscribe(data => {
      this.crear_tabla("Contacto", "contactoID", this.form_agregar.value.donacionID);
      this.crear_tabla("Telefonodonante", "telefonoID", this.form_agregar.value.donacionID);
      this.crear_tabla("FormaDonacion", "formadonacionID", this.form_agregar.value.donacionID);
      this.crear_tabla("DireccionDonante", "direcciondonanteID", this.form_agregar.value.donacionID);
      this.crear_tabla("NotasDonantes", "notaID", this.form_agregar.value.donacionID);
      this.crear_tabla("DFiscal", "datosfiscalesID", this.form_agregar.value.donacionID);
      alert("Donacion Agregada");
      spinner_agregar_donacion.setAttribute("hidden", "true");
      this.clean_Agregar();
    },
      error => {
        spinner_agregar_donacion.setAttribute("hidden", "true");
        console.log("Error", error);
      });

  }

  crear_tabla(tabla: string, columnaID: string, valorID: number) {
    var datos_aux = JSON.parse('{"' + columnaID + '":' + valorID + ', "donacionID":' + valorID + '}');
    this.http.post(this.url + tabla, datos_aux).subscribe(data => {
      console.log("Se han guardado: " + tabla);
    },
      error => {
        console.log("Error al guardar en la tabla: " + tabla, error);
      });
  }
  modificar_donante() {
    var spinner_agregar_donacion = document.getElementById("spinner_agregar_donacion");
    spinner_agregar_donacion.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "Donacion/" + this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data => {
      spinner_agregar_donacion.setAttribute("hidden", "true");
      alert("Donacion Modificado");
      this.clean_Agregar();
      this.clean_Buscar();
    },
      error => {
        spinner_agregar_donacion.setAttribute("hidden", "true");
        console.log("Error", error);
      });
  }

  //reset buscar
  clean_Buscar() {
    this.submit_buscar = false;
    this.form_buscar.reset();
  }

  //reset agregar
  clean_Agregar() {
    this.submit_agregar = false;
    this.form_agregar.reset();
  }

  radioChange(event: any) {
    this.agregar_o_modificar = event.target.value;
    var donacion_btn_buscar = document.getElementById("donacion_btn_buscar");

    if (this.agregar_o_modificar == "nuevo") {
      this.clean_Agregar();
      this.clean_Buscar();

      donacion_btn_buscar.setAttribute("disabled", "true");
    }
    else if (this.agregar_o_modificar == "modificar") {
      donacion_btn_buscar.removeAttribute("disabled");
      donacion_btn_buscar.setAttribute("enable", "true");

      this.clean_Agregar();
      this.clean_Buscar();
    }
  }
}
