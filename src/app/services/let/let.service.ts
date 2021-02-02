import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Let} from '../../model/Let.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class LetService {

  private readonly getLetoviUrl = "http://localhost:8080/api/letovi/all"
  private readonly getLetUrl = "http://localhost:8080/api/letovi"
  private readonly delLetoviUrl = "http://localhost:8080/api/letovi"
  private readonly putLetUrl = "http://localhost:8080/api/letovi"


  private letovi: Observable<Let[]>

  private let: Observable<Let>

  private helper = new JwtHelperService()

  constructor(private http:HttpClient) {
  }


  getLetovi() : Observable<Let[]>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      console.log("Prvi");
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.letovi = this.http.get<Let[]>(this.getLetoviUrl,{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("jwt")

        }
      })
    }else{
      return null
    }

    return this.letovi;


  }

}
