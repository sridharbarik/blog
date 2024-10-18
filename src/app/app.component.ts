import { Component, OnInit } from '@angular/core';
import { Firestore,collection,addDoc,doc, updateDoc} from '@angular/fire/firestore';
// import { doc } from 'firebase/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';
import { AppService } from './service/app.service';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-firebase';
  userData!:Observable<any>
  post: any;
  isLoggedin$:Observable<boolean>
  constructor(private afs:Firestore,
    private service:AppService,
    private _auth:AuthService,
    private _router:Router
  ){this. getData()}
  ngOnInit(): void {
    this.isLoggedin$ = this._auth.isLoggedin()
 
  }
  saveData(fData:any){
this.service.loadData(fData)
  }
  getData(){
this.service.data().subscribe(res=>{
  console.log("my data",res)
})
  }



  // getPostsById(id: string) {
  //   this.service.getById(this.getId).subscribe((data) => {
  //     this.post = data;
  //   });
  // }
  updateData(id:string){
    const docINstance = doc(this.afs,"user",id);
    const updateData = {
      name:'updatedData'
    }
    updateDoc(docINstance,updateData).then(()=>{
console.log('doc is updated')
    })
  }
}
