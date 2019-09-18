import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

var hola = 10;

@Injectable({
	providedIn: 'root'
})
export class RegistrationService {

	url = 'http://api-remota.conveyor.cloud/api/miembro';
	constructor(private http:HttpClient) { }

	register(formData){
		return this.http.post<any>(this.url, formData);
	}
}

