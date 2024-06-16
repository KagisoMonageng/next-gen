import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { CommentsService } from 'src/app/services/comments.service';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent implements OnInit {
  commentForm: FormGroup;
  comments: any[] = [];

  constructor(private fb: FormBuilder, private commentsService: CommentsService, private dialog: MatDialog) {
    this.commentForm = this.fb.group({
      comment_text: ['', Validators.required],
      author_id: ['', Validators.required],
      blog_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getComments();
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.commentsService.addComment(this.commentForm.value)
        .subscribe(
          (res: any) => {
            alert('Comment added successfully');
            this.commentForm.reset();
            this.getComments(); // Refresh comments after adding
          },
          (err: HttpErrorResponse) => {
            alert('Failed to add comment');
            console.error(err);
          }
        );
    } else {
      alert('Please fill in all fields');
    }
  }

  getComments() {
    this.commentsService.viewComments()
      .subscribe(
        (comments: any[]) => {
          this.comments = comments;
        },
        (err: HttpErrorResponse) => {
          console.error('Failed to retrieve comments', err);
        }
      );
  }

  onEdit(comment: any) {
    const dialogRef = this.dialog.open(EditCommentComponent, {
      width: '400px',
      data: { comment_text: comment.comment_text }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentsService.updateComment( { comment_text: result.comment_text },comment.id)
          .subscribe(
            (res: any) => {
              alert('Comment updated successfully');
              this.getComments(); // Refresh comments after updating
            },
            (err: HttpErrorResponse) => {
              alert('Failed to update comment');
              console.error(err);
            }
          );
      }
    });
  }

  onShow() {
    this.getComments();
  }
}
