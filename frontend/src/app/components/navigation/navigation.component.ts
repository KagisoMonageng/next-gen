import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user !: User|null
  isLoggedIn: boolean = false;

  constructor(private jwt: JwtServiceService, private router: Router, private auth : AuthService) {
    this.isLoggedIn = this.auth.isLoggedIn();
  }
  ngOnInit(): void {
    this.user = this.jwt.getData(localStorage.getItem('key'))
  }

  logout(): void {
    localStorage.removeItem('key');
    this.router.navigateByUrl('/login');
  }
}
