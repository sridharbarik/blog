import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  emaildata!:any;
  isLoggedin$:Observable<boolean>
  constructor(private _auth:AuthService,private _router:Router){}
ngOnInit(): void {
  if (this.emaildata !== null) {
    const data = localStorage.getItem('user');
    this.emaildata=JSON.parse(data!).email;
  }
  this.isLoggedin$ = this._auth.isLoggedin();
  const data = localStorage.getItem('user');
  if(data != null){
    this.isLoggedin$ = this._auth.isLoggedin();
    console.log("header")
  }
  
  // if(this._auth.isLoggedGuard){
  //   location.reload()
  //     this._router.navigate(['/dashboard']);
  //   }
  

}
onlogout(){
  this._auth.logout()
}
}
