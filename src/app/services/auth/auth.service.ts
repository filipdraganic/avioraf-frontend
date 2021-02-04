import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
  })
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getAuthenticatedStatus  = "http://localhost:8080/api/korisnici/isAuthenticated"

  constructor(private http: HttpClient) { }


  isAuthenticated():Observable<HttpErrorResponse> {
    return this.http.get<any>(this.getAuthenticatedStatus, httpOptions)


  }



}
