import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  calendarPlugins = [dayGridPlugin, interactionPlugin]; // important!
  options: OptionsInput;
  eventsModel: any;
  //busqueda
  resultado: any;
  colors:string='';
  //fechas 
  fecha1: any;
  fecha2: any;
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


  public color1: string = '#00AAE7';
  constructor(private http: HttpClient, private formBuilder: FormBuilder,) { }
  ngOnInit() {
    this.options = {
      //configuracion estructura header
      header: {
        left: 'prev,next today',
        center: 'title',
      },
    };
    
     //Se rellena los campos al formulario 
    //buscar
    this.form_buscar = this.formBuilder.group({
      buscarID: ['', Validators.required],
    })

    //agregar
    this.form_agregar = this.formBuilder.group({
     agendaID:[''],
     titulo:[''],
     fechainicio:[''],
     fechaterminacion:[''],
     ubicacion:[''],
     email:[''],
     usuarioID:[''],
     color:[''],
    })

  }

  public onEventLog( data: any): void {
    this.colors=data;    
    console.log(this.colors);
  }

  buscar_agenda(){
    
  }

  opcion_donante(){
    this.submit_agregar = true;
    if (this.form_agregar.invalid) {
      return;
    }
    else {
      var r = confirm("¿Esta seguro que desea " + this.agregar_o_modificar + " Campaña?");
      if (r == false) {
        return;
      }
      if (this.agregar_o_modificar == "nuevo") {
        console.log("Creando ...");
        this.agregar_agenda();
      }
      else if (this.agregar_o_modificar == "modificar") {
        console.log("Modificando ...");
        this.modificar_agenda();
      }
      else {
        console.log("se fue a ninguno")
      }
    }
  }

  agregar_agenda(){

  }
  modificar_agenda(){

  }
  //clic en evento (azul)
  eventClick(model) {
    console.log(model);
  }

  //Mover el evento
  eventDragStop(model) {
    console.log(model);
  }

  //clic en las cell del dategrid
  dateClick(model) {
    console.log(model);
  }

  //asignamos un evento manual
  updateEvents() {
    this.eventsModel = [{
      title: 'Updaten Event',
      start: this.yearMonth + '-08',
      //tomas 1 dia mas del asignado (si es el dia 10 = 11)
      end: this.yearMonth + '-11',
      descripcion: 'Hola que esta ',
      color: 'rgba(68,160,145,0.45)',
    },{
      title: 'other',
      start: this.yearMonth + '-08',
      //tomas 1 dia mas del asignado (si es el dia 10 = 11)
      end: this.yearMonth + '-15',
    }];
    console.log(this.eventsModel);
  }

  //toma la fecha actual pero solo regresa el año y mes
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }

  radioChange(event: any) {
    this.agregar_o_modificar = event.target.value;
    var agenda_btn_buscar = document.getElementById("agenda_btn_buscar");

    if (this.agregar_o_modificar == "nuevo") {
      // this.get_nuevo_agenda();
      this.clean_Agregar();
      agenda_btn_buscar.setAttribute("disabled", "true");
    }
    else if (this.agregar_o_modificar == "modificar") {
      this.clean_Agregar();
      agenda_btn_buscar.removeAttribute("disabled");
      agenda_btn_buscar.setAttribute("enable", "true");

    }
  }
  

  //reset agregar
  clean_Agregar() {
    this.submit_agregar = false;
    this.form_agregar.reset();
  }
  
}
