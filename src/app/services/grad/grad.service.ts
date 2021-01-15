import {Observable} from 'rxjs';
import {Grad} from '../../model/Grad.model';
import {JwtHelperService} from '@auth0/angular-jwt';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn:'root'
})

export class GradService {

  private readonly getGradoviUrl = "http://localhost:8080/api/gradovi/all"
  private readonly getGradUrl = "http://localhost:8080/api/gradovi"
  private readonly delGradoviUrl = "http://localhost:8080/api/gradovi"
  private readonly putGradUrl = "http://localhost:8080/api/gradovi"


  private gradovi: Observable<Grad[]>

  private grad: Observable<Grad>

  private helper = new JwtHelperService()

  constructor(private http:HttpClient) {
  }


  getGradovi() : Observable<Grad[]>{
    if(this.helper.isTokenExpired(localStorage.getItem("jwt"))){
      localStorage.removeItem("jwt")
      console.log("Prvi");
      return null
    }

    if(localStorage.getItem("jwt") != null){
      this.gradovi = this.http.get<Grad[]>(this.getGradoviUrl,{
        headers:{
          'Authorization':'Bearer '+ localStorage.getItem("jwt")

        }
      })
    }else{
      return null
    }

    return this.gradovi;


  }


}
