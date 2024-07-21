import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Next Gen';
  constructor(private primengConfig: PrimeNGConfig) {}
  @ViewChild('cursorCustom') cursor !: ElementRef;

    ngOnInit() {
        this.primengConfig.ripple = true;
        document.addEventListener('mousemove', (e) => {
          this.cursor.nativeElement.style.left = `${e.pageX - 5}px`; // Set the horizontal position
          this.cursor.nativeElement.style.top = `${e.pageY - 10}px`; // Set the vertical position

      });
    }
}
