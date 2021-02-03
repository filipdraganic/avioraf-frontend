import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login/login.service';
import {KorisnikService} from '../services/korisnik/korisnik.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-promena-sifre',
  templateUrl: './promena-sifre.component.html',
  styleUrls: ['./promena-sifre.component.css']
})
export class PromenaSifreComponent implements OnInit {

  public promenaSifreForm: FormGroup

  passwordText:string
  passwordConfirmText:string


  constructor(private loginService: LoginService,
              private korisnikService: KorisnikService,
              private router: Router,
              private formBuilder: FormBuilder,
              private userService: KorisnikService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {

    // this.loginForm = this.formBuilder.group({
    //   username:['', [Validators.required, Validators.minLength(4)]],
    //   password:['', [Validators.required, Validators.pattern("^(?=\\D*\\d)\\S{6,}$")]]
    //
    //
    // })

    this.promenaSifreForm = new FormGroup({
      password: new FormControl(this.passwordText,[
        Validators.required,
        Validators.pattern("^(?=\\D*\\d)\\S{6,}$")
      ]),
      passwordConfirm: new FormControl(this.passwordConfirmText, [
        Validators.required,
        Validators.pattern(this.passwordText),
      ])
    })
  }

  ngOnInit(): void {
  }

  public get passwordConfirm(){
    return this.promenaSifreForm.get('passwordConfirm')
  }

  public get password(){
    return this.promenaSifreForm.get('password')
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public submitForm(credentials){

    if(this.password.value !== this.passwordConfirm.value){
      this.openSnackBar("Sifre nisu iste, pokusajte opet", "Ok dude")
      return
    }

    let user = JSON.parse(localStorage.getItem("korisnik"));
    console.log(user.id);
    let promenjiv = this.korisnikService.updateSifraKorisniku(user.id, credentials.password).subscribe( afterUpdateSifraData =>{
      localStorage.setItem("korisnik", JSON.stringify(afterUpdateSifraData))
      this.router.navigate([''])
      console.log("Promenjena sifra");
    }, other=>{
      this.openSnackBar("Subscribed to changePassword error", "Oof");
    })

    // let promenjiva = this.loginService.login(credentials).subscribe(data=>{
    //
    //   this.korisnikService.setupLocalstorage().subscribe( data=>{
    //     console.log("USPEH!");
    //     console.log(data)
    //     localStorage.setItem("korisnik", JSON.stringify(data));
    //   }, other=>{
    //     console.log("ERROR" + other)
    //   })
    //
    //   this.router.navigate([''])
    //
    // }, other=> {
    //
    //   const dialogRef = this.dialog.open(DialogComponent);
    //
    //   dialogRef.afterClosed().subscribe(result => {
    //   })
    // });

    // this.loginService.setupLocalstorage()

  }

}
