import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'telefono-donante',
  templateUrl: './telefono-donante.component.html',
  styleUrls: ['./telefono-donante.component.css']
})
export class TelefonoDonanteComponent implements OnInit {
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
      donacionID: ['', Validators.required],
      tipo1: ['', Validators.required],
      telefono1: ['', Validators.required],
      lada1: [''],
      extension1: [''],
      observacion1: [''],
      tipo2: [''],
      telefono2: [''],
      lada2: [''],
      extension2: [''],
      observacion2: [''],
      tipo3: [''],
      telefono3: [''],
      lada3: [''],
      extension3: [''],
      observacion3: [''],

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

  buscar_telefono() {
    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {
      alert("Boton buscar");
    }
  }

  agregar_telefono() {
    this.submit_agregar = true;
    if (this.form_agregar.invalid) {
      return;
    }
    else {
      console.log(this.form_agregar.value);
      alert("Boton agregar");
    }
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

}


