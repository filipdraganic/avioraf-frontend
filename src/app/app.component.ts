import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'avioraf-frontend';
  today: number = Date.now();

  constructor(private cdRef: ChangeDetectorRef,  private router: Router){}

  checkLogin(){
    if(localStorage.getItem('jwt') == null){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem("jwt");
    this.router.navigate(['login']);

  }

  getUsername(){
    if(localStorage.getItem("jwt") == null) {

    }
    else{

      return localStorage.getItem("username");
    }
  }

  getPermission(){
    let korisnik =  JSON.parse(localStorage.getItem("korisnik"));


    if(korisnik.userType == "ADMIN"){
      // console.log("Korisnik je admin");
      return true
    }
    else {
      // console.log("Korisnik je obican user" + korisnik.tipKorisnika)
      return false
    }
  }

  getNumberOfBookings(){
    let korisnik = JSON.parse(localStorage.getItem('korisnik'));

    return korisnik.bookings.length
  }


  getBookingsCount(){
    return "BookingsCount :" + (JSON.parse(localStorage.getItem("korisnik"))["bookings"]).length
  }



  ngAfterViewChecked(){
    //console.log("ng after view checked");
    this.cdRef.detectChanges();
  }
}
