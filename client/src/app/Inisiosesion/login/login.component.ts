import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyserviceService } from '../../myservice.service'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = "https://api-remota.conveyor.cloud/api/";

  //Todo para el alert
  visible : boolean = false;
  tipo : string = "";
  mensaje : string = "";
  duracion: number = 4000; //1000 es 1 SEG

  //form buscar
  form_enviar_correo : FormGroup
  guardando : boolean = false;
  submitted2 = false;
  form_invalid: boolean = false;

  form: FormGroup;
  successmsg: any;
  errmsg: any;

  resultado: any;

  constructor(private Userservice: MyserviceService, private router: Router, private http: HttpClient, ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      grant_type: new FormControl('password'),
    });

    this.form_enviar_correo = new FormGroup({
      correo: new FormControl('', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      
    });
  }

  limpiar_enviar_correo(){
    this.form_enviar_correo.reset();
  }
  get f2() {
    return this.form.controls;
  }

  correo_valido() {
    if (this.form_enviar_correo.invalid) {
      this.mostrar_alert("Rellena los campos", "danger")
      return;
    }
    
    var spinner_correo = document.getElementById("spinner_correo");
    spinner_correo.removeAttribute("hidden");

    var response = this.http.get(this.url + "correo_valido?correo=" + this.form_enviar_correo.value.correo);
    response.subscribe((resultado : any)=> {
      
      this.mostrar_alert("Hemos enviado tus credenciales al correo electronico.", "success")
      spinner_correo.setAttribute("hidden", "true"); 
    },
    error =>{
      this.mostrar_alert("Error al enviar el correo, intentalo mas tarde", "warning")
      spinner_correo.setAttribute("hidden", "true"); 
    });
  }

  mostrar_alert(msg : string, tipo : string){
    this.visible = true;
    this.mensaje = msg;
    this.tipo = tipo;

    setTimeout(() => { 
      this.cerrar_alert();
    }, this.duracion
    );
  }
  cerrar_alert(){
    this.limpiar_enviar_correo();
    this.visible = false;
    this.mensaje = null;
    this.tipo = null;
    this.guardando = false;
  }

  onSubmit() {
    this.errmsg = null;
    var spinner_login = document.getElementById("spinner_login");
    spinner_login.removeAttribute("hidden");
    //select mediante el id
    this.remover();
    var response = this.http.get(this.url + "Usuarioid?id=" + this.form.value.username + "&pass=" + this.form.value.password);
    response.subscribe((data: any[]) => {
      this.resultado = data;
      if (this.resultado[0] != undefined) {
        localStorage.setItem('miembroID', this.resultado[0].miembroID);
        localStorage.setItem('nombre', this.resultado[0].nombre);
        localStorage.setItem('correo', this.resultado[0].correo);
        localStorage.setItem('direccion', this.resultado[0].direccion);
        localStorage.setItem('fechanacimiento', this.resultado[0].fechanacimiento);
        localStorage.setItem('puesto', this.resultado[0].puesto);
        localStorage.setItem('sede', this.resultado[0].sede);
        spinner_login.setAttribute("hidden", "true");

        if (localStorage.getItem("miembroID") == undefined || localStorage.getItem('miembroID') == null) {
          this.errmsg = 'Constraseña o Usuario Incorrecto.';
        } else if (localStorage.getItem("puesto") == "Administrador") {
          this.router.navigate(['']);
        } else if (localStorage.getItem("puesto") == "Recepcion") {
          this.router.navigate(['recepcion/entradas-salidas']);
        } else if (localStorage.getItem("puesto") == "Desarrollo Institucional") {
          this.router.navigate(['/donacion/agregar-donante']);
        } else if (localStorage.getItem("puesto") == "Desarrollo Humano") {
          this.router.navigate(['/desarrollo_humano']);
        } else if (localStorage.getItem("puesto") == "Coordinacion Operativa") {
          this.router.navigate(['/coordinacion_operativa']);
        }
      }
      else {
        spinner_login.setAttribute("hidden", "true");
        this.errmsg = 'Constraseña o Usuario Incorrecto.';
      }
    },
    error => {
      this.errmsg = 'Error en la conexion';
      console.log("Error", error)
    });

  }

  buscar_usuario() {
    //select mediante el id
    var response = this.http.get(this.url + "Usuarioid?id=" + this.form.value.username);
    response.subscribe((data: any[]) => {
      this.resultado = data;
      localStorage.setItem('miembroID', this.resultado.miembroID);
      localStorage.setItem('nombre', this.resultado.nombre);
      localStorage.setItem('apellidos', this.resultado.apellidos);
      localStorage.setItem('correo', this.resultado.correo);
      localStorage.setItem('direccion', this.resultado.direccion);
      localStorage.setItem('fechanacimiento', this.resultado.fechanacimiento);
      localStorage.setItem('puesto', this.resultado.puesto);
    },
    error => {
      console.log("Error", error)
    });
  }

  remover() {
    localStorage.clear()
  }
}  



// this.Userservice.postData(this.form.value).subscribe(respuesta => {
  //   if (respuesta.status === 200) {
    //            //get Usuario   
    //     this.buscar_usuario();
    //     this.successmsg = 'token - ' + respuesta.body.access_token;
    //     localStorage.setItem('access_token', respuesta.body.access_token);        
    //     //redireccion segun role de puesto storage
    //     if (localStorage.getItem("puesto") == "Administrador") {
      //       //componente general miss
      //       this.router.navigate(['/agenda']);
      //     }else if (localStorage.getItem("puesto") == "Recepcion") {
        //       this.router.navigate(['/entradas-salidas']);
        //     } else if (localStorage.getItem("puesto") == "Desarrollo Institucional") {
          //       this.router.navigate(['/donacion/agregar-donante']);
          //     }else if (localStorage.getItem("puesto") == "Desarrollo Humano") {
            //       this.router.navigate(['/desarrollo_humano']);
            //     }
            //     else {
              //       alert('Este Usuario no tiene asignado un Puesto.');
              //     }
              //     spinner_login.setAttribute("hidden", "true");
              //   } else {
                //     this.errmsg = respuesta.status + ' - ' + respuesta.statusText;
                //     spinner_login.setAttribute("hidden", "true");
                //   }
                // },
                //   err => {
                  //     spinner_login.setAttribute("hidden", "true");
                  //     if (err.status === 401) {
                    //       this.errmsg = 'Contraseña o Usuario invalido.';
                    //     }
                    //     else if (err.status === 400) {
                      //       this.errmsg = 'Contraseña o Usuario invalido.';
                      //     }
                      //     else {
                        //       this.errmsg = "Contraseña o Usuario invalido";
                        //     }
                            //   });