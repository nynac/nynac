import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'evento-catalogo',
  templateUrl: './evento-catalogo.component.html',
  styleUrls: ['./evento-catalogo.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class EventoCatalogoComponent implements OnInit {
  resultado: any;
  model2: any;
  fecha_evento:any;
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
      fecha: [this.model2, Validators.required],

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

  get today() {
    return new Date();
  }

  buscar_evento() {
    console.log(this.model2);
    var datePipe = new DatePipe("en-US");
    this.model2 = datePipe.transform(this.model2, 'yyyy/MM/dd');
    this.form_agregar.get('fecha').setValue(this.model2);
    console.log(this.form_agregar.value.fecha);
    // var datePipe = new DatePipe("en-US");
    // this.form_agregar.value.model2 = datePipe.transform(this.form_agregar.value.model2, 'yyyy/MM/dd');
    // console.log(this.form_agregar.value.model2);

    // console.log(this.form_agregar.value.model.year+"/"+this.form_agregar.value.model.month+"/"+this.form_agregar.value.model.day);
        //MOdelo ng model migrar a formgruop
    // console.log(this.model.year);
    // console.log(this.model.month);
    // console.log(this.model.day);
    // this.fecha_evento=this.model.year+"/"+this.model.month+"/"+this.model.day;
    // console.log(this.fecha_evento);

    // //     this.form_agregar.get('fecha').setValue(this.resultado.fecha);
    // console.log(this.form_agregar.get('fecha').value);

    // this.submit_buscar = true;
    // if (this.form_buscar.invalid) {
    //   return;
    // }
    // else {
    //   //select mediante el id
    //   var response = this.http.get(this.url + "Eventoe/" + this.form_buscar.value.buscarID);
    //   response.subscribe((data: any[]) => {
    //     this.resultado = data;
    //     //transformar fecha formato
    //     var datePipe = new DatePipe("en-US");
    //     this.resultado.fecha = datePipe.transform(this.resultado.fecha, 'yyyy/MM/dd');

    //     console.log(this.resultado.fecha);

    //     // console.log(this.form_agregar.get('fecha').value);
    //     this.form_agregar.get('eventoID').setValue(this.resultado.eventoID);
    //     this.form_agregar.get('descripcion').setValue(this.resultado.descripcion);
    //     this.form_agregar.get('fecha').setValue(this.resultado.fecha);

    //   },
    //     error => {
    //       console.log("Error", error)
    //     });
    // }
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
