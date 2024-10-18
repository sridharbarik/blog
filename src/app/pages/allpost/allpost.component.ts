import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/post';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-allpost',
  templateUrl: './allpost.component.html',
  styleUrls: ['./allpost.component.scss']
})
export class AllpostComponent implements OnInit{
  postInfo:any[]=[];
  constructor(private post:PostsService){}
  ngOnInit(): void {
    this.getAllpost()
  }
  getAllpost(){
    this.post.fetchData().subscribe(res=>{
      console.log(res)
      this.postInfo= res
    })
  }
  onDelete(postImgPath:any,id:any){
    this.post.removeImage(postImgPath,id)
  }
  onFeatured(id:any,value:any){
    const feauredData ={
      isFeatured:value
    }
    this.post.markFeatured(id,feauredData)
  }
}
