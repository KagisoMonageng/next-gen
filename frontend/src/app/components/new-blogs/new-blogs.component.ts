import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-new-blogs',
  templateUrl: './new-blogs.component.html',
  styleUrls: ['./new-blogs.component.scss']
})
export class NewBlogsComponent implements OnInit {
  newBlogs: Blog[] = [];
  isLoading = true
  constructor(private blogService: BlogService, private toast: HotToastService, private router: Router) {

  }
  ngOnInit(): void {
    this.blogService.viewLatest().subscribe((latests: Blog[]) => {
      this.newBlogs = latests;
      this.newBlogs.forEach(element => {
        element.content = this.stripHtmlTags(element.content)
        element.feature_image = element.feature_image.replace('image/upload/','image/upload/c_limit,w_700/')
      });
      this.isLoading = false;
    }, (err: HttpErrorResponse) => {
      console.log(err)
      if (err.error.message) {
        this.toast.error(err.error.message)
      } else {
        this.toast.error("Unexpected error")
      }
    })
  }

  stripHtmlTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  viewContent(feature: Blog){
    console.log(feature)
    this.router.navigate([`view-content/${feature.id}`]);
  }



}
