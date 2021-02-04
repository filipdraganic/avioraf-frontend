import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean {

    if(localStorage.getItem("jwt")!= null) {
      return true
    }
    this.router.navigate(['/login'])
    return false

}



  constructor(private authService: AuthService,
              private router: Router) {
  }

}
