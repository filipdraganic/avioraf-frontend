import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {KorisnikService} from '../services/korisnik/korisnik.service';
import {Router, RouterModule} from '@angular/router';
import {LoginService} from '../services/login/login.service';
import {Rezervacija} from '../model/rezervacija.model';
import {RezervacijaService} from '../services/rezervacija/rezervacija.service';
import {Karta} from '../model/karta.model';
import {KartaService} from '../services/karta/karta.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private helper = new JwtHelperService()

  public karte: Karta[]

  constructor(private korisnikService: KorisnikService,
              private loginService:LoginService,
              private kartaService:KartaService,
              private router: Router) { }

  ngOnInit(): void {

    if(!this.checkLogin){
      this.router.navigate(['/login'])
    }

    if(this.helper.isTokenExpired(localStorage.getItem('jwt'))){
      this.router.navigate(['/login'])
    }


    console.log("this.getKarte()");
    this.getKarte()

  }

  checkLogin(){
    if(localStorage.getItem('jwt') == null){
      return false
    }else return true
  }

  getUsers(){
    console.log("nesto")
    // console.log(this.korisnikService.getUsers())
    let response = this.loginService.setupLocalstorage().subscribe(data=>{
      console.log(data);
    })
    console.log(response);
  }


  getNestoDrugo(){
    console.log(JSON.parse(localStorage.getItem("korisnik")));
  }

  getKarte(){
    if(this.kartaService.getKarte()) {
      console.log("getKarte pocetak");
      this.kartaService.getKarte().subscribe(karte => {
        console.log(karte);
        this.karte = karte
        console.log("Isprintovane karte??");
      })
    }
  }

  goToDetails(id){

  }

}
