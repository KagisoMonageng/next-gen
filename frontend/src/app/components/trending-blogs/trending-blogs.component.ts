import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { gsap } from "gsap";
import { ExpoScaleEase } from "gsap/EasePack";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, ExpoScaleEase);

@Component({
  selector: 'app-trending-blogs',
  templateUrl: './trending-blogs.component.html',
  styleUrls: ['./trending-blogs.component.scss']
})
export class TrendingBlogsComponent implements OnInit, OnDestroy,AfterViewChecked {
  populars: Blog[] = []
  isLoading = true;
  intervalId: any = 1;
  currFeature = 0;

  constructor(private blogService: BlogService, private sanitizer: DomSanitizer, private router: Router, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {

    this.blogService.viewPopular().subscribe((results: Blog[]) => {
      this.populars = results;
      this.populars.forEach(element => {
        element.content = this.stripHtmlTags(element.content)
        element.feature_image = element.feature_image.replace('image/upload/', 'image/upload/c_limit,w_700/')
      });
      this.isLoading = false;

    }, (err: any) => {
      console.log(err)
    })
    this.startInterval();
  }

  ngAfterViewChecked(): void {

  }

  startInterval() {
    this.intervalId = setInterval(() => {
      if (this.currFeature < this.populars.length - 1) {
        this.currFeature++;
      } else {
        this.currFeature = 0;
      }
    }, 5000);
  }

  resetInterval() {
    this.stopInterval();
    this.startInterval();
  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy() {
    this.stopInterval();
  }

  stripHtmlTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }

  viewContent(feature: Blog) {
    console.log(feature)
    this.router.navigate([`view-content/${feature.id}`]);
  }



}
