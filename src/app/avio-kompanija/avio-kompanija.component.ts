import { Component, OnInit } from '@angular/core';
import {AvionskaKompanijaService} from '../services/avionskaKompanija/avionska-kompanija.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {AvionskaKompanija} from '../model/avio-kompanija.model';
import {Karta} from '../model/karta.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {KartaService} from '../services/karta/karta.service';
import {KorisnikService} from '../services/korisnik/korisnik.service';
import {RezervacijaService} from '../services/rezervacija/rezervacija.service';

@Component({
  selector: 'app-avio-kompanija',
  templateUrl: './avio-kompanija.component.html',
  styleUrls: ['./avio-kompanija.component.css']
})
export class AvioKompanijaComponent implements OnInit {

  private routeSub:Subscription

  avioKompanija : AvionskaKompanija

  karte : Karta[]

  inputMode = false

  tempAvioKompanijaName: string
  newAviokompanijaName: string


  constructor(private avioKompanijaService: AvionskaKompanijaService,
              private kartaService: KartaService,
              private korisnikService: KorisnikService,
              private router: Router,
              private _snackBar: MatSnackBar,
              private rezervacijaService:RezervacijaService,
              private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.routeSub = this.route.params.subscribe(params =>{
      this.avioKompanijaService.getAvionskaKompanija(params['id']).subscribe(avioKompanijaData =>{
        this.avioKompanija = avioKompanijaData

        this.getKarte()


      }, error => {
        this.openSnackBar(error, "Ups")
      })
    })

  }

  getKarte(){
    this.avioKompanijaService.getKarteAvionskeKompanije(this.avioKompanija.id).subscribe(karteData =>{
    this.karte = karteData
    console.log(this.karte);
  }, error => {
    console.log(error);
    this.openSnackBar(error, "upsUps")
  })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  toggleInputMode(){
    this.inputMode = !this.inputMode
    return this.inputMode
  }

  applyAvioKompanijaName(){
    if (this.tempAvioKompanijaName === undefined || this.tempAvioKompanijaName.length === 0){
      this.toggleInputMode()
      this.openSnackBar("Aborted","OK")
      return

    }
    console.log(this.tempAvioKompanijaName);
    if(this.tempAvioKompanijaName.length < 3){
      this.openSnackBar("Ime kompanije je prekratko", "Bas me briga")
    }else{

      this.avioKompanija.name = this.tempAvioKompanijaName

      this.avioKompanijaService.updateAvionskaKompanija(this.avioKompanija).subscribe(avioKompanijaData =>{
        this.avioKompanija = avioKompanijaData
        this.openSnackBar("Name updated","OK")
        this.avioKompanijaService.getKarteAvionskeKompanije(this.avioKompanija.id).subscribe(karteData =>{
          this.karte = karteData
          console.log(this.karte);
          this.toggleInputMode()
        }, error => {
          console.log(error);
          this.openSnackBar(error, "upsUps")
        })

      }, error => {
        this.openSnackBar("Error while updating name", ":(")
      })

    }

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

  deleteAvioKompanija(){
    this.avioKompanijaService.deleteAvionskaKompanija(this.avioKompanija).subscribe(data =>{
      console.log(data);
      this.openSnackBar("Deleted aviokompanija", "ok")
      this.router.navigate([''])
    }, error => {
      this.openSnackBar("Error while deleting aviokompanija", "Oh no... anyway")
    })
  }

  newAvioKompanija(){
    this.avioKompanijaService.newAvionskaKompanija(this.newAviokompanijaName).subscribe(data =>{
      console.log(data);
      this.openSnackBar("Created "+this.newAviokompanijaName, "ok")

    }, error => {
      this.openSnackBar("Erro while creating " + this.newAviokompanijaName, ":(")

    })
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
    this.rezervacijaService.postRezervacija(karta).subscribe(data =>{
      console.log(data);
      this.korisnikService.setupLocalstorage().subscribe(data =>{
        console.log(data);
        localStorage.setItem("korisnik", JSON.stringify(data))

        this.getKarte()

        this.openSnackBar("Rezervisana karta","Woho")
      })
    })
  }


}
