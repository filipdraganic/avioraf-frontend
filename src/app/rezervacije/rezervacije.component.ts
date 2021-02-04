import { Component, OnInit } from '@angular/core';
import {Rezervacija} from '../model/rezervacija.model';
import {RezervacijaService} from '../services/rezervacija/rezervacija.service';
import {Korisnik} from '../model/korisnik.model';
import {AvionskaKompanija} from '../model/avio-kompanija.model';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-rezervacije',
  templateUrl: './rezervacije.component.html',
  styleUrls: ['./rezervacije.component.css']
})
export class RezervacijeComponent implements OnInit {

  rezervacije: Rezervacija[]

  korisnik: Korisnik

  constructor(private rezervacijeService:RezervacijaService,
              private router : Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.korisnik = JSON.parse(localStorage.getItem("korisnik"))
    this.getRezervacije()

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getRezervacije(){
    this.rezervacijeService.getRezervacijeOfKorisnik(this.korisnik.id).subscribe(data =>{
      this.rezervacije = data
      let tempKorisnik = JSON.parse(localStorage.getItem("korisnik"))
      tempKorisnik.bookings  = data
      localStorage.setItem("korisnik", JSON.stringify(tempKorisnik))
      console.log(this.rezervacije);
    })
  }

  getPermission(){
    if(this.korisnik.userType == "ADMIN"){
      // console.log("Korisnik je admin");
      return true
    }
    else {
      // console.log("Korisnik je obican user" + korisnik.tipKorisnika)
      return false
    }
  }


  goToKompanija(avioKompanija: AvionskaKompanija){
    this.router.navigate(['avio-kompanija/'+avioKompanija.id])
  }

  deleteRezervacija(rezervacija){
    this.rezervacijeService.delRezervacija(rezervacija.id).subscribe(data =>{
      console.log(data);

      this.openSnackBar("Obrisana rezervacija", "ok")
      this.getRezervacije()
    })
  }

  getDaLiJeIstekla(rezervacija){
    if(rezervacija.isAvailable){
      return "Dostupna"
    }
    else{
      return "Nije dostupna"
    }
  }

}
