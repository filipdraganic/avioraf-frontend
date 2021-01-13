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
  private router: Router;
  today: number = Date.now();

  constructor(private cdRef: ChangeDetectorRef){}

  checkLogin(){
    if(localStorage.getItem('jwt') == null){
      return false;
    }else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem("jwt");
    this.router.navigate(['/login']);

  }

  getUsername(){
    return JSON.parse(localStorage.getItem("korisnik"))["username"];
  }

  getBookingsCount(){
    return "BookingsCount :" + (JSON.parse(localStorage.getItem("korisnik"))["bookings"]).length
  }



  ngAfterViewChecked(){
    //console.log("ng after view checked");
    this.cdRef.detectChanges();
  }
}
