import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'educacion-ninos',
  templateUrl: './educacion-ninos.component.html',
  styleUrls: ['./educacion-ninos.component.css']
})
export class EducacionNinosComponent implements OnInit {

  constructor() { }

	@Input('miembro') miembro: any;
  ngOnInit() {
  }

}
