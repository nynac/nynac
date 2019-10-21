import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-donante',
  templateUrl: './navbar-donante.component.html',
  styleUrls: ['./navbar-donante.component.css']
})
export class NavbarDonanteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  cerrar(){
    localStorage . removeItem ( 'access_token' ) ; 
    localStorage . removeItem ( 'miembroID' ) ; 
    localStorage . removeItem ( 'nombre' ) ; 
    localStorage . removeItem ( 'apellidos' ) ; 
    localStorage . removeItem ( 'correo' ) ; 
    localStorage . removeItem ( 'direccion' ) ; 
    localStorage . removeItem ( 'fechanacimiento' ) ; 
    localStorage . removeItem ( 'puesto' ) ; 
    this.router.navigate(['/login']);
  }
}
