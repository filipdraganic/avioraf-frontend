import {HttpClient} from '@angular/common/http';
import {Rezervacija} from '../../model/rezervacija.model';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class RezervacijaService {

  private readonly getRezervacijeUrl = "http://localhost:8080/rezervacije"
  private readonly getRezervacijaUrl = "http://localhost:8080/rezervacije"
  private readonly delRezervacijeUrl = "http://localhost:8080/rezervacije"


  private rezervacije: Observable<Rezervacija[]>

  private rezervacija: Observable<Rezervacija>

  private helper = new JwtHelperService()

  constructor(private http:HttpClient) {
  }


  getRezervacije() : Observable<Rezervacija[]>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.rezervacije = this.http.get<Rezervacija[]>(this.getRezervacijeUrl,{

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

  delRezervacija(id) : Observable<Rezervacija>{

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.rezervacija = this.http.get<Rezervacija>(this.delRezervacijeUrl,{
        params:{
          id:id
        }
      })
    }else{
      return null
    }


    return this.rezervacija;
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



}
