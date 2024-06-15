import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  baseURL = 'http://localhost:8080/'

  constructor(private http : HttpClient) { }

  viewAll(): Observable<Blog []>{
   return this.http.get<Blog []>(this.baseURL+'blog/view-all')  
  }

  addBlog(data: any){
    return this.http.post(this.baseURL+'blog/add-blog', data)  
   }

   updateBlog(data: any,id: number){
    return this.http.patch(this.baseURL+'blog/edit-blog/' + id, data)  
   }

   deleteBlog(id: number){
    return this.http.delete(this.baseURL+'blog/delete-blog/' + id)  
   }
}
