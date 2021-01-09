import { Component, OnInit } from '@angular/core';
import {LoginService} from '../services/login/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {KorisnikService} from '../services/korisnik/korisnik.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  constructor(private loginService: LoginService,
              private router: Router,
              private formBuilder: FormBuilder,
              private userService: KorisnikService) {

    this.loginForm = this.formBuilder.group({
      username:['', [Validators.required, Validators.minLength(4)]],
      password:['', [Validators.required, Validators.pattern("^(?=\\D*\\d)\\S{6,}$")]]
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
    this.loginService.login(credentials).subscribe(data=>{
      this.router.navigate([''])

    })
    this.loginService.setupLocalstorage()

  }



}
