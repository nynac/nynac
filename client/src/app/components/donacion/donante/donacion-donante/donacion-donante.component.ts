import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'donacion-donante',
  templateUrl: './donacion-donante.component.html',
  styleUrls: ['./donacion-donante.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class DonacionDonanteComponent implements OnInit {
  //busqueda
  resultado: any;
  miembro:any;
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

  //formularios para modulos
  form_contacto: FormGroup;
  form_telefono: FormGroup;
  form_formadonacion: FormGroup;
  form_dirrecciondonante: FormGroup;
  form_dfiscal: FormGroup;
  form_notasdonantes: FormGroup;

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
      donacionID: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      nombrefiscal: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', Validators.required],
      tipodonante: ['', Validators.required],
      fechanacimiento: [this.fecha1],
      edad: [''],
      fechadonacion: [this.fecha2],
      liderID: [''],
      campanaID: [''],
      eventoID: [''],
      observacion: [''],
    })
    
    this.form_contacto = this.formBuilder.group({
      contactoID: [''],
      donacionID: [''],
      nombre1: [''],
      paterno1: [''],
      materno1: [''],
      relacion1: [''],
      calle1: [''],
      colonia1: [''],
      noexterior1: [''],
      nointerior1: [''],
      cp1: [''],
      pais1: [''],
      estado1: [''],
      municipio1: [''],
      email1: [''],
      fechanacimiento1: [''],
      telefono1: [''],
      lada1: [''],
      observacion1: [''],
      nombre2: [''],
      paterno2: [''],
      materno2: [''],
      relacion2: [''],
      calle2: [''],
      colonia2: [''],
      noexterior2: [''],
      nointerior2: [''],
      cp2: [''],
      pais2: [''],
      estado2: [''],
      municipio2: [''],
      email2: [''],
      fechanacimiento2: [''],
      telefono2: [''],
      lada2: [''],
      observacion2: [''],
    })

    this.form_telefono = this.formBuilder.group({
      telefonoID: [''],
      donacionID: [''],
      tipo1: [''],
      telefono1: [''],
      lada1: [''],
      extension1: [''],
      observacion1: [''],
      tipo2: [''],
      telefono2: [''],
      lada2: [''],
      extension2: [''],
      observacion2: [''],
      tipo3: [''],
      telefono3: [''],
      lada3: [''],
      extension3: [''],
      observacion3: [''],
    })
    this.form_formadonacion = this.formBuilder.group({
      formadonacionID: [''],
      donacionID:[''],
      tipodonacion: [''],
      monto: [''],
      banco: [''],
      estatus: [''],
      numero: [''],
      codigo: [''],
      vence: [''],
      primerpago: [''],
      cargo: [''],
      frecuencia: [''],
      ultimopago: [''],
      observacion: [''],
    })
    this.form_dirrecciondonante = this.formBuilder.group({
      direcciondonanteID: [''],
      donacionID: [''],
      tipodireccion1 :[''],	
      calle1	:[''],		
      noexterior1 :[''],	
      nointerior1 :[''],	
      colonia1:[''], 		
      cp1 :[''],			
      pais1 :[''],			
      estado1 :[''],		
      municipio1:[''], 	
      tipodireccion2 :[''],	
      calle2	:[''],		
      noexterior2 :[''],	
      nointerior2 :[''],	
      colonia2 	:[''],	
      cp2 :[''],			
      pais2 :[''],			
      estado2 :[''],		
      municipio2:[''],
      tipodireccion3 :[''],	
      calle3	:[''],		
      noexterior3:[''], 	
      nointerior3 :[''],	
      colonia3 :[''],		
      cp3 :[''],			
      pais3 :[''],			
      estado3 :[''],		
      municipio3:[''],	
    })
    this.form_dfiscal = this.formBuilder.group({
      datosfiscalesID:[''],
      donacionID: [''],
      rfc :[''],
      nombre :[''],
      calle	:[''],
      noexterior:[''],
      nointerior:[''],
      colonia	:[''],
      cp :[''],
      pais 	:[''],
      estado:[''],
      municipio	:[''],
      email1:[''],
      email2 :[''],
  
    })

    this.form_notasdonantes= this.formBuilder.group({
      notaID:[''],
      donacionID: [''],
      nota 	:[''],	
    statusnota :[''],	
    programar :[''],	
    responsable :[''],
    
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

  buscar_donante() {
    //spinner
    var spinner_buscar_donacion = document.getElementById("spinner_buscar_donacion");

    this.submit_buscar = true;
    if (this.form_buscar.invalid) {
      return;
    }
    else {

      spinner_buscar_donacion.removeAttribute("hidden");
      //select mediante el id
      var response = this.http.get(this.url + "Donacion/" + this.form_buscar.value.buscarID);
      response.subscribe((data: any[]) => {
        this.resultado = data;
        //transformar fecha formato
        var datePipe = new DatePipe("en-US");
        this.resultado.fechanacimiento = datePipe.transform(this.resultado.fechanacimiento, 'yyyy/MM/dd');
        this.resultado.fechadonacion = datePipe.transform(this.resultado.fechadonacion, 'yyyy/MM/dd');

        this.form_agregar.get('donacionID').setValue((this.resultado.donacionID));
        this.form_agregar.get('nombres').setValue(this.resultado.nombres);
        this.form_agregar.get('apellidos').setValue(this.resultado.apellidos);
        this.form_agregar.get('nombrefiscal').setValue(this.resultado.nombrefiscal);
        this.form_agregar.get('status').setValue(this.resultado.status);
        this.form_agregar.get('email').setValue(this.resultado.email);
        this.form_agregar.get('tipodonante').setValue(this.resultado.tipodonante);
        this.form_agregar.get('fechanacimiento').setValue(this.resultado.fechanacimiento);
        this.form_agregar.get('fechadonacion').setValue(this.resultado.fechadonacion);
        this.form_agregar.get('edad').setValue(this.resultado.edad);
        this.form_agregar.get('liderID').setValue(this.resultado.liderID);
        this.form_agregar.get('campanaID').setValue(this.resultado.campanaID);
        this.form_agregar.get('eventoID').setValue(this.resultado.eventoID);
        this.form_agregar.get('observacion').setValue(this.resultado.observacion);
        spinner_buscar_donacion.setAttribute("hidden", "true");
      },
        error => {
          spinner_buscar_donacion.setAttribute("hidden", "true");
          console.log("Error", error)
        });
    }
  }


  opcion_donante() {
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
        console.log("Creando ...");
        this.agregar_donante();
      }
      else if (this.agregar_o_modificar == "modificar") {
        console.log("Modificando ...");
        this.modificar_donante();
      }
      else {
        console.log("se fue a ninguno")
      }
    }
  }

  get_nuevo_miembro(){
		var response = this.http.get(this.url + "Donacion");
		response.subscribe((data)=> { 
      this.miembro = data;
      this.form_agregar.get('donacionID').setValue((this.miembro[this.miembro.length -1].donacionID + 1));
      console.log(this.form_agregar.value.donacionID);
		},
		error =>{
			console.log("Error", error)
		});
	}

  agregar_donante() {
    //Spiner
    var spinner_agregar_donacion = document.getElementById("spinner_agregar_donacion");
    spinner_agregar_donacion.removeAttribute("hidden");
    //fecha
    var datePipe = new DatePipe("en-US");
    this.fecha1 = datePipe.transform(this.fecha1, 'yyyy/MM/dd');
    this.form_agregar.get('fechanacimiento').setValue(this.fecha1);
    this.fecha2 = datePipe.transform(this.fecha2, 'yyyy/MM/dd');
    this.form_agregar.get('fechadonacion').setValue(this.fecha2);

    //asignacion ID
    this.form_contacto.get('contactoID').setValue(this.form_agregar.value.donacionID);
    this.form_contacto.get('donacionID').setValue(this.form_agregar.value.donacionID);
    this.form_telefono.get('telefonoID').setValue(this.form_agregar.value.donacionID);
    this.form_telefono.get('donacionID').setValue(this.form_agregar.value.donacionID);
    this.form_formadonacion.get('formadonacionID').setValue(this.form_agregar.value.donacionID);
    this.form_formadonacion.get('donacionID').setValue(this.form_agregar.value.donacionID);
    this.form_dirrecciondonante.get('direcciondonanteID').setValue(this.form_agregar.value.donacionID);
    this.form_dirrecciondonante.get('donacionID').setValue(this.form_agregar.value.donacionID);

    //cambiar el valor por un id unico de la tabla
    this.form_dfiscal.get('datosfiscalesID').setValue(this.form_agregar.value.donacionID);
    this.form_dfiscal.get('donacionID').setValue(this.form_agregar.value.donacionID);

    this.form_notasdonantes.get('notaID').setValue(this.form_agregar.value.donacionID);
    this.form_notasdonantes.get('donacionID').setValue(this.form_agregar.value.donacionID);

    //Donacion
    this.http.post(this.url + "Donacion", this.form_agregar.value).subscribe(data => {
      alert("Donacion Agregada");
        spinner_agregar_donacion.setAttribute("hidden", "true");
        this.clean_Agregar();
    },
      error => {
        
        spinner_agregar_donacion.setAttribute("hidden", "true");
        console.log("Error", error);
      });
      //Contacto
      this.http.post(this.url + "Contacto", this.form_contacto.value).subscribe(data => {
        console.log('Contacto ');
      },
        error => {
          spinner_agregar_donacion.setAttribute("hidden", "true");
          console.log("Error", error);
        });
        //Telefono
        this.http.post(this.url + "Telefonodonante", this.form_telefono.value).subscribe(data => {
          console.log('Telefonodonante ');
        },
          error => {
            spinner_agregar_donacion.setAttribute("hidden", "true");
            console.log("Error", error);
          });
          //FormaDonacion
          this.http.post(this.url + "FormaDonacion", this.form_formadonacion.value).subscribe(data => {
            console.log('FormaDonacion ');
          },
            error => {
              spinner_agregar_donacion.setAttribute("hidden", "true");
              console.log("Error", error);
            });
          //Direeccion Donante
          this.http.post(this.url + "DireccionDonante", this.form_dirrecciondonante.value).subscribe(data => {
            console.log('DireccionDonante ');
          },
            error => {
              spinner_agregar_donacion.setAttribute("hidden", "true");
              console.log("Error", error);
            });
          //Datos fiscal
          this.http.post(this.url + "DFiscal", this.form_dfiscal.value).subscribe(data => {
            console.log('DFiscal ');
          },
            error => {
              spinner_agregar_donacion.setAttribute("hidden", "true");
              console.log("Error", error);
            });
          //Nota Donante
          this.http.post(this.url + "NotasDonantes", this.form_notasdonantes.value).subscribe(data => {
            console.log('NotasDonantes ');
          },
            error => {
              spinner_agregar_donacion.setAttribute("hidden", "true");
              console.log("Error", error);
            });
        
  }

  modificar_donante() {
    var spinner_agregar_donacion = document.getElementById("spinner_agregar_donacion");
    spinner_agregar_donacion.removeAttribute("hidden");

    //Update mediante el id y los campos de agregar
    this.http.put(this.url + "Donacion/" + this.form_buscar.value.buscarID, this.form_agregar.value).subscribe(data => {
      spinner_agregar_donacion.setAttribute("hidden", "true");
      alert("Donacion Modificado");
      this.clean_Agregar();
      this.clean_Buscar();
    },
      error => {
        spinner_agregar_donacion.setAttribute("hidden", "true");
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

	radioChange(event: any){
		this.agregar_o_modificar = event.target.value;
		var donacion_btn_buscar = document.getElementById("donacion_btn_buscar");

		if (this.agregar_o_modificar == "nuevo"){
			this.clean_Agregar();
			this.clean_Buscar();

			donacion_btn_buscar.setAttribute("disabled", "true");
		}
		else if(this.agregar_o_modificar == "modificar"){
			donacion_btn_buscar.removeAttribute("disabled");
      donacion_btn_buscar.setAttribute("enable", "true");
      
			this.clean_Agregar();
			this.clean_Buscar();
		}
	}
}
