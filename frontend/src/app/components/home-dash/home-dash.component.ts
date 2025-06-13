import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['./home-dash.component.scss']
})
export class HomeDashComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    
  }
}
