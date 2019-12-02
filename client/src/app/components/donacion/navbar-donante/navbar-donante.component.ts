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
    localStorage . clear(); 
    this.router.navigate(['/login']);
  }
}
