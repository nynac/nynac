import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-co',
  templateUrl: './navbar-co.component.html',
  styleUrls: ['./navbar-co.component.css']
})
export class NavbarCOComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  cerrar(){
    localStorage . clear(); 
    this.router.navigate(['/login']);
  }

}
