import {Observable} from 'rxjs';
import {Karta} from '../../model/Karta.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
  })
}

@Injectable({
  providedIn:'root'
})



export class KartaService {


  private readonly getKarteUrl = "http://localhost:8080/api/karte/all"
  private readonly getKartaUrl = "http://localhost:8080/api/karte"
  private readonly delKarteUrl = "http://localhost:8080/api/karte"
  private readonly putKartaUrl = "http://localhost:8080/api/karte/"


  private karte: Observable<Karta[]>

  private karta: Observable<Karta>

  private helper = new JwtHelperService()

  constructor(private http:HttpClient) {
  }


  getKarte(pageIndex) : Observable<Karta[]>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      console.log("Prvi");
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.karte = this.http.get<Karta[]>(this.getKarteUrl,{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("jwt")

        },
        params:{
          currentPage:pageIndex+1
        }
      })
    }else{
      return null
    }

    return this.karte;


  }



  getKarta(id) : Observable<Karta>{

    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.karta = this.http.get<Karta>(this.getKartaUrl,{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("jwt")

        },
        params:{
          id:id
        }
      })
    }else{
      return null
    }

    return this.karta;
  }


  delKarta(karta) {
    console.log("Brisanje karte start");
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    console.log("Brisanje karte 2 sa idjem " + karta.id);

    if(localStorage.getItem("jwt") != null){
      let promenjiva = this.http.delete<Karta>(this.delKarteUrl+"/"+karta.id,{
        headers:{
          'content-type': 'application/json',
          'Authorization':'Bearer '+ localStorage.getItem("jwt")

        },params:{

        }


      })
      console.log("Brisanje karte 3");
      console.log(promenjiva);
      return promenjiva;
    }else{
      return null
    }
  }

  izmenaKarte(karta) {
    console.log("izmena karte start");
    console.log(karta);
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      return null
    }

    console.log("izmena karte 2");
    if(karta.oneway == true){
      karta.returnDate = null
    }

    if(localStorage.getItem("jwt") != null){
      let response = this.http.put(this.putKartaUrl,{
          id: karta.id,
          avionskaKompanija: karta.avionskaKompanija,
          oneway: karta.oneway,
          departDate: karta.departDate,
          returnDate: karta.returnDate,
          let: karta.let,
          count: karta.count

        }, httpOptions



      )
      console.log("izmena karte 3");
      console.log(this.karta);
      return response
    }else{
      return null
    }

    return null
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
