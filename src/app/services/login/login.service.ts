import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Credentials} from '../../model/credentials.model';
import {map} from 'rxjs/operators';
import {Korisnik} from '../../model/korisnik.model';

@Injectable({
  providedIn:'root'
})

export class LoginService {

  private readonly loginUrl = 'http://localhost:8080/api/korisnici/login'
  private readonly getKorisnik = 'http://localhost:8080/api/korisnici/'
  constructor(private http: HttpClient) {

  }

  ngOnDestroy(): void{
    this.logout()
  }

  login(credentials){

    const body: string= "{" +
      '"username":' + '"' + credentials.username + '"'+
      ',"password":' +'"' + credentials.password+'"' +
      "}"
    return this.http.post(this.loginUrl, body).pipe(map((responseData: Credentials)=>{
      console.log("pipeovanje")
      // console.log(responseData)
      localStorage.setItem("jwt", responseData.JWT)
      localStorage.setItem("username", responseData.username)



    }))

  }

  setupLocalstorage(){
    console.log(this.getKorisnik + localStorage.getItem("username"))
    return this.http.get(this.getKorisnik + localStorage.getItem("username")).pipe(map((korisnik: Korisnik)=>{
      console.log("pipeovanje2")
      // console.log(responseData)
      localStorage.setItem("id", String(korisnik.id))
      console.log(localStorage.getItem("id"))



    }))
  }

  logout(){
    localStorage.removeItem("jwt")
    localStorage.removeItem("username")
    localStorage.removeItem('id')
  }
}
