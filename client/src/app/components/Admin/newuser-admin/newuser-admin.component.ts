import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-newuser-admin',
  templateUrl: './newuser-admin.component.html',
  styleUrls: ['./newuser-admin.component.css']
})
export class NewuserAdminComponent implements OnInit {
//busqueda
resultado: any;
//type
tipo: number=0;
//Tabla
arreglo: any;
  //Formularios
  datos_miembro : any;
  form_config : FormGroup;  
  //validacion
  submit_config = false;

  url = "https://api-remota.conveyor.cloud/api/";

  constructor( private http: HttpClient,   private formBuilder: FormBuilder ) {   }

  ngOnInit() {
    //Se rellena los campos al formulario 
    //buscar
		this.form_config = this.formBuilder.group({
      usuarioID: ['', Validators.required],
      miembroID: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      contrasena: ['', Validators.required],
      correo: ['', Validators.required],
      puesto: ['', Validators.required],
      tel1: [],
      tel2: [],
      direccion: [],
      fechanacimiento: [],
      nacionalidad: [],
      estado: [],
      status:[],
      sede:['', Validators.required],
    })
    this.	obtener_ultimo_miembro();

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

  //controls Buscar
  get f2() { 
    return this.form_config.controls;
  }

  //Obtiene el último miembroID de la tabla miembros
	obtener_ultimo_miembro(){
		var response = this.http.get(this.url + "ultimoMiembro");
		response.subscribe((resultado : number)=> {
			this.form_config.get('usuarioID').setValue(resultado + 1);
			this.form_config.get('miembroID').setValue(resultado + 1);
		},
		error =>{
			console.log("Error al obtener el último miembroID", error)
		});
  }
  
  //registrar usuario
  agregar_miembro(){
    this.obtener_ultimo_miembro();
    
    this.datos_miembro = {
			miembroID : this.form_config.value.miembroID,
			estado : this.form_config.value.status,
			tipo : "Usuario",
			sede: this.form_config.value.sede
		}
    this.http.post(this.url + 'miembro', this.datos_miembro).subscribe(data  => {
      console.log('Miembro guardado');
      this.agregar_usuario();
    },
      error => {
        console.log("Error", error);
      });
    }
    
    agregar_usuario(){
      this.http.post(this.url + 'Usuarios', this.form_config.value).subscribe(data  => {
        console.log('Usuario guardado');
      },
        error => {
          console.log("Error", error);
        });
    }

//   //Modificar
// //llenar campos
// 	buscar_usuario(){
//       this.submit_config = true;
//      if (this.form_config.invalid) {
//        return;
//      }
//      else {
//        //select mediante el id
//        console.log(this.form_config.value.miembroID);
//         var response = this.http.get(this.url + "Usuario/id?id=" + this.form_config.value.miembroID);
//        response.subscribe((data: any[]) => {
//          this.resultado = data;
//          console.log(this.resultado);
//          //transformar fecha formato
//          var datePipe = new DatePipe("en-US");
//          this.resultado[0].fechanacimiento = datePipe.transform(this.resultado[0].fechanacimiento, 'yyyy-MM-dd');
  
//          this.form_config.get('usuarioID').setValue(this.resultado[0].usuarioID);
//          this.form_config.get('miembroID').setValue(this.resultado[0].miembroID);
//          this.form_config.get('nombre').setValue(this.resultado[0].nombre);
//          this.form_config.get('apellidos').setValue(this.resultado[0].apellidos);
//          this.form_config.get('contrasena').setValue(this.resultado[0].contrasena);
//          this.form_config.get('correo').setValue(this.resultado[0].correo);
//          this.form_config.get('puesto').setValue(this.resultado[0].puesto);
//          this.form_config.get('tel1').setValue(this.resultado[0].tel1);
//          this.form_config.get('tel2').setValue(this.resultado[0].tel2);
//          this.form_config.get('direccion').setValue(this.resultado[0].direccion);
//          this.form_config.get('fechanacimiento').setValue(this.resultado[0].fechanacimiento);
//          this.form_config.get('nacionalidad').setValue(this.resultado[0].nacionalidad);
//          this.form_config.get('estado').setValue(this.resultado[0].estado);
//          console.log(this.form_config.value.miembroID);
//        },
//          error => {
//            console.log("Error", error)
//          });
//      }
//     }

  
  // //List Usuarios
  // get_Usuarios() {
  //   var response = this.http.get(this.url + "Campana/");
  //   response.subscribe((data: any[]) => {
  //     // this.arrayCampana = data;
  //   },
  //     error => {
  //       console.log("Error", error)
  //     });
  // }

  
  //modificar
  modificar_Usuario() {
    var spinner_agregar_campana = document.getElementById("spinner_agregar_campana");
    spinner_agregar_campana.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "Campana/" + this.form_config.value.buscarID, this.form_config.value).subscribe(data => {
      spinner_agregar_campana.setAttribute("hidden", "true");
      alert("Campaña Modificado");
    },
      error => {
        spinner_agregar_campana.setAttribute("hidden", "true");
        console.log("Error", error);
      });
  }
}
