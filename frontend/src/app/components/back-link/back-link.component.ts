import { Component } from '@angular/core';

@Component({
  selector: 'app-back-link',
  templateUrl: './back-link.component.html',
  styleUrls: ['./back-link.component.scss']
})
export class BackLinkComponent {

  goBack(){
    window.history.back();
  }
}
