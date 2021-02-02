import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login/login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {KorisnikService} from '../services/korisnik/korisnik.service';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  usernameText:string
  passwordText:string


  constructor(private loginService: LoginService,
              private korisnikService: KorisnikService,
              private router: Router,
              private formBuilder: FormBuilder,
              private userService: KorisnikService,
              public dialog: MatDialog) {

    // this.loginForm = this.formBuilder.group({
    //   username:['', [Validators.required, Validators.minLength(4)]],
    //   password:['', [Validators.required, Validators.pattern("^(?=\\D*\\d)\\S{6,}$")]]
    //
    //
    // })

    this.loginForm = new FormGroup({
      username: new FormControl(this.usernameText,[
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl(this.passwordText, [
        Validators.required,
        Validators.pattern("^(?=\\D*\\d)\\S{6,}$")
      ])
    })
  }

  ngOnInit(): void {
  }

  public get username(){
    return this.loginForm.get('username')
  }

  public get password(){
    return this.loginForm.get('password')
  }

  public submitForm(credentials){

    let promenjiva = this.loginService.login(credentials).subscribe(data=>{

      this.korisnikService.setupLocalstorage().subscribe( data=>{
        console.log("USPEH!");
        console.log(data)
        localStorage.setItem("korisnik", JSON.stringify(data));
      }, other=>{
        console.log("ERROR" + other)
      })

      this.router.navigate([''])

    }, other=> {

      const dialogRef = this.dialog.open(DialogComponent);

      dialogRef.afterClosed().subscribe(result => {
      })
    });

    // this.loginService.setupLocalstorage()

  }



}
