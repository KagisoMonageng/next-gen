import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
 baseURL = environment.baseUrl;

  constructor(private http : HttpClient) { }

  viewAll(page: number, limit: number): Observable<Blog[]>{
   return this.http.get<Blog[]>(`${this.baseURL}blog/view-all?page=${page}&limit=${limit}`)
  }

  viewSearch(): Observable<Blog[]>{
    return this.http.get<Blog[]>(this.baseURL+'blog/view-search')
   }

  viewPopular(): Observable<Blog[]>{
    return this.http.get<Blog[]>(this.baseURL+'blog/view-popular')
   }

   viewLatest(): Observable<Blog[]>{
    return this.http.get<Blog[]>(this.baseURL+'blog/view-latest')
   }

   viewBlog(id:number): Observable<Blog>{
    return this.http.get<Blog>(this.baseURL+'blog/view-content/'+id)
   }


   viewUserProfile(id:number): Observable<Blog[]>{
    return this.http.get<any>(this.baseURL+'blog/view-user-blogs/'+id)
   }

   viewUserPublished(id:number): Observable<any>{
    return this.http.get<any>(this.baseURL+'blog/view-author-blogs/'+id)
   }


  addBlog(data: any){
    return this.http.post(this.baseURL+'blog/add-blog', data)
   }

   updateStatus(data: any){
    return this.http.patch(this.baseURL+'blog/publish-blog', data)
   }

   deleteBlog(id: number){
    return this.http.delete(this.baseURL+'blog/delete-blog/' + id)
   }
}
