import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'evento-catalogo',
  templateUrl: './evento-catalogo.component.html',
  styleUrls: ['./evento-catalogo.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EventoCatalogoComponent implements OnInit {
  //busqueda
  resultado: any;
  //fechas
  model2: any;
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

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    //Se rellena los campos al formulario 
    //buscar
    this.form_buscar = this.formBuilder.group({
      buscarID: ['', Validators.required],
    })

    //agregar
    this.form_agregar = this.formBuilder.group({
      eventoID: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: [this.model2,],

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

  buscar_evento() {
    //spinner
    var spinner_buscar = document.getElementById("spinner_buscar");

    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {

      spinner_buscar.removeAttribute("hidden");
      //select mediante el id
      var response = this.http.get(this.url + "Eventoe/" + this.form_buscar.value.buscarID);
      response.subscribe((data: any[]) => {
        this.resultado = data;
        //transformar fecha formato
        var datePipe = new DatePipe("en-US");
        this.resultado.fecha = datePipe.transform(this.resultado.fecha, 'yyyy/MM/dd');

        this.form_agregar.get('eventoID').setValue(this.resultado.eventoID);
        this.form_agregar.get('descripcion').setValue(this.resultado.descripcion);
        this.form_agregar.get('fecha').setValue(this.resultado.fecha);
        spinner_buscar.setAttribute("hidden", "true");
      },
        error => {
          spinner_buscar.setAttribute("hidden", "true");
          console.log("Error", error)
        });
    }
  }

  opcion_evento() {
    this.submit_agregar = true;
    if (this.form_agregar.invalid) {
      return;
    }
    else {
      var r = confirm("¿Esta seguro que desea " + this.agregar_o_modificar + " Evento?");
      if (r == false) {
        return;
      }
      if (this.agregar_o_modificar == "nuevo") {
        console.log("Creando ...");
        this.agregar_evento();
      }
      else if (this.agregar_o_modificar == "modificar") {
        console.log("Modificando ...");
        this.modificar_evento();
      }
      else {
        console.log("se fue a ninguno")
      }
    }
  }

  agregar_evento() {
    //Spiner
    var spinner_agregar = document.getElementById("spinner_agregar");
    spinner_agregar.removeAttribute("hidden");
    //fecha
    var datePipe = new DatePipe("en-US");
    this.model2 = datePipe.transform(this.model2, 'yyyy/MM/dd');
    this.form_agregar.get('fecha').setValue(this.model2);

    this.http.post(this.url + "Eventoe", this.form_agregar.value).subscribe(data => {
      spinner_agregar.setAttribute("hidden", "true");
      alert("Evento Guardado");
      this.clean_Agregar();
    },
      error => {
        spinner_agregar.setAttribute("hidden", "true");
        console.log("Error", error);
      });
  }

  modificar_evento() {
    var spinner_agregar = document.getElementById("spinner_agregar");
    spinner_agregar.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "Eventoe/" + this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data => {
      spinner_agregar.setAttribute("hidden", "true");
      alert("Evento Modificado");
      this.clean_Agregar();
      this.clean_Buscar();
    },
      error => {
        spinner_agregar.setAttribute("hidden", "true");
        console.log("Error", error);
      });
  }


  // //get all
  // select_todo() {
  //   //select mediante el id
  //   var response = this.http.get(this.url + "Eventoe");
  //   response.subscribe((data: any[]) => {
  //     this.arreglo = data;
  //     //transformar fecha formato
  //     var datePipe = new DatePipe("en-US");
  //     this.arreglo.fecha = datePipe.transform(this.arreglo.fecha, 'dd/MM/yyyy');
  //     console.log(this.arreglo[0]);

  //   },
  //     error => {
  //       console.log("Error", error)
  //     });
  // }

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

	radioChange(event: any){
		this.agregar_o_modificar = event.target.value;
		var evento_btn_buscar = document.getElementById("evento_btn_buscar");

		if (this.agregar_o_modificar == "nuevo"){
			this.clean_Agregar();
			this.clean_Buscar();

			evento_btn_buscar.setAttribute("disabled", "true");
		}
		else if(this.agregar_o_modificar == "modificar"){
			evento_btn_buscar.removeAttribute("disabled");
      evento_btn_buscar.setAttribute("enable", "true");
      
			this.clean_Agregar();
			this.clean_Buscar();
		}
	}
}
