import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-donante',
  templateUrl: './navbar-donante.component.html',
  styleUrls: ['./navbar-donante.component.css']
})
export class NavbarDonanteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  cerrar(){
    localStorage . removeItem ( 'access_token' ) ; 
    document.location.href = 'http://localhost:4200/login';
  }
}
