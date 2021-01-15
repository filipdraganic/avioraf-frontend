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

@Component({
  selector: 'app-izmena-karata',
  templateUrl: './izmena-karata.component.html',
  styleUrls: ['./izmena-karata.component.css']
})
export class IzmenaKarataComponent implements OnInit {

  public izmenaForm: FormGroup
  karta: Karta
  gradovi : Grad[]
  private routeSub:Subscription
  smerovi: String[]
  constructor(private kartaService:KartaService,
              private router: Router,
              private formBuilder:FormBuilder,
              public dialog:MatDialog,

              private route:ActivatedRoute,
              private gradService:GradService) {

    this.izmenaForm = this.formBuilder.group({
      avionskaKompanija:['', [Validators.required, Validators.minLength(5)]],
      smer:['', [Validators.required]],
      pocetak:['', [Validators.required]],
      destinacija :['', [Validators.required]],
      datumPolaska:['', [Validators.required]],
      datumPovratka:[''],
      brojKarata:['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    // this.routeSub = this.route.params.subscribe(params => {

    this.smerovi = ["Jednosmerna","Povratna"]

      this.kartaService.getKarta(1).subscribe( karta =>{
        this.karta = karta;
        console.log("Getovana karta");
        console.log(this.karta);



        this.izmenaForm.controls['avionskaKompanija'].setValue(karta.avionskaKompanija.name)

        this.izmenaForm.controls['pocetak'].setValue(karta.let.origin.name)
        this.izmenaForm.controls['destinacija'].setValue(karta.let.destination.name)
        this.izmenaForm.controls['datumPolaska'].setValue(karta.departDate)
        this.izmenaForm.controls['datumPovratka'].setValue(karta.returnDate)
        this.izmenaForm.controls['brojKarata'].setValue(karta.count)

        if(karta.oneway){
          this.izmenaForm.controls['smer'].setValue("Jednosmerna")

        }else{
          this.izmenaForm.controls['smer'].setValue("Povratna")
        }


      })


    // })

    this.gradService.getGradovi().subscribe( gradovi =>{
      this.gradovi = gradovi
      console.log("Getovani gradovi");
      console.log(gradovi);
    })


  }

  public submitForm(form){

  }

  public set avionskaKompanija(value){

  }

  public set smer(smer){

  }

  public set pocetak(pocekta){

  }

  public set destinacija(destinacija){

  }

  public set datumPolaska(datum){

  }

  public set datumPovratka(datum){

  }

  public set brojKarata(broj){

  }

  public get avionskaKompanija(){
    return this.izmenaForm.get('avionskaKompanija')
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
