import { Component, OnInit } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
//Formularios
form_buscar : FormGroup;
//validacion
submit_buscar = false;

url = "https://api-remota.conveyor.cloud/api/";

constructor(private http : HttpClient, private formBuilder: FormBuilder) { }

ngOnInit() {
//Se rellena los campos al formulario 
//buscar
this.form_buscar = this.formBuilder.group({
  donanteID: [''],
  nombre: [''],
  tipodonante: [''],
  tipodonacion: [''],
  lider: [''],
  campana: [''],
  evento: [''],
})
}

//controls Buscar
get f_B() {
return this.form_buscar.controls;
}

buscar_donante() {
this.submit_buscar = true;
if (this.form_buscar.invalid) {
  return;
}
else {
  alert("Boton buscar");
}
}

//reset buscar
clean_Buscar() {
this.submit_buscar = false;
this.form_buscar.reset();
}

}
