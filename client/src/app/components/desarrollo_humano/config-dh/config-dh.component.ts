import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-config-dh',
  templateUrl: './config-dh.component.html',
  styleUrls: ['./config-dh.component.css']
})
export class ConfigDHComponent implements OnInit {
//busqueda
resultado: any;
tipo: number=0;
  //Formularios
  form_config : FormGroup;
  
  //validacion
	submit_config= false;


  url = "https://api-remota.conveyor.cloud/api/";

  constructor(private http: HttpClient,private formBuilder: FormBuilder ) { 
        
  }

  ngOnInit() {
    //Se rellena los campos al formulario 
    //buscar
		this.form_config = this.formBuilder.group({
      usuarioID: [],
      miembroID: [localStorage.getItem("miembroID")],
      nombre: [],
      apellidos: [],
      contrasena: [],
      correo: [],
      puesto: [],
      tel1: [],
      tel2: [],
      direccion: [],
      fechanacimiento: [],
      nacionalidad: [],
      estado: [],
    })
    this.buscar_usuario()

  }

  //controls Agregar
  get f_A() { 
    return this.form_config.controls;
  }
  heiden_pass() {
    var pass = document.getElementById("pass");
    if (this.tipo === 0) {
      pass.setAttribute("type", "text");
      this.tipo=1;
    } else {
      pass.setAttribute("type", "password");
      this.tipo=0;
    }
  }   
	buscar_usuario(){
	  this.submit_config = true;
   if (this.form_config.invalid) {
     return;
   }
   else {
     //select mediante el id
     console.log(this.form_config.value.miembroID);
      var response = this.http.get(this.url + "Usuario/id?id=" + this.form_config.value.miembroID);
     response.subscribe((data: any[]) => {
       this.resultado = data;
       console.log(this.resultado);
       //transformar fecha formato
       var datePipe = new DatePipe("en-US");
       this.resultado[0].fechanacimiento = datePipe.transform(this.resultado[0].fechanacimiento, 'yyyy-MM-dd');

       this.form_config.get('usuarioID').setValue(this.resultado[0].usuarioID);
       this.form_config.get('miembroID').setValue(this.resultado[0].miembroID);
       this.form_config.get('nombre').setValue(this.resultado[0].nombre);
       this.form_config.get('apellidos').setValue(this.resultado[0].apellidos);
       this.form_config.get('contrasena').setValue(this.resultado[0].contrasena);
       this.form_config.get('correo').setValue(this.resultado[0].correo);
       this.form_config.get('puesto').setValue(this.resultado[0].puesto);
       this.form_config.get('tel1').setValue(this.resultado[0].tel1);
       this.form_config.get('tel2').setValue(this.resultado[0].tel2);
       this.form_config.get('direccion').setValue(this.resultado[0].direccion);
       this.form_config.get('fechanacimiento').setValue(this.resultado[0].fechanacimiento);
       this.form_config.get('nacionalidad').setValue(this.resultado[0].nacionalidad);
       this.form_config.get('estado').setValue(this.resultado[0].estado);
       console.log(this.form_config.value.miembroID);
     },
       error => {
         console.log("Error", error)
       });
   }
  }
  
  configuracion() {
    var spinner_config = document.getElementById("spinner_config");
    spinner_config.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "Usuarios/" + localStorage.getItem("miembroID"), this.form_config.value).subscribe(data => {
      spinner_config.setAttribute("hidden", "true");
      alert("Usuario Modificado Correctamente.");
    },
      error => {
        spinner_config.setAttribute("hidden", "true");
        console.log("Error", error);
      });
  }
 
}
