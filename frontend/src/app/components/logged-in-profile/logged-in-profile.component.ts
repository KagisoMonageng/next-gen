import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { JwtServiceService } from 'src/app/services/jwt-service.service';

@Component({
  selector: 'app-logged-in-profile',
  templateUrl: './logged-in-profile.component.html',
  styleUrls: ['./logged-in-profile.component.scss']
})
export class LoggedInProfileComponent implements OnInit {

  user !: User | null

  constructor(private jwt: JwtServiceService,private router : Router) {

  }
  ngOnInit(): void {
    console.log(this.jwt.getData(sessionStorage.getItem('key')))
    this.user = this.jwt.getData(sessionStorage.getItem('key'))

  }

  logout(): void {
    sessionStorage.removeItem('key');
    this.router.navigateByUrl('/login');
  }

}
