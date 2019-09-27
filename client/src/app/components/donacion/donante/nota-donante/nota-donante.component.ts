import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nota-donante',
  templateUrl: './nota-donante.component.html',
  styleUrls: ['./nota-donante.component.css']
})
export class NotaDonanteComponent implements OnInit, OnChanges {
  @Input('gl_donante') gl_donante: any;
  @Input() prop!: number;
  
  ngOnChanges(changes: SimpleChanges) {
    console.log("A cambiado");
    if (this.form_buscar !== undefined) {
      this.form_buscar.get('buscarID').setValue(this.gl_donante);
      this.buscar_nota();
    }
  }
  
  @Output() donante_variable= new EventEmitter<number>();
  
//Cambio a padre
cambiar_valor_Padre(){
  this.donante_variable.emit(this.form_buscar.value.buscarID);
}
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
  notaID:[''],
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
//spinner
    var spinner_buscar_nota = document.getElementById("spinner_buscar_nota");
    this.submit_buscar = true;

    if (this.form_buscar.invalid) {
      return;
    }
    else {
      spinner_buscar_nota.removeAttribute("hidden");
      //select mediante el id
      var response = this.http.get(this.url + "NotasDonantes/" + this.form_buscar.value.buscarID);
      response.subscribe((data: any[]) => {
        this.resultado = data;
        
        this.form_agregar.get('notaID').setValue(this.resultado.notaID);
        this.form_agregar.get('donacionID').setValue(this.resultado.donacionID);
        this.form_agregar.get('nota').setValue(this.resultado.nota);
        this.form_agregar.get('statusnota').setValue(this.resultado.statusnota);
        this.form_agregar.get('programar').setValue(this.resultado.programar);
        this.form_agregar.get('responsable').setValue(this.resultado.responsable);
        spinner_buscar_nota.setAttribute("hidden", "true");
      },
        error => {
          spinner_buscar_nota.setAttribute("hidden", "true");
          console.log("Error", error)
        });
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

modificar_nota() {
  var spinner_agregar_nota = document.getElementById("spinner_agregar_nota");
  spinner_agregar_nota.removeAttribute("hidden");

  //Update mediante el id y los campos de agregar
  this.http.put(this.url + "NotasDonantes/" + this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data => {
    spinner_agregar_nota.setAttribute("hidden", "true");
    alert("NotasDonantes Modificado");
    this.clean_Agregar();
    this.clean_Buscar();
  },
    error => {
      spinner_agregar_nota.setAttribute("hidden", "true");
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
  var nota_btn_buscar = document.getElementById("nota_btn_buscar");

  if (this.agregar_o_modificar == "nuevo"){
    this.clean_Agregar();
    this.clean_Buscar();

    nota_btn_buscar.setAttribute("disabled", "true");
  }
  else if(this.agregar_o_modificar == "modificar"){
    nota_btn_buscar.removeAttribute("disabled");
    nota_btn_buscar.setAttribute("enable", "true");
    
    this.clean_Agregar();
    this.clean_Buscar();
  }
}

}
