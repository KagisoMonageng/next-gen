import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { TrendingBlogsComponent } from './components/trending-blogs/trending-blogs.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { HomeDashComponent } from './components/home-dash/home-dash.component';
import { ViewAllBlogsComponent } from './components/view-all-blogs/view-all-blogs.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';

const routes: Routes = [
  // Paths go in here
  {
    path: '',component: LandingComponent,
  },
  {
    path:'dash',component: HomeDashComponent,
  },
  {
    path:'view-all',component: ViewAllBlogsComponent,
  },
  {
    path:'view-content/:id',component: ViewBlogComponent
  },
  {
    path:'login',component: LoginPageComponent
  },
  {
    path:'register',component: RegisterPageComponent
  },
  {
    path:'forgot-password',component: ResetPasswordComponent
  },
  {
    path:'reset-password',component: UpdatePasswordComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
