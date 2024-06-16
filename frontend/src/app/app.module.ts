import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrendingBlogsComponent } from './components/trending-blogs/trending-blogs.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCommentComponent } from './components/edit-comment/edit-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    TrendingBlogsComponent,
    BlogItemComponent,
    CommentsSectionComponent,
    EditCommentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
