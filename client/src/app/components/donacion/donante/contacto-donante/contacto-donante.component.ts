import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'contacto-donante',
  templateUrl: './contacto-donante.component.html',
  styleUrls: ['./contacto-donante.component.css']
})
export class ContactoDonanteComponent implements OnInit {
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
      nombre1: ['', Validators.required],
      paterno1: ['', Validators.required],
      materno1: [''],
      relacion1: ['', Validators.required],
      calle1: [''],
      colonia1: [''],
      noexterior1: [''],
      nointerior1: [''],
      cp1: [''],
      pais1: ['', Validators.required],
      estado1: ['', Validators.required],
      municipio1: ['', Validators.required],
      email1: ['', Validators.required],
      fechanacimiento1: ['', Validators.required],
      telefono1: ['', Validators.required],
      lada1: [''],
      observacion1: [''],
      nombre2: [''],
      paterno2: [''],
      materno2: [''],
      relacion2: [''],
      calle2: [''],
      colonia2: [''],
      noexterior2: [''],
      nointerior2: [''],
      cp2: [''],
      pais2: [''],
      estado2: [''],
      municipio2: [''],
      email2: [''],
      fechanacimiento2: [''],
      telefono2: [''],
      lada2: [''],
      observacion2: [''],
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

  buscar_contacto() {
    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {
      alert("Boton buscar");
    }
  }

  agregar_contacto() {
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

