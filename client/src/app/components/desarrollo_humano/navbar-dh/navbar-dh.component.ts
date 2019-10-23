import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar-dh',
  templateUrl: './navbar-dh.component.html',
  styleUrls: ['./navbar-dh.component.css']
})
export class NavbarDHComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  cerrar(){
    localStorage . clear(); 
    this.router.navigate(['/login']);
  }

}
