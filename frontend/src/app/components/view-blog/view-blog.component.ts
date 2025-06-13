import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/interfaces/blog';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { CommentService } from 'src/app/services/comment.service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';

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

  showRecentComments = true;
  viewProfile$ !: Observable<any>
  comments !: any[]
  isLoggedIn?: boolean
  user?: any;
  userBlogs$: Observable<any> | undefined;




  constructor(private router: Router, private route: ActivatedRoute, private jwt: JwtServiceService, private blogService: BlogService, private commentService: CommentService, private toast: HotToastService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.jwt.getData(localStorage.getItem('key'))
    }
    this.route.paramMap.subscribe(params => {
      this.featureId = Number(params.get('id'));
      this.loadContent(this.featureId);

    });


  }

  loadContent(id: number) {
    this.blogService.viewBlog(id).subscribe((blog: Blog) => {
      this.blog = blog;
      this.userBlogs$ = this.blogService.viewUserPublished(blog.author_id)
      this.tags = blog.tags.split('#');
      this.commentService.viewComments(id).subscribe((comments: Comment[]) => {
        this.comments = comments;
        // console.log(this.comments)
      })
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


  populateAuthorProfile(id: number) {
    this.viewProfile$ = this.blogService.viewUserPublished(id);
  }

  togglePublished(blog: Blog) {
    switch (blog.published) {
      case true:
        if (confirm("Are you sure you want to unpublish this blog?")) {
          this.updateStatus(blog);
        }
        break;
      case false:
        if (confirm("Are you sure you want to publish this blog?")) {
          this.updateStatus(blog);
        }
        break;
        
    }
  }

  updateStatus(blog: Blog) {
    this.blogService.updateStatus({ id: blog.id, status: !blog.published }).pipe(
      this.toast.observe({
        loading: 'Updating status...',
        success: 'Status updated',
        error: 'Couldn\'t update status',
      })
    ).subscribe((res: any) => {
      this.route.paramMap.subscribe(params => {
        this.featureId = Number(params.get('id'));
        this.loadContent(this.featureId);
      });
    })
  }

  delete(blog: Blog) {
    if (confirm("Are you sure you want to delete this blog?")) {
      this.blogService.deleteBlog(blog.id).pipe(
      this.toast.observe({
        loading: 'Deleting...',
        success: 'Blog Deleted',
        error: 'Couldn\'t delete blog',
      })
    ).subscribe(() => {
      this.router.navigate(['/dash']);
    }, (err: HttpErrorResponse) => {
      console.error('Error deleting blog:', err);
    });
    }

  }
}
