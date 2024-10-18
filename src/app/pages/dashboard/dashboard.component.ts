import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  constructor(private _auth:AuthService,private _router:Router){}
  ngOnInit(): void {

    localStorage.getItem('user');
    console.log(this._auth.isLoggedGuard)
    if(this._auth.isLoggedin()){
        this._router.navigate(['/']);
        console.log("logged in")
      }
  }

}
