import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyserviceService } from '../../myservice.service'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bloqueo',
  templateUrl: './bloqueo.component.html',
  styleUrls: ['./bloqueo.component.css']
})
export class BloqueoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
