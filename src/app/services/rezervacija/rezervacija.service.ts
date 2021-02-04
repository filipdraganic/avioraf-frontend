import {HttpClient, HttpResponse} from '@angular/common/http';
import {Rezervacija} from '../../model/rezervacija.model';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';
import {Karta} from '../../model/karta.model';

@Injectable({
  providedIn:'root'
})

export class RezervacijaService {

  private readonly getRezervacijeUrl = "http://localhost:8080/api/rezervacije"
  private readonly getRezervacijaUrl = "http://localhost:8080/api/rezervacije"
  private readonly delRezervacijeUrl = "http://localhost:8080/api/rezervacije"
  private readonly postRezervacijaUrl = "http://localhost:8080/api/rezervacije"


  private rezervacije: Observable<Rezervacija[]>

  private rezervacija: Observable<Rezervacija>

  private helper = new JwtHelperService()

  constructor(private http:HttpClient) {
  }


  getRezervacijeOfKorisnik(id) : Observable<Rezervacija[]>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){

      this.rezervacije = this.http.get<Rezervacija[]>(this.getRezervacijeUrl,{
        headers:{
          'Authorization': 'Bearer ' + localStorage.getItem("jwt")
        },
        params:{
          korisnikId:id
        }
      })
    }else{
      return null
    }


    return this.rezervacije;


  }

  getRezervacija(id) : Observable<Rezervacija>{

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.rezervacija = this.http.get<Rezervacija>(this.getRezervacijaUrl,{
        params:{
          id:id
        }
      })
    }else{
      return null
    }


    return this.rezervacija;
  }

  delRezervacija(id) : Observable<HttpResponse<any>>{
    let response
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }
    if(localStorage.getItem("jwt") != null){
      response = this.http.delete<HttpResponse<any>>(this.delRezervacijeUrl+"/"+id,{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("jwt")
        }
      })
    }else{
      return null
    }


    return response;
  }

  searchRezervacije(query):Observable<Rezervacija[]>{

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.rezervacije = this.http.get<Rezervacija[]>(this.getRezervacijeUrl,{
        params:{
          query:query
        }
      })
    }else{
      return null
    }


    return this.rezervacije;
  }

  postRezervacija(karta: Karta) :Observable<Rezervacija>{

    let korisnikKojiRezervise = JSON.parse(localStorage.getItem("korisnik"))
    let jwttoken = this.helper.decodeToken(localStorage.getItem("jwt"))

    console.log(korisnikKojiRezervise)

    return this.http.post<Rezervacija>(this.postRezervacijaUrl, {
      rezervacija: {

        let: karta.let,
        avionskaKarta: karta,
        korisnik: korisnikKojiRezervise

      },
      korisnik: korisnikKojiRezervise
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
    })

  }

}
