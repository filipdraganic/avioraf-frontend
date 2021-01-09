import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Korisnik} from '../../model/korisnik.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class KorisnikService{
  private readonly getUsersUrl = "http://localhost:8080/api/korisnici/all"
  private readonly getUserUrl = "http://localhost:8080/api/korisnici/"
  private readonly delUserUrl = "http://localhost:8080/api/korisnici/"
  private readonly createUserUrl = "http://localhost:8080/api/korisnici/"
  private readonly addBookingToUserUrl = "http://localhost:8080/api/korisnici/"

  private users: Observable<Korisnik[]>
  private user: Observable<Korisnik>
  private helper = new JwtHelperService()

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsers(): Observable<Korisnik[]>{

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.users = this.http.get<Korisnik[]>(this.getUsersUrl,{
        params:{},
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("jwt")
        }

      })
      return this.users
    }
    else return null
  }

  getUser(): Observable<Korisnik>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    this.user = this.http.get<Korisnik>(this.getUserUrl,{
      params:{},
      headers:{
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
    })
  }

  deleteUser(id:number): Observable<Korisnik>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }
    this.user = this.http.delete<Korisnik>(this.delUserUrl+id, {
      params:{},
      headers:{
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
    })

    return this.user
  }

  newUser(korisnik:Korisnik): Observable<Korisnik>{

    const body: string= "{" +
      "id:0" +
      ",username:" + korisnik.username+
      ",password:" + korisnik.password+
      ",userType:" + korisnik.tipKorisnika+
      "}"

    return this.http.post<Korisnik>(this.createUserUrl, body,
      {
        params:{
        },
        headers:{
          "Content-Type":"application/json;charset=utf-8",
          "Autorization":"Bearer " + localStorage.getItem("jwt")
        }
      })

  }

  addBookingToUser(bookingId:Number, korisnikId:Number){

    let jwttoken = this.helper.decodeToken(localStorage.getItem("jwt"))

    console.log(jwttoken)
  }



}