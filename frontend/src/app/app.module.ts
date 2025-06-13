import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrendingBlogsComponent } from './components/trending-blogs/trending-blogs.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotToastModule } from '@ngneat/hot-toast';
import { EditorModule } from 'primeng/editor';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import * as Quill from 'quill';
import { CommonModule } from '@angular/common';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { BackLinkComponent } from './components/back-link/back-link.component';
import { HomeDashComponent } from './components/home-dash/home-dash.component';
import { NewBlogsComponent } from './components/new-blogs/new-blogs.component';
import { ViewAllBlogsComponent } from './components/view-all-blogs/view-all-blogs.component';
import { SearchBlogComponent } from './components/search-blog/search-blog.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoggedInProfileComponent } from './components/logged-in-profile/logged-in-profile.component';
import { LandingComponent } from './components/landing/landing.component';
import { DefNavComponent } from './components/def-nav/def-nav.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
(window as any).Quill = Quill;


export function tokenGetter() {
  return localStorage.getItem('key');
}
@NgModule({
  declarations: [
    AppComponent,
    TrendingBlogsComponent,
    BlogItemComponent,
    AddBlogComponent,
    ViewBlogComponent,
    BackLinkComponent,
    HomeDashComponent,
    NewBlogsComponent,
    ViewAllBlogsComponent,
    SearchBlogComponent,
    NavigationComponent,
    LoggedInProfileComponent,
    LandingComponent,
    DefNavComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    EditorModule,
    DropdownModule,
    MultiSelectModule,
    FilterPipeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['your-api-domain.com'], // optional
        disallowedRoutes: ['example.com/auth/login'], // optional
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
