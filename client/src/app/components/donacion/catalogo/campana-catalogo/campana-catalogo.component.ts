import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'campana-catalogo',
  templateUrl: './campana-catalogo.component.html',
  styleUrls: ['./campana-catalogo.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class CampanaCatalogoComponent implements OnInit {
//busqueda
resultado: any;
//fechas
model2: any;
//Tabla
arreglo: any;

//radio Option
agregar_o_modificar: string = 'nuevo';

  //Formularios
  form_buscar : FormGroup;
  form_agregar : FormGroup;
  
  //validacion
  submit_buscar = false;
	submit_agregar= false;


  url = "https://api-remota.conveyor.cloud/api/";

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder

  ) { }

  ngOnInit() {
    //Se rellena los campos al formulario 
    //buscar
		this.form_buscar = this.formBuilder.group({
			buscarID: ['', Validators.required],
    })

    //agregar
    this.form_agregar = this.formBuilder.group({
      campanaID: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      
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

	buscar_campana(){
	 //spinner
   var spinner_buscar_campana = document.getElementById("spinner_buscar_campana");

   this.submit_buscar = true;
   if (this.form_buscar.invalid) {
     return;
   }
   else {

     spinner_buscar_campana.removeAttribute("hidden");
     //select mediante el id
     var response = this.http.get(this.url + "Campana/" + this.form_buscar.value.buscarID);
     response.subscribe((data: any[]) => {
       this.resultado = data;
       //transformar fecha formato
       var datePipe = new DatePipe("en-US");
       this.resultado.fecha = datePipe.transform(this.resultado.fecha, 'yyyy/MM/dd');

       this.form_agregar.get('campanaID').setValue(this.resultado.campanaID);
       this.form_agregar.get('descripcion').setValue(this.resultado.descripcion);
       this.form_agregar.get('fecha').setValue(this.resultado.fecha);
       spinner_buscar_campana.setAttribute("hidden", "true");
     },
       error => {
         spinner_buscar_campana.setAttribute("hidden", "true");
         console.log("Error", error)
       });
   }
  }

  opcion_campana() {
    this.submit_agregar = true;
    if (this.form_agregar.invalid) {
      return;
    }
    else {
      var r = confirm("¿Esta seguro que desea " + this.agregar_o_modificar + " Campaña?");
      if (r == false) {
        return;
      }
      if (this.agregar_o_modificar == "nuevo") {
        console.log("Creando ...");
        this.agregar_campana();
      }
      else if (this.agregar_o_modificar == "modificar") {
        console.log("Modificando ...");
        this.modificar_campana();
      }
      else {
        console.log("se fue a ninguno")
      }
    }
  }

  agregar_campana(){
	//Spiner
  var spinner_agregar_campana = document.getElementById("spinner_agregar_campana");
  spinner_agregar_campana.removeAttribute("hidden");
  //fecha
  var datePipe = new DatePipe("en-US");
  this.model2 = datePipe.transform(this.model2, 'yyyy/MM/dd');
  this.form_agregar.get('fecha').setValue(this.model2);

  this.http.post(this.url + "Campana", this.form_agregar.value).subscribe(data => {
    spinner_agregar_campana.setAttribute("hidden", "true");
    alert("Campaña Guardado");
    this.clean_Agregar();
  },
    error => {
      spinner_agregar_campana.setAttribute("hidden", "true");
      console.log("Error", error);
    });
  }
  
  
  modificar_campana() {
    var spinner_agregar_campana = document.getElementById("spinner_agregar_campana");
    spinner_agregar_campana.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "Campana/" + this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data => {
      spinner_agregar_campana.setAttribute("hidden", "true");
      alert("Campaña Modificado");
      this.clean_Agregar();
      this.clean_Buscar();
    },
      error => {
        spinner_agregar_campana.setAttribute("hidden", "true");
        console.log("Error", error);
      });
  }

  //reset buscar
	clean_Buscar(){
		this.submit_buscar =false;
		this.form_buscar.reset();
  }
  
  //reset agregar
  clean_Agregar(){
		this.submit_agregar =false;
		this.form_agregar.reset();
	}


  
	radioChange(event: any){
		this.agregar_o_modificar = event.target.value;
		var campana_btn_buscar = document.getElementById("campana_btn_buscar");

		if (this.agregar_o_modificar == "nuevo"){
			this.clean_Agregar();
			this.clean_Buscar();

			campana_btn_buscar.setAttribute("disabled", "true");
		}
		else if(this.agregar_o_modificar == "modificar"){
			campana_btn_buscar.removeAttribute("disabled");
      campana_btn_buscar.setAttribute("enable", "true");
      
			this.clean_Agregar();
			this.clean_Buscar();
		}
	}
}
