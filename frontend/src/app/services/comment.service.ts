import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
   baseURL = '';
    constructor(private http : HttpClient,private env: EnvironmentService) {
      this.baseURL = this.env.baseUrl;
     }
    viewComments(blog_id : number): Observable<Comment[]>{
      return this.http.get<Comment[]>(`${this.baseURL}comment/view-comments?blog_id=${blog_id}`)
    }
}
