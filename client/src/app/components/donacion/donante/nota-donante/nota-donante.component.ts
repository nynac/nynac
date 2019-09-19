import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nota-donante',
  templateUrl: './nota-donante.component.html',
  styleUrls: ['./nota-donante.component.css']
})
export class NotaDonanteComponent implements OnInit {
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
  donacionID: ['', Validators.required],
  nota 	:['',Validators.required],	
statusnota :['',Validators.required],	
programar :['',Validators.required],	
responsable :['',Validators.required],

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

buscar_nota() {
this.submit_buscar = true;
if (this.form_buscar.invalid) {
  return;
}
else {
  alert("Boton buscar");
}
}

agregar_nota() {
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
