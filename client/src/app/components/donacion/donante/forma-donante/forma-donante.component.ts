import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'forma-donante',
  templateUrl: './forma-donante.component.html',
  styleUrls: ['./forma-donante.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class FormaDonanteComponent implements OnInit {
  //busqueda
  resultado: any;
  miembro:any;
  //fechas
  fecha1: any;
  fecha2: any;
  fecha3: any;
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
  formadonacionID: [''],
  donacionID:[''],
  tipodonacion: ['', Validators.required],
  monto: ['', Validators.required],
  banco: [''],
  estatus: ['', Validators.required],
  numero: [''],
  codigo: [''],
  vence: [this.fecha1],
  primerpago: [this.fecha2],
  cargo: [''],
  frecuencia: ['', Validators.required],
  ultimopago: [this.fecha3],
  observacion: [''],
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

buscar_fdonante() {
  //spinner
  var spinner_buscar_fdonante = document.getElementById("spinner_buscar_fdonante");

  this.submit_buscar = true;
  if (this.form_buscar.invalid) {
    return;
  }
  else {
//Cambiar la busqueda 
    spinner_buscar_fdonante.removeAttribute("hidden");
    //select mediante el id
    var response = this.http.get(this.url + "FormaDonacion/" + this.form_buscar.value.buscarID);
    response.subscribe((data: any[]) => {
      this.resultado = data;
      //transformar fecha formato
      var datePipe = new DatePipe("en-US");
      this.resultado.vence = datePipe.transform(this.resultado.vence, 'yyyy/MM/dd');
      this.resultado.primerpago = datePipe.transform(this.resultado.primerpago, 'yyyy/MM/dd');
      this.resultado.ultimopago = datePipe.transform(this.resultado.ultimopago, 'yyyy/MM/dd');
      
      this.form_agregar.get('formadonacionID').setValue((this.resultado.formadonacionID));
      this.form_agregar.get('donacionID').setValue((this.resultado.donacionID));
      this.form_agregar.get('tipodonacion').setValue(this.resultado.tipodonacion);
      this.form_agregar.get('monto').setValue(this.resultado.monto);
      this.form_agregar.get('banco').setValue(this.resultado.banco);
      this.form_agregar.get('estatus').setValue(this.resultado.estatus);
      this.form_agregar.get('numero').setValue(this.resultado.numero);
      this.form_agregar.get('codigo').setValue(this.resultado.codigo);
      this.form_agregar.get('vence').setValue(this.resultado.vence);
      this.form_agregar.get('primerpago').setValue(this.resultado.primerpago);
      this.form_agregar.get('cargo').setValue(this.resultado.cargo);
      this.form_agregar.get('frecuencia').setValue(this.resultado.frecuencia);
      this.form_agregar.get('ultimopago').setValue(this.resultado.ultimopago);
      this.form_agregar.get('observacion').setValue(this.resultado.observacion);
      spinner_buscar_fdonante.setAttribute("hidden", "true");
    },
      error => {
        spinner_buscar_fdonante.setAttribute("hidden", "true");
        console.log("Error", error)
      });
  }
}

agregar_donante() {
  this.submit_agregar = true;
  if (this.form_agregar.invalid) {
    return;
  }
  else {
    console.log(this.form_agregar.value);
    alert("Boton agregar");
  }
}

modificar_fdonante() {
  this.form_agregar.get('vence').setValue(this.fecha1);
  this.form_agregar.get('primerpago').setValue(this.fecha2);
  this.form_agregar.get('ultimopago').setValue(this.fecha2);
    var spinner_agregar_contacto = document.getElementById("spinner_agregar_contacto");
    spinner_agregar_contacto.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "FormaDonacion/" + this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data => {
      spinner_agregar_contacto.setAttribute("hidden", "true");
      alert("FormaDonacion Modificada");
      this.clean_Agregar();
      this.clean_Buscar();
    },
      error => {
        spinner_agregar_contacto.setAttribute("hidden", "true");
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

radioChange(event: any){
  this.agregar_o_modificar = event.target.value;
  var fdonacion_btn_buscar = document.getElementById("fdonacion_btn_buscar");

  if (this.agregar_o_modificar == "nuevo"){
    this.clean_Agregar();
    this.clean_Buscar();

    fdonacion_btn_buscar.setAttribute("disabled", "true");
  }
  else if(this.agregar_o_modificar == "modificar"){
    fdonacion_btn_buscar.removeAttribute("disabled");
    fdonacion_btn_buscar.setAttribute("enable", "true");
    
    this.clean_Agregar();
    this.clean_Buscar();
  }
}
}
