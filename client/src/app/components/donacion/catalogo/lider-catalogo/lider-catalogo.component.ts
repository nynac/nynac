import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lider-catalogo',
  templateUrl: './lider-catalogo.component.html',
  styleUrls: ['./lider-catalogo.component.css']
})
export class LiderCatalogoComponent implements OnInit {
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
      liderID: ['', Validators.required],
      descripcion: ['', Validators.required],
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

  buscar_lider() {
    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {
      alert(this.form_buscar.value);
    }
  }

  agregar_lider() {
    this.submit_agregar = true;
    if (this.form_agregar.invalid) {
      return;
    }
    else {
      alert("Boton agregar");
    }
  }

  //reset buscar
  clean_Buscar() {
    this.submit_buscar = false;
    this.form_buscar.reset();
  }

  //reset agregar
  clear_Agregar() {
    this.submit_agregar = false;
    this.form_agregar.reset();
  }


}
