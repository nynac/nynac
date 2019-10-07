import { Component, OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-aportacion-donante',
  templateUrl: './aportacion-donante.component.html',
  styleUrls: ['./aportacion-donante.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})

export class AportacionDonanteComponent implements OnInit {

  estado_radio: any=true;

    //busqueda
  resultado: any;
  arrayFdonacion: any;
  miembro: any;
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

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.get_Fdonacion();
    this.get_nuevo_Fdonacion();
    console.log(this.estado_radio);
  }

  ngOnInit() {
    //Se rellena los campos al formulario 
    //buscar
    this.form_buscar = this.formBuilder.group({
      buscarID: [''],
    })
    //agregar
    this.form_agregar = this.formBuilder.group({
      formadonacionID: [''],
      donacionID: [''],
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

  opcion_fdonacion() {
    this.submit_agregar = true;
    if (this.form_agregar.invalid) {
      return;
    }
    else {
      var r = confirm("¿Esta seguro que desea " + this.agregar_o_modificar + " donante?");
      if (r == false) {
        return;
      }
      if (this.agregar_o_modificar == "nuevo") {
        this.agregar_fdonante();
      }
      else if (this.agregar_o_modificar == "modificar") {
        this.modificar_fdonante();
      }
      else {
        console.log("se fue a ninguno")
      }
    }
  }

  llenar(){
    var response = this.http.get(this.url + "FormaDonacion/EspecificaID?id="+this.form_buscar.value.buscarID);
    response.subscribe((data: any[]) => {
      this.arrayFdonacion = data;
      this.form_agregar.get('donacionID').setValue(this.form_buscar.value.buscarID);
    },
      error => {
        console.log("Error", error)
      });
  }

  buscar_fdonante(id: any) {
    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {
      //select mediante el id
      var response = this.http.get(this.url + "FormaDonacion/" + id);
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
      },
        error => {
          console.log("Error", error)
        });
    }
  }

  agregar_fdonante() {
    this.get_nuevo_Fdonacion();
    //Spiner
    var spinner_agregar_contacto = document.getElementById("spinner_agregar_contacto");
    spinner_agregar_contacto.removeAttribute("hidden");
    //fecha
    var datePipe = new DatePipe("en-US");
    this.fecha1 = datePipe.transform(this.fecha1, 'yyyy/MM/dd');
    this.form_agregar.get('vence').setValue(this.fecha1);

    this.fecha2 = datePipe.transform(this.fecha2, 'yyyy/MM/dd');
    this.form_agregar.get('primerpago').setValue(this.fecha2);

    this.fecha3 = datePipe.transform(this.fecha3, 'yyyy/MM/dd');
    this.form_agregar.get('ultimopago').setValue(this.fecha3);
    //Donacion
    this.http.post(this.url + "FormaDonacion", this.form_agregar.value).subscribe(data => {
      alert("Se a registrado la donacion correctamente. ");

      spinner_agregar_contacto.setAttribute("hidden", "true");

      this.get_nuevo_Fdonacion();
      this.llenar();
    },
      error => {
        spinner_agregar_contacto.setAttribute("hidden", "true");
        console.log("Error", error);
      });

  }

  modificar_fdonante() {
    var spinner_agregar_contacto = document.getElementById("spinner_agregar_contacto");
    spinner_agregar_contacto.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "FormaDonacion/" + this.form_agregar.value.formadonacionID, this.form_agregar.value).subscribe(data => {
      spinner_agregar_contacto.setAttribute("hidden", "true");
      alert("Donacion Modificada");
      this.llenar();
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
    this.get_nuevo_Fdonacion();
  }

  radioChange(event: any) {
    this.agregar_o_modificar = event.target.value;
    if (this.agregar_o_modificar == "nuevo") {
      this.clean_Agregar();
      this.get_nuevo_Fdonacion();
      //this.get_nuevo_Fdonacion();
    }
    else if (this.agregar_o_modificar == "modificar") {
      //this.modificar_fdonante();
    }
  }

  get_nuevo_Fdonacion() {
    var response = this.http.get(this.url + "ultimoFormaDonacion");
    response.subscribe((resultado: number) => {
      this.form_agregar.get('formadonacionID').setValue(resultado + 1);
    },
      error => {
        console.log("Error", error)
      });
  }
  get_Fdonacion() {
    var response = this.http.get(this.url + "Aportacion/");
    response.subscribe((data: any[]) => {
      this.arrayFdonacion = data;
      console.log(this.arrayFdonacion);
    },
      error => {
        console.log("Error", error)
      });
  }

  cancelar(){
    this.clean_Agregar();
    this.clean_Buscar();
    this.get_nuevo_Fdonacion();
    this.get_Fdonacion();
  }
}
