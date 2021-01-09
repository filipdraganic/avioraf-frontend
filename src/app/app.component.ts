import {ChangeDetectorRef, Component} from '@angular/core';
import {Router} from '@angular/router';

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
    this.router.navigate(['']);

  }

  getUsername(){
    return localStorage.getItem("username");
  }

  ngAfterViewChecked(){
    console.log("ng after view checked");
    this.cdRef.detectChanges();
  }
}
