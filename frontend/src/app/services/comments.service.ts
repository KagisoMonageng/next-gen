import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
baseURL = 'http://localhost:8080/'
  constructor(private http : HttpClient) { }
  viewComments(): Observable<Blog []>{
    return this.http.get<Blog []>(this.baseURL+'comments/view-all')  
   }
 
   addComment(data: any){
     return this.http.post(this.baseURL+'comments/add-comment', data)  
    }
 
    updateComment(comment: any,id: number){
     return this.http.patch(this.baseURL+'comments/edit-comment/' + id, comment)
    //  return this.http.put(`${this.baseUrl}/updateComment`, JSON.stringify({ comment_id: id, ...comment }), { headers });  
    }
 
 
    deleteComment(id: number){
     return this.http.delete(this.baseURL+'comments/delete-comment/' + id)  
    }
}
