
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {
  commentForm: FormGroup;
  comments: any[] = [];

  constructor(private fb: FormBuilder, private http: CommentsService) {
    this.commentForm = this.fb.group({
    
      comment_text: ['', Validators.required],
      author_id: ['', Validators.required],
      blog_id: ['', Validators.required]
    });
  }

  

  ngOnInit(): void {
    this.getComments();
  }


  onSubmit(commentForm : FormGroup) {
   
    if (commentForm.valid) {
      this.http.addComment(commentForm.value)
        .subscribe((res:any)=>{
          alert('Comment added successfully');

        },(err : HttpErrorResponse)=>{
          alert('Failed to add comment');
          console.log(err)
        }

          
          
        );
    }
  }

  getComments() {
   
    this.http.viewComments() 
      .subscribe((comments: any[]) => {
        this.comments = comments; 
      }, (err: HttpErrorResponse) => {
        console.error('Failed to retrieve comments', err);
      });
  }

  onShow() {
  
    this.getComments();
  }
}
