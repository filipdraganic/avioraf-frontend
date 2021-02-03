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
import {Korisnik} from '../model/korisnik.model';
import {PageEvent} from '@angular/material/paginator';
import {AvionskaKompanija} from '../model/avio-kompanija.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private helper = new JwtHelperService()

  public page = 1
  public pageSize = 5
  public pageEvent: PageEvent;
  public pageIndex = 0
  public lenght = 0

  public karte: Karta[]
  public karta: Karta



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
    let response = this.korisnikService.setupLocalstorage().subscribe(data=>{
      console.log(data);
    })
    console.log(response);
  }


  getNestoDrugo(){
    console.log(JSON.parse(localStorage.getItem("korisnik")));
  }

  getKarteToShow(){
    return this.karte
  }

  getKarte(pageNumber: number = 0){
      console.log("getKarte pocetak");
      this.kartaService.getKarte(pageNumber).subscribe(karte => {
        console.log(karte);
        this.karte = karte['avionskaKartaList']
        this.lenght = karte['size']
        console.log("Isprintovane karte??");
      })

  }

  goToDetails(id){

  }

  getPermission(){
    let korisnik =  JSON.parse(localStorage.getItem("korisnik"));


    if(korisnik.userType == "ADMIN"){
      // console.log("Korisnik je admin");
      return true
    }
    else {
      // console.log("Korisnik je obican user" + korisnik.tipKorisnika)
      return false
    }
  }


  brisanjeKarte(karta){
    this.kartaService.delKarta(karta).subscribe( data =>{
      console.log("data" + data);
      location.reload()

    })
  }

  izmenaKarte(id){
    this.router.navigate(['karta/'+id])
  }

  rezervisiKartu(karta){
    this.korisnikService.addBookingToUser(karta.id).subscribe(data =>{
      console.log(data);
    })
  }

  handlePageEvent(event :PageEvent){
    this.getKarte(event.pageIndex)
  }


  goToKompanija(avioKompanija: AvionskaKompanija){
    this.router.navigate(['avio-kompanija/'+avioKompanija.id])
  }


}
