
    import { Injectable } from '@angular/core';    
    import { HttpClient , HttpHeaders,HttpParams } from '@angular/common/http';
      
    @Injectable({    
      providedIn: 'root'    
    })    
    export class MyserviceService {
      url = "https://api-remota.conveyor.cloud";

      constructor(private http: HttpClient) { }    
      
      postData(data): any {      
        const body = new HttpParams()          
        .set('grant_type', data.grant_type)          
        .set('username', data.username)    
        .set('password', data.password)    
        
        return this.http.post(this.url+'/token', body.toString(), 
        {observe: 'response',  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },  
        });

            
      }  

       roleMatch(allowedRoles): boolean {
        var isMatch = false;
        let userRoles= localStorage.getItem("puesto");
        allowedRoles.forEach(element => {
          if (userRoles.indexOf(element) > -1) {
            isMatch = true;
            return false;
          }
        });
        return isMatch;
    
      }
    }   

