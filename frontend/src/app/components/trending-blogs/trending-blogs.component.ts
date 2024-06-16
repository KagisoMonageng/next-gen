import { Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-trending-blogs',
  templateUrl: './trending-blogs.component.html',
  styleUrls: ['./trending-blogs.component.scss']
})
export class TrendingBlogsComponent implements OnInit {
  populars: Blog[] = []
  isLoading = true;

  constructor(private blogService: BlogService) { }
  ngOnInit(): void {

    this.blogService.viewPopular().subscribe((results: Blog[]) => {
      this.populars = results;
      this.isLoading = false;
    }, (err: any) => {
      console.log(err)
    })
  }




}
