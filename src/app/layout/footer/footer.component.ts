import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  emaildata!:any;
  isLoggedin$:Observable<boolean>
  constructor(private _auth:AuthService){}
ngOnInit(): void {
  this.isLoggedin$ = this._auth.isLoggedin();

}

}
