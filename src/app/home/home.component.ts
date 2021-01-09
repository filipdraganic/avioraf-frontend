import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {KorisnikService} from '../services/korisnik/korisnik.service';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private helper = new JwtHelperService()

  constructor(private korisnikService: KorisnikService,
              private router: Router) { }

  ngOnInit(): void {

    if(!this.checkLogin){
      this.router.navigate(['/login'])
    }

    if(this.helper.isTokenExpired(localStorage.getItem('jwt'))){
      this.router.navigate(['/login'])
    }

  }

  checkLogin(){
    if(localStorage.getItem('jwt') == null){
      return false
    }else return true
  }

}
