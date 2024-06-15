import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrendingBlogsComponent } from './components/trending-blogs/trending-blogs.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TrendingBlogsComponent,
    BlogItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
