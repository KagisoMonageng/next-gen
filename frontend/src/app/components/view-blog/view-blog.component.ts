import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {
  isLoading = true;
  featureId !: number;
  blog !: Blog;
  tags !: string[]

  constructor(private route: ActivatedRoute, private blogService: BlogService, private toast: HotToastService) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.featureId = Number(params.get('id'));
      this.loadContent(this.featureId);
    });
  }

  loadContent(id: number) {
    this.blogService.viewBlog(id).subscribe((blog: Blog) => {
      this.blog = blog;
      this.tags = blog.tags.split('#');

      // this.blog.feature_image = this.blog.feature_image.replace('image/upload/','image/upload/c_limit,w_700/')

      this.isLoading = false;
    }, (err: HttpErrorResponse) => {
      console.log(err)
      if (err.error.message) {
        this.toast.error(err.error.message)
      }else {
        this.toast.error("Unexpected error")
      }
    })
  }
}
