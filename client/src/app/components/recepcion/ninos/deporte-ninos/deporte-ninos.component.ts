import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'deporte-ninos',
  templateUrl: './deporte-ninos.component.html',
  styleUrls: ['./deporte-ninos.component.css']
})
export class DeporteNinosComponent implements OnInit {

  constructor() { }

	@Input('miembro') miembro: any;
  ngOnInit() {
  }

}
