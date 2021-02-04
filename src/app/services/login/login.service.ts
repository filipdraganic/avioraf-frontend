import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Credentials} from '../../model/credentials.model';
import {map} from 'rxjs/operators';
import {Korisnik} from '../../model/korisnik.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class LoginService {

  private readonly loginUrl = 'http://localhost:8080/api/korisnici/login'
  private readonly getKorisnik = 'http://localhost:8080/api/korisnici/username'

  private korisnik : Observable<Korisnik>

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
    let promenjiva =  this.http.post(this.loginUrl, body).pipe(map((responseData: Credentials)=>{
      //console.log("pipeovanje")
      console.log(responseData)
      localStorage.setItem("jwt", responseData.JWT)
      localStorage.setItem("username", responseData.username)
      this.http.get(this.getKorisnik)


    }))

    console.log(promenjiva)

    return promenjiva

  }



  logout(){
    localStorage.removeItem("jwt")
    localStorage.removeItem("username")
    localStorage.removeItem('id')
    localStorage.removeItem('korisnik')
  }
}
