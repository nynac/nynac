
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MyserviceService } from './myservice.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private Userservice: MyserviceService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('miembroID') != null || localStorage.getItem('miembroID') != undefined) {
      let roles = next.data["roles"] as Array<string>;
      if (roles) {
        var match = this.Userservice.roleMatch(roles);
        if (match) {
          return true;
        }
        else {
          this.router.navigate(['/bloqueo']);
          return false;
        }
      }
      else
        return true;
    } else
      this.router.navigate(['/login']);
    return false;
  }
} 