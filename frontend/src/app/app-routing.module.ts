import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { TrendingBlogsComponent } from './components/trending-blogs/trending-blogs.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { HomeDashComponent } from './components/home-dash/home-dash.component';
import { ViewAllBlogsComponent } from './components/view-all-blogs/view-all-blogs.component';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  // Paths go in here
  {
    path: '',component: LandingComponent,
  },
  {
    path: 'add',component: AddBlogComponent,
  },
  {
    path:'dash',component: HomeDashComponent,
  },
  {
    path:'view-all',component: ViewAllBlogsComponent,
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
