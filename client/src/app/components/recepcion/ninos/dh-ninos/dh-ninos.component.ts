import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'dh-ninos',
  templateUrl: './dh-ninos.component.html',
  styleUrls: ['./dh-ninos.component.css']
})
export class DHNinosComponent implements OnInit {
//busqueda
resultado: any;
  //Formularios
  form_buscar: FormGroup;
  form_agregar: FormGroup;

  //validacion
  submit_buscar = false;
  submit_agregar = false;

  url = "https://api-remota.conveyor.cloud/api/";

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

  @Input('miembro') miembro: any;
  
  ngOnInit() {
    //Se rellena los campos al formulario 
    //buscar
    this.form_buscar = this.formBuilder.group({
      miembroID: ['', Validators.required],
    })

    //agregar quitar motivo terapia de BD!!!!!!!!!!!!!!!!!!!!!!!!!
    this.form_agregar = this.formBuilder.group({
                       
      pesadilla :[''],  
      insomnio :[''],        
      rechinardiente :[''],  
      sueñointranquilo :[''], 
      habla :[''],           
      sueñocorto :[''],  
      otroproblema :[''], 
      horastv :[''],   
      minutostv :[''],       
      compañiatv :[''],  
      horasPC :[''],   
      minutosPC :[''],   
      caricatura :[''],  
      telenovelas :[''], 
      videomusical :[''],  
      documental :[''],  
      concurso :[''],  
      politica :[''],  
      terror :[''],  
      otroprograma :[''],  
      comesolo :[''],  
      vistesolo :[''], 
      lavadientesregular :[''],  
      aseadespuesbaño :[''], 
      peinasolo :[''],  
      lavamanosregular :[''],  
      concierto :[''],  
      cine :[''],  
      redsocial :[''],  
      salidaEU :[''],  
      deporte :[''], 
      parquedivertido :[''],  
      visitafamiliar :[''],  
      otraactividad :[''],        
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

  ng_busq_dhnino() {
    //spinner
    var spinner_buscar_dhnino = document.getElementById("spinner_buscar_dhnino");
    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {

      spinner_buscar_dhnino.removeAttribute("hidden");
      //select mediante el id
      var response = this.http.get(this.url + "Nino_DH/" + this.form_buscar.value.miembroID);
      response.subscribe((data: any[]) => {
        this.resultado = data;

        this.form_agregar.get('eventoID').setValue(this.resultado.eventoID);
        this.form_agregar.get('descripcion').setValue(this.resultado.descripcion);
        this.form_agregar.get('fecha').setValue(this.resultado.fecha);
        spinner_buscar_dhnino.setAttribute("hidden", "true");
      },
        error => {
          spinner_buscar_dhnino.setAttribute("hidden", "true");
          console.log("Error", error)
        });
    }
  }
  modificar_dhnino() {
    alert("boton modificar");
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
