import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-view-all-blogs',
  templateUrl: './view-all-blogs.component.html',
  styleUrls: ['./view-all-blogs.component.scss']
})
export class ViewAllBlogsComponent implements OnInit{
  isLoading = true;
  blogs : Blog[] = [];
  currentPage = 1;
  totalPages = 1;
  limit = 8;

  constructor(private blogService: BlogService, private toast: HotToastService, private router: Router) {

  }

  ngOnInit(): void {
    this.loadItems()
  }

  loadItems(){
    this.blogService.viewAll(this.currentPage, this.limit).subscribe((results: any) => {
      this.blogs = results.data;
      this.totalPages = results.totalPages
      this.blogs.forEach(element => {
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


  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadItems();
  }

  sortDateAscend(){
    this.blogs.sort((a, b) => new Date(a.blog_date).getTime() - new Date(b.blog_date).getTime());
  }
  sortDateDescend(){
    this.blogs.sort((a, b) => new Date(b.blog_date).getTime() - new Date(a.blog_date).getTime());
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
