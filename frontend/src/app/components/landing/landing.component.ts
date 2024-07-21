import { ChangeDetectorRef, Component } from '@angular/core';
import { gsap } from "gsap";
import { ExpoScaleEase } from "gsap/EasePack";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, ExpoScaleEase);

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(private blogService: BlogService, private sanitizer: DomSanitizer, private router: Router, private cdr: ChangeDetectorRef) { }

  populars: Blog[] = []
  isLoading = true;
  ngOnInit(): void {

    this.blogService.viewPopular().subscribe((results: Blog[]) => {
      this.populars = results;
      console.log(results)

      this.populars.forEach(element => {
        element.content = this.stripHtmlTags(element.content)
        element.feature_image = element.feature_image.replace('image/upload/', 'image/upload/c_limit,w_700/')
      });
      this.isLoading = false;

    }, (err: any) => {
      console.log(err)
    })

  }

  stripHtmlTags(html: string): string {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  }
}
