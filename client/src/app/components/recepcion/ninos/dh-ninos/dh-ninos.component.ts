import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'dh-ninos',
  templateUrl: './dh-ninos.component.html',
  styleUrls: ['./dh-ninos.component.css']
})
export class DHNinosComponent implements OnInit {

  constructor() { }

	@Input('miembro') miembro: any;
  ngOnInit() {
  }

}
