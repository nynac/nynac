import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'direccion-donante',
  templateUrl: './direccion-donante.component.html',
  styleUrls: ['./direccion-donante.component.css']
})
export class DireccionDonanteComponent implements OnInit {
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
    tipodireccion1 :['', Validators.required],	
    calle1	:['', Validators.required],		
    noexterior1 :[''],	
    nointerior1 :[''],	
    colonia1:['', Validators.required], 		
    cp1 :['', Validators.required],			
    pais1 :['', Validators.required],			
    estado1 :['', Validators.required],		
    municipio1:['', Validators.required], 	
    tipodireccion2 :[''],	
    calle2	:[''],		
    noexterior2 :[''],	
    nointerior2 :[''],	
    colonia2 	:[''],	
    cp2 :[''],			
    pais2 :[''],			
    estado2 :[''],		
    municipio2:[''],
    tipodireccion3 :[''],	
    calle3	:[''],		
    noexterior3:[''], 	
    nointerior3 :[''],	
    colonia3 :[''],		
    cp3 :[''],			
    pais3 :[''],			
    estado3 :[''],		
    municipio3:[''],	
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

buscar_direccion() {
  this.submit_buscar = true;
  if (this.form_buscar.invalid) {
    return;
  }
  else {
    alert("Boton buscar");
  }
}

agregar_direccion() {
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

