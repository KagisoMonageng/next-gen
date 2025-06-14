import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-def-nav',
  templateUrl: './def-nav.component.html',
  styleUrls: ['./def-nav.component.scss']
})
export class DefNavComponent {
  isLoggedIn: boolean = false;
  constructor(private auth : AuthService) {
    this.isLoggedIn = this.auth.isLoggedIn();
   }

  showMenuMob: boolean = false;
  toggleMobile() {
    if (!this.showMenuMob) {
      this.showMenuMob = true
    }else{
      this.showMenuMob = false;
    }
  }
}
