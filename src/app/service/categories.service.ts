import { Injectable } from '@angular/core';
import { Firestore,collection,addDoc,doc, updateDoc, deleteDoc} from '@angular/fire/firestore';
import { collectionData, docData } from 'rxfire/firestore';
import { Category } from '../core/models/category';
import { map } from 'rxjs';
import { setDoc } from 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:Firestore) { }

  postData(formData:Category){
    const data = collection(this.afs,"category")
    addDoc(data,formData.value).then(()=>{
      console.log("data is submitted succesfully")
    })
  }
  fetchData(){
    const data = collection(this.afs,"category")
    return collectionData(data,{idField:'id'})
    
  }
  updateData(id:any,EditedData:any){
    updateDoc(doc(this.afs, "category" , id), EditedData);
  }
  removeData(id:string){
    const data = doc(this.afs,"category" , id)
    deleteDoc(data).then(res=>{
      console.log("category is deleted")
    })
  }
}
