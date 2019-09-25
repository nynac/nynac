import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';


@Component({ 
  selector: 'telefono-donante',
  templateUrl: './telefono-donante.component.html',
  styleUrls: ['./telefono-donante.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class TelefonoDonanteComponent implements OnInit {

  //busqueda
  resultado: any;
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

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  ngOnInit() {
    //Se rellena los campos al formulario 
    //buscar
    this.form_buscar = this.formBuilder.group({
      buscarID: ['', Validators.required],
    })

    //agregar
    this.form_agregar = this.formBuilder.group({
      telefonoID:[''],
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
    var spinner_buscar_telefono = document.getElementById("spinner_buscar_telefono");
    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {
      spinner_buscar_telefono.removeAttribute("hidden");
      //select mediante el id
      var response = this.http.get(this.url + "Telefonodonante/" + this.form_buscar.value.buscarID);
      response.subscribe((data: any[]) => {
        this.resultado = data;
  
        this.form_agregar.get('telefonoID').setValue(this.resultado.telefonoID);
        this.form_agregar.get('donacionID').setValue(this.resultado.donacionID);
        this.form_agregar.get('tipo1').setValue(this.resultado.tipo1);
        this.form_agregar.get('telefono1').setValue(this.resultado.telefono1);
        this.form_agregar.get('lada1').setValue(this.resultado.lada1);
        this.form_agregar.get('extension1').setValue(this.resultado.extension1);
        this.form_agregar.get('observacion1').setValue(this.resultado.observacion1);
        this.form_agregar.get('tipo2').setValue(this.resultado.tipo2);
        this.form_agregar.get('telefono2').setValue(this.resultado.telefono2);
        this.form_agregar.get('lada2').setValue(this.resultado.lada2);
        this.form_agregar.get('extension2').setValue(this.resultado.extension2);
        this.form_agregar.get('observacion2').setValue(this.resultado.relacion2);
        this.form_agregar.get('tipo3').setValue(this.resultado.tipo3);
        this.form_agregar.get('telefono3').setValue(this.resultado.telefono3);
        this.form_agregar.get('lada3').setValue(this.resultado.lada3);
        this.form_agregar.get('extension3').setValue(this.resultado.extension3);
        this.form_agregar.get('observacion3').setValue(this.resultado.observacion3);
        
        spinner_buscar_telefono.setAttribute("hidden", "true");
      },
        error => {
          spinner_buscar_telefono.setAttribute("hidden", "true");
          console.log("Error", error)
        });
    }
  }

  modificar_telefono() {
    var spinner_agregar_telefono = document.getElementById("spinner_agregar_telefono");
    spinner_agregar_telefono.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "Telefonodonante/" + this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data => {
      spinner_agregar_telefono.setAttribute("hidden", "true");
      alert("Telefono Modificado");
      this.clean_Agregar();
      this.clean_Buscar();
    },
      error => {
        spinner_agregar_telefono.setAttribute("hidden", "true");
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

}


