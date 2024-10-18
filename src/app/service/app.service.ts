import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,doc, updateDoc} from '@angular/fire/firestore';
// import { doc } from 'firebase/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  userData!:Observable<any>
  constructor(private afs:Firestore) { }

  loadData(fData:any){
    const data = collection(this.afs,"user")
addDoc(data,fData.value).then(()=>{
  console.log("data submitted successfully")
})
  }
data(){
  // const data = collection(this.afs,"user");
  //    collectionData(data,{idField:"id"})
  //   this.userData = collectionData(data,{idField:"id"})


    return collectionData(collection(this.afs, "user"));
}
getById(id: any): Observable<any> {
  return docData(doc(this.afs, "user" + '/' + id));
}
}
