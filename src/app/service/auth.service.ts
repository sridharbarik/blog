import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedGuard:boolean = false;
  constructor(private afsAuth:AngularFireAuth,
    private router:Router,
  private toastr:ToastrService) { }
  login(email:any,password:any){
    this.afsAuth.signInWithEmailAndPassword(email,password).then(()=>{
      this.toastr.success("Logged in successfull")
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedGuard  = true;
      
      this.router.navigate(['/'])
    }).catch(e=>{
      console.log("Invalid Credential")
    })
  }
  loadUser(){
    return this.afsAuth.authState.subscribe(res=>{
      localStorage.setItem('user',JSON.stringify(res) )
    })
  }
  logout(){
    this.afsAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.loggedIn.next(false)
      this.isLoggedGuard = false
      this.router.navigate(['/login'])
    })
  }
  isLoggedin(){
    return this.loggedIn.asObservable()
  }

}
