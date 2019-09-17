import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'evento-catalogo',
  templateUrl: './evento-catalogo.component.html',
  styleUrls: ['./evento-catalogo.component.css']
})
export class EventoCatalogoComponent implements OnInit {
//Formularios
form_buscar : FormGroup;
form_agregar : FormGroup;

//validacion
submit_buscar = false;
submit_agregar= false;

  url = "https://api-remota.conveyor.cloud/api/";

	constructor(private http : HttpClient, private formBuilder: FormBuilder) { }


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

  buscar_evento(){
		this.submit_buscar = true;
		if (this.form_buscar.invalid) {
			return;
		}
		else{
      alert(this.form_buscar.value);
		}
  }
  
  agregar_evento(){
		this.submit_agregar = true;
		if (this.form_agregar.invalid) {
			return;
		}
		else{
      console.log(this.form_agregar.value);
      this.http.post(this.url + "Eventoe", this.form_agregar.value).subscribe(data  => {
        console.log("Registro exitoso ", data);
        alert("Evento Guardado");
        this.clean_Agregar();
      },
      error  => {
        console.log("Error", error);
      });
		}
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
}
