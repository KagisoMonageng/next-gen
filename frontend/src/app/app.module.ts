import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrendingBlogsComponent } from './components/trending-blogs/trending-blogs.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TrendingBlogsComponent,
    BlogItemComponent,
    CommentsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
