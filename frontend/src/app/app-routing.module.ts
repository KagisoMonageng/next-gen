import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { TrendingBlogsComponent } from './components/trending-blogs/trending-blogs.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';

const routes: Routes = [
  // Paths go in here
  {
    path: 'add',component: AddBlogComponent,
  },
  {
    path:'trending',component: TrendingBlogsComponent,
  },
  {
    path:'view-content/:id',component: ViewBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
