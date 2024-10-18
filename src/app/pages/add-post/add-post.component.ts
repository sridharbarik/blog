import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { Post } from 'src/app/core/models/post';
import { CategoriesService } from 'src/app/service/categories.service';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit{
  permalink:string = '';
  imgSrc:any = 'assets/image-placeholder.png';
  selectedImg:any;
  postCategory:Category[] = [];
  editData:any;
  postForm:FormGroup;
  formStatus:string = "Add New";
  docId:string | undefined;
  constructor(private _categoryService:CategoriesService,
    private fb:FormBuilder,
    private post:PostsService,
    private _activate:ActivatedRoute
  ){
    this._activate.queryParams.subscribe(res=>{
      console.log(res.id)
      this.docId = res.id;
      this.post.getById(res.id).subscribe(value=>{
        console.log(value)
        this.postForm.patchValue(value);
        console.log(this.postForm.controls['category'].patchValue("hello"))
        console.log(this.postForm.get('category')?.setValue("value.category.categ"))
        this.imgSrc=value.postImgPath
        console.log(this.imgSrc)
      })
    })


    this.postForm = this.fb.group({
      title:['',[Validators.required,Validators.minLength(10)]],
      permalink:['',[Validators.required]],
      excerpt:['',[Validators.required,Validators.minLength(50)]],
      category:[''],
      postImage:['',[Validators.required]],
      content:['',[Validators.required]]
    })
    this.formStatus = "Edit";
  }
  ngOnInit(): void {
    this._categoryService.fetchData().subscribe((res:any)=>{
    this.postCategory = res
    })
  }
  get Fc(){
    return this.postForm.controls;
  }
  onTitleChange($event:any){
    console.log($event.target.value);
    const title = $event.target.value;
   this.permalink = title.replace(/\s/g,'-');
   this.postForm.controls.permalink.setValue(this.permalink)

  }
  onPreview($event:any){
    const reader = new FileReader();
    reader.onload = (e)=>{
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0]
  }
  onPostForm(){
   
    const splitted = this.postForm.value.category.split('-')
    console.log(splitted)
    const postData:Post={
      title:this.postForm.value.title,
      permalink:this.postForm.value.permalink,
      category:{
        categoryId:splitted[0],
        category:splitted[1]
      },
      postImgPath:'',
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      views:0,
      status:'new',
      createAt:new Date()
    }
    console.log(postData)
    this.post.uploadImage(this.selectedImg,postData,this.formStatus,this.docId)
    this.postForm.reset();
    this.imgSrc = 'assets/image-placeholder.png';
  }

}
