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
  //Tabla
  mievento: any;
  todoseventos: any;
  //radio Option
  agregar_o_modificar: string = 'modificar';
  focus: boolean = false;
  //Formularios
  form_buscar: FormGroup;
  form_agregar: FormGroup;
  //validacion
  submit_buscar = false;
  submit_agregar = false;

  url = "https://api-remota.conveyor.cloud/api/";

  constructor(private http: HttpClient, private formBuilder: FormBuilder, ) {

  }
  ngOnInit() {
    this.options = {
      //configuracion estructura header
      header: {
        left: 'prev,next today',
        center: 'title',
      },
    };

    //buscar
    this.form_buscar = this.formBuilder.group({
      buscarID: ['', Validators.required],
    })

    //agregar
    this.form_agregar = this.formBuilder.group({
      agendaID: [''],
      titulo: ['',Validators.required],
      fechainicio: ['',Validators.required],
      fechaterminacion: [''],
      ubicacion: [''],
      email: [''],
      usuarioID: [0],
      color: ['#00AAE7'],
    })
    this.get_nuevo_agenda();
    this.get_mieventos();
    this.get_todoseventos();

  }

  
//controls Buscar
get f_B() {
  return this.form_buscar.controls;
  }
  //controls Agregar
  get f_A() {
  return this.form_agregar.controls;
  }
  //asignacion de color a var
  public onEventLog(data: any): void {
    this.form_agregar.get('color').setValue(data);
    console.log(this.form_agregar.value.color);
  }

  buscar_agenda(id: any) {
    //select mediante el id
    var response = this.http.get(this.url + "Agenda/" + id);
    response.subscribe((data: any[]) => {
      this.resultado = data;
      //transformar fecha formato
      var datePipe = new DatePipe("en-US");
      this.resultado.fechainicio = datePipe.transform(this.resultado.fechainicio, 'yyyy-MM-dd');
      this.resultado.fechaterminacion = datePipe.transform(this.resultado.fechaterminacion, 'yyyy-MM-dd');

      this.form_agregar.get('agendaID').setValue(this.resultado.agendaID);
      this.form_agregar.get('titulo').setValue(this.resultado.titulo);
      this.form_agregar.get('fechainicio').setValue(this.resultado.fechainicio);
      this.form_agregar.get('fechaterminacion').setValue(this.resultado.fechaterminacion);
      this.form_agregar.get('ubicacion').setValue(this.resultado.ubicacion);
      this.form_agregar.get('email').setValue(this.resultado.email);
      this.form_agregar.get('usuarioID').setValue(this.resultado.usuarioID);
      this.form_agregar.get('color').setValue(this.resultado.color);
      if (this.focus == true) {
        this.focus = false;
        this.agregar_o_modificar = 'modificar';
      }
    },
      error => {
        console.log("Error", error)
      });
  }
  eliminar_agenda(id: any) {
    var r = confirm("¿Esta seguro que desea eliminar el Evento: " + id + " ?");
    if (r == false) {
      return;
    }
    else {
      var response = this.http.delete(this.url + "Agenda/" + id);
      response.subscribe((data: any[]) => {
        alert("Se a eliminado el Evento: " + id);
        this.get_mieventos();
        this.get_todoseventos();
      },
        error => {
          console.log("Error", error)
        });
    }
  }

  opcion_agenda() {
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
        this.agregar_agenda();
      }
      else if (this.agregar_o_modificar == "modificar") {
        this.modificar_agenda();
      }
      else {
        console.log("se fue a ninguno")
      }
    }
  }
  agregar_agenda() {
    this.get_nuevo_agenda();
    this.http.post(this.url + "Agenda", this.form_agregar.value).subscribe(data => {
      alert("Se a registrado el Evento correctamente. ");
      this.clean_Agregar();
      this.get_nuevo_agenda();
      this.get_mieventos();
      this.get_todoseventos();
    },
      error => {
        console.log("Error", error);
      });
  }
  modificar_agenda() {
    this.http.put(this.url + "Agenda/" + this.form_agregar.value.agendaID, this.form_agregar.value).subscribe(data => {
      alert("Evento Modificado");
      this.get_mieventos();
      this.get_todoseventos();
    },
      error => {

        console.log("Error", error);
      });
  }

  radioChange(event: any) {
    this.agregar_o_modificar = event.target.value;

    if (this.agregar_o_modificar == "nuevo") {
      this.clean_Agregar();
      this.get_nuevo_agenda();
      //asignar el id del usuario ??
      this.focus = true;
    }
    else if (this.agregar_o_modificar == "modificar") {
      this.clean_Agregar();
      //asignar el id del usuario ??
      this.focus = false;
    }
  }

  get_nuevo_agenda() {
    var response = this.http.get(this.url + "ultimo_agenda");
    response.subscribe((resultado: number) => {
      this.form_agregar.get('agendaID').setValue(resultado + 1);
    },
      error => {
        console.log("Error", error)
      });
  }

  get_mieventos() {
    var response = this.http.get(this.url + "Registro_agenda?id=" + this.form_agregar.value.usuarioID);
    response.subscribe((data: any[]) => {
      this.mievento = data;
    },
      error => {
        console.log("Error", error)
      });
  }
  get_todoseventos() {
    var response = this.http.get(this.url + "Eventos/");
    response.subscribe((data: any[]) => {
      this.todoseventos = data;
    },
      error => {
        console.log("Error", error)
      });
  }


  //reset agregar
  clean_Agregar() {
    this.submit_agregar = false;
    this.form_agregar.reset();
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
      start: '2019-10-08',
      //tomas 1 dia mas del asignado (si es el dia 10 = 11)
      color: 'rgba(68,160,145,0.45)',
    }, {
      id: '2',
      title: 'other',
      start: '2019-10-08',
      //tomas 1 dia mas del asignado (si es el dia 10 = 11)
      end: '2019-10-15',
    }];
    console.log(this.eventsModel)
  }

}
