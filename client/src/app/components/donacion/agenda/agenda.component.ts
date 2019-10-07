import { Component, OnInit } from '@angular/core';
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
  arrayLideres: any;
  arrayCampanas: any;
  arrayEventos: any;
  miembro: any;
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


  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.options = {
      //boton extra
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      //configuracion estructura header
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth'
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
     descripcion:[''],
     fechainicio:[''],
     fechaterminacion:[''],
     ubicacion:[''],
     email:[''],
     tiempo:[''],
     personal:['']
    })

  }

  buscar_agenda(){}

  opcion_donante(){}

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
      end: this.yearMonth + '-11'
    }];
    console.log(this.eventsModel);
  }

  //toma la fecha actual pero solo regresa el año y mes
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }
  
}
