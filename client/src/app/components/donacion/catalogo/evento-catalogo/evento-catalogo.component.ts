import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'evento-catalogo',
  templateUrl: './evento-catalogo.component.html',
  styleUrls: ['./evento-catalogo.component.css']
})
export class EventoCatalogoComponent implements OnInit {
  resultado: any;
  arreglo: any;
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
      eventoID: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],

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

  buscar_evento() {
    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {
      //select mediante el id
      var response = this.http.get(this.url + "Eventoe/" + this.form_buscar.value.buscarID);
      response.subscribe((data: any[]) => {
        this.resultado = data;
        //transformar fecha formato
        var datePipe = new DatePipe("en-US");
        this.resultado.fecha = datePipe.transform(this.resultado.fecha, 'dd/MM/yyyy');

        console.log(this.resultado.fecha);

        // console.log(this.form_agregar.get('fecha').value);
        this.form_agregar.get('eventoID').setValue(this.resultado.eventoID);
        this.form_agregar.get('descripcion').setValue(this.resultado.descripcion);
        this.form_agregar.get('fecha').setValue(this.resultado.fecha);

      },
        error => {
          console.log("Error", error)
        });
    }
  }

  agregar_evento() {
    this.submit_agregar = true;
    if (this.form_agregar.invalid) {
      return;
    }
    else {
      console.log(this.form_agregar.value);
      this.http.post(this.url + "Eventoe", this.form_agregar.value).subscribe(data => {
        console.log("Registro exitoso ", data);
        alert("Evento Guardado");
        this.clean_Agregar();
      },
        error => {
          console.log("Error", error);
        });

      // //Update mediante el id y los campos de agregar
      // this.http.put(this.url + "Eventoe/"+this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data  => {
      //   console.log("Se han modificado los valores correctamente", data);
      // },
      // error  => {
      //   console.log("Error", error);
      // });
    }
  }

  //get all
  select_todo() {
    //select mediante el id
    var response = this.http.get(this.url + "Eventoe");
    response.subscribe((data: any[]) => {
      this.arreglo = data;
      //transformar fecha formato
      var datePipe = new DatePipe("en-US");
      this.arreglo.fecha = datePipe.transform(this.arreglo.fecha, 'dd/MM/yyyy');
      console.log(this.arreglo[0]);

    },
      error => {
        console.log("Error", error)
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
}
