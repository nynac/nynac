import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dfiscales-donante',
  templateUrl: './dfiscales-donante.component.html',
  styleUrls: ['./dfiscales-donante.component.css']
})
export class DFiscalesDonanteComponent implements OnInit {
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
    datosfiscalesID:[''],
    donacionID: ['', Validators.required],
    rfc :['', Validators.required],
    nombre :['', Validators.required],
    calle	:[''],
    noexterior:[''],
    nointerior:[''],
    colonia	:[''],
    cp :[''],
    pais 	:['', Validators.required],
    estado:['', Validators.required],
    municipio	:['', Validators.required],
    email1:[''],
    email2 :[''],

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

buscar_dfiscales() {
  //spinner
  var spinner_buscar_dfiscales = document.getElementById("spinner_buscar_dfiscales");
  this.submit_buscar = true;

  if (this.form_buscar.invalid) {
    return;
  }
  else {
    spinner_buscar_dfiscales.removeAttribute("hidden");
    //select mediante el id
    var response = this.http.get(this.url + "DFiscal/" + this.form_buscar.value.buscarID);
    response.subscribe((data: any[]) => {
      this.resultado = data;

      this.form_agregar.get('datosfiscalesID').setValue(this.resultado.datosfiscalesID);
      this.form_agregar.get('donacionID').setValue(this.resultado.donacionID);

      this.form_agregar.get('rfc').setValue(this.resultado.rfc);
      this.form_agregar.get('nombre').setValue(this.resultado.nombre);
      this.form_agregar.get('calle').setValue(this.resultado.calle);
      this.form_agregar.get('noexterior').setValue(this.resultado.noexterior);
      this.form_agregar.get('nointerior').setValue(this.resultado.nointerior);
      this.form_agregar.get('colonia').setValue(this.resultado.colonia);
      this.form_agregar.get('cp').setValue(this.resultado.cp);
      this.form_agregar.get('pais').setValue(this.resultado.pais);
      this.form_agregar.get('estado').setValue(this.resultado.estado);
      this.form_agregar.get('municipio').setValue(this.resultado.municipio);
      this.form_agregar.get('email1').setValue(this.resultado.email1);
      this.form_agregar.get('email2').setValue(this.resultado.email2);
      spinner_buscar_dfiscales.setAttribute("hidden", "true");
    },
      error => {
        spinner_buscar_dfiscales.setAttribute("hidden", "true");
        console.log("Error", error)
      });
  }
}

modificar_dfiscales() {
  var spinner_agregar_dfiscales = document.getElementById("spinner_agregar_dfiscales");
  spinner_agregar_dfiscales.removeAttribute("hidden");

  //Update mediante el id y los campos de agregar
  this.http.put(this.url + "DFiscal/" + this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data => {
    spinner_agregar_dfiscales.setAttribute("hidden", "true");
    alert("Datos Fiscales Modificado");
    this.clean_Agregar();
    this.clean_Buscar();
  },
    error => {
      spinner_agregar_dfiscales.setAttribute("hidden", "true");
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

