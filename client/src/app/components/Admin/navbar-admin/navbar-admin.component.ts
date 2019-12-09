import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

	puesto: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.puesto=localStorage.getItem('puesto');
	}

	redireccion_menu(){
		this.router.navigate(['']);
	}
  cerrar(){
    localStorage . clear(); 
    this.router.navigate(['/login']);
  }
}
