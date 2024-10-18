import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Category } from 'src/app/core/models/category';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  categories:any
  formCategory:any;
  formStatus:string = "Add";
constructor(private _category:CategoriesService){}
ngOnInit(): void {
  this.getData()
}
  onSave(formData:any){
    if(this.formStatus == "Add"){
      this._category.postData(formData);
      formData.reset()
    }
   else if(this.formStatus=="Edit"){
// this._category.updateData()
    }
  
  }
  getData(){
    this._category.fetchData().subscribe(res=>{
      console.log(res)
      this.categories = res;
    })
  }
  onEdit(category:Category){
console.log(category)
this.formCategory = category;
this.formStatus = "Edit"
  }
  
  deleteData(id:string){
this._category.removeData(id);
  }
}
