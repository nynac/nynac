import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'arte-ninos',
  templateUrl: './arte-ninos.component.html',
  styleUrls: ['./arte-ninos.component.css']
})
export class ArteNinosComponent implements OnInit {

  constructor() { }

  @Input('miembro') miembro: any;
  
  ngOnInit() {
  }

}
