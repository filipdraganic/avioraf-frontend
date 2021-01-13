import {Observable} from 'rxjs';
import {Karta} from '../../model/Karta.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class KartaService {


  private readonly getKarteUrl = "http://localhost:8080/api/karte/all"
  private readonly getKartaUrl = "http://localhost:8080/api/karte"
  private readonly delKarteUrl = "http://localhost:8080/api/karte"


  private karte: Observable<Karta[]>

  private karta: Observable<Karta>

  private helper = new JwtHelperService()

  constructor(private http:HttpClient) {
  }


  getKarte() : Observable<Karta[]>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      console.log("Prvi");
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.karte = this.http.get<Karta[]>(this.getKarteUrl,{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("jwt")

        }
      })
      console.log("drugi");
    }else{
      console.log("treci");
      return null
    }

    console.log("cetvrti");
    return this.karte;


  }

  getKarta(id) : Observable<Karta>{

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.karta = this.http.get<Karta>(this.getKartaUrl,{
        params:{
          id:id
        }
      })
    }else{
      return null
    }


    return this.karta;
  }

  delKarta(id) : Observable<Karta>{

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.karta = this.http.get<Karta>(this.delKarteUrl,{
        params:{
          id:id
        }
      })
    }else{
      return null
    }


    return this.karta;
  }

  searchKarte(query):Observable<Karta[]>{

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.karte = this.http.get<Karta[]>(this.getKarteUrl,{
        params:{
          query:query
        }
      })
    }else{
      return null
    }


    return this.karte;
  }




}
