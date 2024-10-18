import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _login:AuthService){}
  onSubmit(loginForm:any){
    this._login.login(loginForm.email,loginForm.password)
    
  }
}
