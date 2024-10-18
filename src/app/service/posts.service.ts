import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private storage:AngularFireStorage,private afs:Firestore,private routr:Router,private toastr:ToastrService) { }
  uploadImage(selectedImg:any,postData:any,formStatus:any,id:any){
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath)
    this.storage.upload(filePath,selectedImg).then(()=>{
      console.log("post image uploaded successfully")
      this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
       postData.postImgPath = URL;
       this.saveData(postData)
      //  if(formStatus == "Edit"){
      //   this.updateData(id,postData)
      //  }
      //  else{
      //   this.saveData(postData)
      //  }
    

      })
    })
  }
  saveData(postData:any){
    const data = collection(this.afs,"posts")
    addDoc(data,postData).then(()=>{
      this.toastr.success('Data is submitted successfully')
    })
    this.routr.navigate(['/new-post'])
  }
  fetchData(){
    const data = collection(this.afs,"posts")
    return collectionData(data,{idField:'id'})
    
  }
  getById(id: any): Observable<any> {
    return docData(doc(this.afs, "posts" + '/' + id));
  }
  // updateData(id: any, data: any) {

  //  updateDoc(doc(this.afs, "posts" + '/' + id), data).then(res=>{
  //   console.log("data is updated successfully");
  //   this.routr.navigate(['/new-post'])
  //  });
  // }

  updateData(id: string, data: any) {
    // const postDoc = doc(this.afs, "posts" + '/' + id);
    // console.log(postDoc)
    // console.log(data)
    
    // updateDoc(postDoc, data)
    //   .then(() => {
    //     console.log("Data is updated successfully");
    //     this.routr.navigate(['/new-post']);
    //   })
    //   .catch((error) => {
    //     console.error("Error updating document: ", error);
    //   });
  }
  removeImage(postImgPath:any,id:any){
    this.storage.storage.refFromURL(postImgPath);
    this.removeData(id)
  }
  removeData(id:string){
    const data = doc(this.afs,"posts" , id)
    deleteDoc(data).then(res=>{
      console.log("category is deleted")
    })
  }
  markFeatured(id:any,featureData:any){
   updateDoc(doc(this.afs, "posts" + '/' + id), featureData).then(res=>{
    console.log("Featured Status Updated");
      });
  }
}
