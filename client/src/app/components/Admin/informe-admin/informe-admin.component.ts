import { Component, OnInit } from '@angular/core';

import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'informe-admin',
  templateUrl: './informe-admin.component.html',
  styleUrls: ['./informe-admin.component.css']
})
export class InformeAdminComponent implements OnInit {
//busqueda
resultado: any;
//type
tipo: number=0;
//Tabla
arreglo: any;
  //Formularios
  form_config : FormGroup;  
  //validacion
  submit_config = false;

  url = "https://api-remota.conveyor.cloud/api/";

  constructor( private http: HttpClient,   private formBuilder: FormBuilder ) {   }

  ngOnInit() {
    //Se rellena los campos al formulario 
    //buscar
		this.form_config = this.formBuilder.group({
      usuarioID: [],
      miembroID: [],
      nombre: [],
      puesto: [],
      fechanacimiento: [],
      nacionalidad: [],
      estado: [],
      status:[],
      sede:[],
    })
    this.buscar_usuario();
  }
  
  heiden_pass() {
    var informe_see = document.getElementById("informe_see");
    if (this.tipo === 0) {
      informe_see.setAttribute("type", "text");
      this.tipo=1;
    } else {
      informe_see.setAttribute("type", "password");
      this.tipo=0;
    }
  }

  //controls Buscar
  get f_A() { 
    return this.form_config.controls;
  }

  // +localStorage.getItem("sede")
  
  //Modificar
//llenar campos
	buscar_usuario(){
      this.submit_config = true;
     if (this.form_config.invalid) {
       return;
     }
     else {
       //select mediante el id
        var response = this.http.get(this.url 
         + "usuario/buscador?Rsede="+this.form_config.value.sede
         + "&rmiembroid=0&Rstatus=null&Rnacionalidad=null&Restado=null&Rnombre=null&Rpuesto=null"
          );
       response.subscribe((data: any[]) => {
         this.resultado = data;       
       },
         error => {
           console.log("Error", error)
         });
     }
    }

  
  llenar(id : any){
    console.log(id);
    //select mediante el id
    var response = this.http.get(this.url 
      + "usuario/buscador?Rsede="+this.form_config.value.sede
      + "&rmiembroid="+id
      +"&Rstatus=null&Rnacionalidad=null&Restado=null&Rnombre=null"
       );
    response.subscribe((data: any[]) => {
      this.arreglo = data;
      console.log(this.arreglo[0]);
      this.form_config.patchValue(this.arreglo[0]);
    },
      error => {
        console.log("Error", error)
      });
  }
  modificar(){
    var spinner_informe = document.getElementById("spinner_informe");
    spinner_informe.removeAttribute("hidden");
    this.modificar_miembro();
    this.modificar_usuario();
    alert("Usuario Modificado Correctamente.");

    spinner_informe.setAttribute("hidden", "true");
  }

  modificar_miembro(){
    this.http.put(this.url + "Miembro/" + this.form_config.value.miembroID, this.form_config.value).subscribe(data => {
      
    },
      error => {
        console.log("Error", error);
      });
  }

  modificar_usuario(){
    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "Usuarios/" + this.form_config.value.miembroID, this.form_config.value).subscribe(data => {
      alert("Usuario Modificado Correctamente.");
    },
      error => {
        console.log("Error", error);
      });
  }
}
