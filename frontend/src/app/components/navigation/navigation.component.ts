import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { JwtServiceService } from 'src/app/services/jwt-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  user !: User|null

  constructor(private jwt: JwtServiceService, private router: Router) {

  }
  ngOnInit(): void {
    this.user = this.jwt.getData(sessionStorage.getItem('key'))
  }

  logout(): void {
    sessionStorage.removeItem('key');
    this.router.navigateByUrl('/login');
  }
}
