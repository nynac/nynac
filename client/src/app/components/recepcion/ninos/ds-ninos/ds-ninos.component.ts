import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'ds-ninos',
  templateUrl: './ds-ninos.component.html',
  styleUrls: ['./ds-ninos.component.css']
})
export class DsNinosComponent implements OnInit {

  constructor() { }

	@Input('miembro') miembro: any;
  ngOnInit() {
  }

}
