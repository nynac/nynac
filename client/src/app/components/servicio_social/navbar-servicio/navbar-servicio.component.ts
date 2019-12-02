import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'navbar-servicio',
  templateUrl: './navbar-servicio.component.html',
  styleUrls: ['./navbar-servicio.component.css']
})
export class NavbarServicioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  cerrar(){
    localStorage . clear(); 
    this.router.navigate(['/login']);
  }
}
