import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Korisnik} from '../../model/korisnik.model';
import { JwtHelperService } from "@auth0/angular-jwt";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
  })
}


@Injectable({
  providedIn: 'root'
})

export class KorisnikService{
  private readonly getUsersUrl = "http://localhost:8080/api/korisnici/all"
  private readonly getUserUrl = "http://localhost:8080/api/korisnici/username"
  private readonly delUserUrl = "http://localhost:8080/api/korisnici/"
  private readonly createUserUrl = "http://localhost:8080/api/korisnici/"
  private readonly addBookingToUserUrl = "http://localhost:8080/api/korisnici/booking"
  private readonly getKorisnikUrl = "http://localhost:8080/api/korisnici/username"
  private readonly updateUserPasswordUrl = "http://localhost:8080/api/korisnici/sifra"
  private readonly updateKorisnikUrl = "http://localhost:8080/api/korisnici"

  private users
  private user: Observable<Korisnik>
  private helper = new JwtHelperService()
  private korisnik: Observable<Korisnik>

  constructor(private http: HttpClient, private router: Router) {
  }

  getUsers(){

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      console.log("null")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.users = this.http.get(this.getUsersUrl,{
        params:{},
        headers:{
          'content-type': 'application/json',
          'Authorization':'Bearer '+ localStorage.getItem("jwt")
        }

      })
      console.log("sad idu useri")
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
      ",userType:" + korisnik.userType+
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

  addBookingToUser(bookingId:Number) :Observable<Korisnik>{

  let korisnikId = JSON.parse(localStorage.getItem("korisnik"))['id']
  let jwttoken = this.helper.decodeToken(localStorage.getItem("jwt"))

    console.log(jwttoken)

    let promenjiva = this.http.put<Korisnik>(this.addBookingToUserUrl, {
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      },
      params:{
        bookingId:bookingId,
        korisnikId:korisnikId
      }
    })

    return promenjiva

  }

  setupLocalstorage() :Observable<Korisnik>{

    this.korisnik = this.http.get<Korisnik>(this.getUserUrl, {
      params:{
        username:localStorage.getItem("username")
      },
      headers:{
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
    })
    console.log("RETURN DATA BELOW");
    console.log(this.korisnik);

    return this.korisnik

  }

  updateSifraKorisniku(id, password): Observable<Korisnik>{

    this.korisnik = this.http.put<Korisnik>(this.updateUserPasswordUrl, { },{
      headers:new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('jwt')
      }),
      params:{
        password:password,
        test:id
      }
    })

    return this.korisnik

  }

  updateKorisnik(user: Korisnik):Observable<Korisnik>{

    this.korisnik = this.http.put<Korisnik>(this.updateKorisnikUrl, {
      id: user.id,
      username: user.username,
      password: user.password,
      userType: user.userType,
      bookings: user.bookings,
      noviKolacic: user.noviKolacic
    })

    return this.korisnik

  }



}
