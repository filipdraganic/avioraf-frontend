import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {KartaService} from '../services/karta/karta.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Karta} from '../model/karta.model';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Grad} from '../model/grad.model';
import {GradService} from '../services/grad/grad.service';
import {Korisnik} from '../model/korisnik.model';
import {Let} from '../model/let.model';
import {LetService} from '../services/let/let.service';
import {AvionskaKompanijaService} from '../services/avionskaKompanija/avionska-kompanija.service';
import {AvionskaKompanija} from '../model/avio-kompanija.model';
import {promptGlobalAnalytics} from '@angular/cli/models/analytics';

@Component({
  selector: 'app-izmena-karata',
  templateUrl: './izmena-karata.component.html',
  styleUrls: ['./izmena-karata.component.css']
})
export class IzmenaKarataComponent implements OnInit {

  testlet:Let
  public izmenaForm: FormGroup
  karta: Karta
  gradovi : Grad[]
  letovi : Let[]
  kompanije : AvionskaKompanija[]
  private routeSub:Subscription
  smerovi: String[]
  constructor(private kartaService:KartaService,
              private router: Router,
              private formBuilder:FormBuilder,
              public dialog:MatDialog,
              public letoviService:LetService,
              private route:ActivatedRoute,
              private gradService:GradService,
              private avionskaKompanijaService:AvionskaKompanijaService) {

    this.izmenaForm = this.formBuilder.group({
      avionskaKompanija:['', [Validators.required, Validators.minLength(5)]],
      smer:['', [Validators.required]],
      // pocetak:['', [Validators.required]],
      // destinacija :['', [Validators.required]],
      let:['', Validators.required],
      datumPolaska:['', [Validators.required]],
      datumPovratka:[''],
      brojKarata:['', [Validators.required, Validators.min(0)]]
    })

  }

  ngOnInit(): void {
    // this.routeSub = this.route.params.subscribe(params => {

    this.smerovi = ["Jednosmerna","Povratna"]

      this.kartaService.getKarta(1).subscribe( karta =>{
        this.karta = karta;
        console.log("Getovana karta :");
        console.log(this.karta);



        this.izmenaForm.controls['avionskaKompanija'].setValue(karta.avionskaKompanija.id)
        //
        // this.izmenaForm.controls['pocetak'].setValue(karta.let.origin.name)
        // this.izmenaForm.controls['destinacija'].setValue(karta.let.destination.name)
        this.izmenaForm.controls['datumPolaska'].setValue(karta.departDate)
        this.izmenaForm.controls['datumPovratka'].setValue(karta.returnDate)
        this.izmenaForm.controls['brojKarata'].setValue(karta.count)
        this.izmenaForm.controls['let'].setValue(karta.let.id)

        if(karta.oneway){
          this.izmenaForm.controls['smer'].setValue("Jednosmerna")

        }else{
          this.izmenaForm.controls['smer'].setValue("Povratna")
        }


      })


    // })

    this.gradService.getGradovi().subscribe( gradovi =>{
      this.gradovi = gradovi
    })

    this.letoviService.getLetovi().subscribe( letovi =>{
      this.letovi = letovi
    })
    this.avionskaKompanijaService.getAvionskaKompanija().subscribe( kompanije =>{
      this.kompanije = kompanije

    })

  }



  public submitForm(form){
    console.log("Forma:");
    console.log(form);


    this.letovi.forEach(mojlet =>{
      if(mojlet.id == form.let){
        this.karta.let = mojlet
        console.log("Let:");
        console.log(mojlet);
      }

    })

    this.kompanije.forEach(kompanija =>{
      if(kompanija.id == form.avionskaKompanija){
        this.karta.avionskaKompanija = kompanija

      }
    })
    console.log("Broj karata:");
    console.log(form.brojKarata);
    this.karta.oneway = form.smer == "Jednosmerna";

    this.karta.departDate = form.datumPolaska
    this.karta.returnDate = form.datumPovratka
    this.karta.count = form.brojKarata

    console.log("AAAAAAAAAAAAAAAAAA");
    // let promenjiva = this.kartaService.izmenaKarte()
    console.log(this.karta);

    this.kartaService.izmenaKarte(this.karta).subscribe(karta =>{
      console.log("Vracena karta iz subscribe");
      console.log(karta);
      this.router.navigate([''])
    })
  }
  public get avionskaKompanija(){
    return this.izmenaForm.get('avionskaKompanija')
  }

  public get let(){
    return this.izmenaForm.get('let')
  }

  public get smer(){
    return this.izmenaForm.get('smer')
  }
  public get pocetak(){
    return this.izmenaForm.get('pocetak')
  }
  public get destinacija(){
    return this.izmenaForm.get('destinacija')
  }
  public get datumPolaska(){
    return this.izmenaForm.get('datumPolaska')
  }
  public get datumPovratka(){
    return this.izmenaForm.get('datumPovratka')
  }
  public get brojKarata(){
    return this.izmenaForm.get('brojKarata')
  }

  vratiSeNazad(){
    this.router.navigate([''])
  }


}
