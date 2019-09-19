import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'dm-ninos',
  templateUrl: './dm-ninos.component.html',
  styleUrls: ['./dm-ninos.component.css']
})
export class DmNinosComponent implements OnInit {

  constructor() { }

	@Input('miembro') miembro: any;
  ngOnInit() {
  }

}
