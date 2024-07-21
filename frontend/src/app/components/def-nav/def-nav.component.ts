import { Component } from '@angular/core';

@Component({
  selector: 'app-def-nav',
  templateUrl: './def-nav.component.html',
  styleUrls: ['./def-nav.component.scss']
})
export class DefNavComponent {

  showMenuMob: boolean = false;
  toggleMobile() {
    if (!this.showMenuMob) {
      this.showMenuMob = true
    }else{
      this.showMenuMob = false;
    }
  }
}
