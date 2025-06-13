import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
    baseURL = environment.baseUrl;
    constructor(private http : HttpClient) { }
    viewComments(blog_id : number): Observable<Comment[]>{
      return this.http.get<Comment[]>(`${this.baseURL}comment/view-comments?blog_id=${blog_id}`)
    }
}
