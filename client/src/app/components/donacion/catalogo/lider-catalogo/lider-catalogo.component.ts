import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lider-catalogo',
  templateUrl: './lider-catalogo.component.html',
  styleUrls: ['./lider-catalogo.component.css']
})
export class LiderCatalogoComponent implements OnInit {
  //busqueda
  resultado: any;
  
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
    //spinner
    var spinner_buscar = document.getElementById("spinner_buscar");

    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {

      spinner_buscar.removeAttribute("hidden");
      //select mediante el id
      var response = this.http.get(this.url + "Lider/" + this.form_buscar.value.buscarID);
      response.subscribe((data: any[]) => {
        this.resultado = data;
      
        this.form_agregar.get('liderID').setValue(this.resultado.liderID);
        this.form_agregar.get('descripcion').setValue(this.resultado.descripcion);
        spinner_buscar.setAttribute("hidden", "true");
      },
        error => {
          spinner_buscar.setAttribute("hidden", "true");
          console.log("Error", error)
        });
    }
  }
  opcion_lider() {
    this.submit_agregar = true;
    if (this.form_agregar.invalid) {
      return;
    }
    else {
      var r = confirm("¿Esta seguro que desea " + this.agregar_o_modificar + " Lider?");
      if (r == false) {
        return;
      }
      if (this.agregar_o_modificar == "nuevo") {
        console.log("Creando ...");
        this.agregar_lider();
      }
      else if (this.agregar_o_modificar == "modificar") {
        console.log("Modificando ...");
        this.modificar_lider();
      }
      else {
        console.log("se fue a ninguno")
      }
    }
  }

  agregar_lider() {
    //Spiner
    var spinner_agregar = document.getElementById("spinner_agregar");
    spinner_agregar.removeAttribute("hidden");
    this.http.post(this.url + "Lider", this.form_agregar.value).subscribe(data => {
      spinner_agregar.setAttribute("hidden", "true");
      alert("Lider Guardado");
      this.clean_Agregar();
    },
      error => {
        spinner_agregar.setAttribute("hidden", "true");
        console.log("Error", error);
      });
  }
  
  modificar_lider() {
    var spinner_agregar = document.getElementById("spinner_agregar");
    spinner_agregar.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "Lider/" + this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data => {
      spinner_agregar.setAttribute("hidden", "true");
      alert("Evento Modificado");
      this.clean_Agregar();
      this.clean_Buscar();
    },
      error => {
        spinner_agregar.setAttribute("hidden", "true");
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

  radioChange(event: any) {

    this.agregar_o_modificar = event.target.value;
    var lider_btn_buscar = document.getElementById("lider_btn_buscar");

    if (this.agregar_o_modificar == "nuevo") {
      this.clean_Buscar();
      this.clean_Agregar();

      lider_btn_buscar.setAttribute("disabled", "true");
    }
    else if (this.agregar_o_modificar == "modificar") {
      lider_btn_buscar.removeAttribute("disabled");
      lider_btn_buscar.setAttribute("enable", "true");

      this.clean_Buscar();
      this.clean_Agregar();
    }
  }

}
