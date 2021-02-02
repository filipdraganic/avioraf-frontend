import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {AvionskaKompanija} from '../../model/avio-kompanija.model';

@Injectable({
  providedIn: 'root'
})
export class AvionskaKompanijaService {

  private readonly getAvionskaKompanijeUrl = "http://localhost:8080/api/kompanije/all"
  private readonly getAvionskaKompanijaUrl = "http://localhost:8080/api/kompanije"
  private readonly delAvionskaKompanijaUrl = "http://localhost:8080/api/kompanije"
  private readonly putAvionskaKompanijaUrl = "http://localhost:8080/api/kompanije"


  private avionskaKompanije: Observable<AvionskaKompanija[]>

  private avionskaKompanija: Observable<AvionskaKompanija>

  private helper = new JwtHelperService()

  constructor(private http:HttpClient) {
  }


  getAvionskaKompanija() : Observable<AvionskaKompanija[]>{
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

}
