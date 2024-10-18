import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AllpostComponent } from './pages/allpost/allpost.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {path:"",component:DashboardComponent,canActivate:[AuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"categories",component:CategoriesComponent,},
  {path:"new-post",component:AllpostComponent},
  {path:"new-post/add-post",component:AddPostComponent},
  {path:"new-post/add-post",component:AddPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
