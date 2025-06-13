import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-search-blog',
  templateUrl: './search-blog.component.html',
  styleUrls: ['./search-blog.component.scss']
})
export class SearchBlogComponent implements OnInit {
  blogs : Blog[] = [];
  searchResults: Blog[] = [];
  searchTerm = '';
  constructor(private blogService: BlogService, private toast: HotToastService, private router: Router) {
  }
  ngOnInit(): void {
    this.loadItems()
  }

  loadItems(){
    this.blogService.viewSearch().subscribe((results: Blog[]) => {
      this.blogs = results;
      console.log(this.blogs)
      this.blogs.forEach(element => {
        element.content = this.stripHtmlTags(element.content)
        element.feature_image = element.feature_image.replace('image/upload/','image/upload/c_limit,w_700/')
      });

    }, (err: HttpErrorResponse) => {
      console.log(err)
      if (err.error.message) {
        this.toast.error(err.error.message)
      } else {
        this.toast.error("Unexpected error")
      }
    })
  }

  filterPosts(): void {
    this.searchResults = this.blogs.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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
