import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {AvionskaKompanija} from '../../model/avio-kompanija.model';
import {Karta} from '../../model/karta.model';

@Injectable({
  providedIn: 'root'
})
export class AvionskaKompanijaService {

  private readonly getAvionskaKompanijeUrl = "http://localhost:8080/api/kompanije/all"
  private readonly getAvionskaKompanijaUrl = "http://localhost:8080/api/kompanije"
  private readonly delAvionskaKompanijaUrl = "http://localhost:8080/api/kompanije"
  private readonly putAvionskaKompanijaUrl = "http://localhost:8080/api/kompanije"
  private readonly postAvionskaKompanijaUrl = "http://localhost:8080/api/kompanije"

  private readonly getKarteAvionskeKompanijeUrl = "http://localhost:8080/api/karte/avioKompanija"



  private avionskaKompanije: Observable<AvionskaKompanija[]>
  private avionskaKompanija: Observable<AvionskaKompanija>

  private karte: Observable<Karta[]>

  private helper = new JwtHelperService()

  constructor(private http:HttpClient) {
  }


  getAvionskaKompanije() : Observable<AvionskaKompanija[]>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      console.log("Prvi");
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.avionskaKompanije = this.http.get<AvionskaKompanija[]>(this.getAvionskaKompanijeUrl,{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("jwt")

        }
      })
    }else{
      return null
    }

    return this.avionskaKompanije;


  }

  getAvionskaKompanija(id: number) : Observable<AvionskaKompanija>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      console.log("Prvi");
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.avionskaKompanija = this.http.get<AvionskaKompanija>(this.getAvionskaKompanijaUrl+"/"+id,{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("jwt")

        }
      })
    }else{
      return null
    }

    return this.avionskaKompanija;


  }

  getKarteAvionskeKompanije(id): Observable<Karta[]>{

    this.karte = this.http.get<Karta[]>(this.getKarteAvionskeKompanijeUrl, {
      headers:{
        'Authorization':'Bearer '+ localStorage.getItem("jwt")
      },
      params:{
        avioKompanijaId: id
      }
    })

    return this.karte
  }

  updateAvionskaKompanija(avioKompanija: AvionskaKompanija) :Observable<AvionskaKompanija>{

    this.avionskaKompanija =  this.http.put<AvionskaKompanija>(this.putAvionskaKompanijaUrl, {
      id:avioKompanija.id,
      name:avioKompanija.name
    }, {
      headers:{
        'Authorization':'Bearer '+ localStorage.getItem("jwt")
      },

    })
    return this.avionskaKompanija

  }

  deleteAvionskaKompanija(avioKompanija: AvionskaKompanija) :Observable<ArrayBuffer>{

    return this.http.delete<ArrayBuffer>(this.delAvionskaKompanijaUrl+"/"+avioKompanija.id, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      }
    })
  }

  newAvionskaKompanija(name: string): Observable<AvionskaKompanija>{

    return this.http.post<AvionskaKompanija>(this.postAvionskaKompanijaUrl, {
      name:name
    },{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("jwt")
      },
    })

  }



}
