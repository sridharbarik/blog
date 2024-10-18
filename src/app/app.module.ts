import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {provideFirestore,getFirestore} from '@angular/fire/firestore'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AllpostComponent } from './pages/allpost/allpost.component';
import { AddPostComponent } from './pages/add-post/add-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { LoginComponent } from './auth/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { TimestampToDatePipe } from './core/timestamp-to-date.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    AllpostComponent,
    AddPostComponent,
    LoginComponent,
    TimestampToDatePipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularEditorModule,
    HttpClientModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    provideFirebaseApp(()=> initializeApp(environment.firebaseConfig)),
    provideFirestore(()=>getFirestore()),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
