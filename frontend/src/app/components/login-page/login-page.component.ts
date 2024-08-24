import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';
import { gapi } from 'gapi-script';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private jwt: JwtServiceService,
    private toast: HotToastService,
    private http: HttpClient
  ) {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '295049434949-bdb1ue7dpca36ja02rocs3n5hbdg7lo0.apps.googleusercontent.com',
      });
    });
  }

  user !: User | null

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  ngOnInit(): void {

    this.initializeGoogleSignIn();


    if (this.jwt.isAuthenticated()) {
      this.user = this.jwt.getData(sessionStorage.getItem('key'));
      this.toast.success("You're already logged in");
      this.router.navigateByUrl('/dash');
    }
  }
  initializeGoogleSignIn() {
    // Load the Google API client library
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '295049434949-bdb1ue7dpca36ja02rocs3n5hbdg7lo0.apps.googleusercontent.com',
      }).then(auth2 => {
        const googleSignInButton = document.getElementById('google-signin-button');
        auth2.attachClickHandler(googleSignInButton, {},
          (googleUser) => {
            const idToken = googleUser.getAuthResponse().id_token;
            this.sendTokenToBackend(idToken);
          },
          (error) => {
            console.error('Google Sign-In Error:', error);
          }
        );
      });
    });
  }

  sendTokenToBackend(idToken: string) {
    this.http.post('http://localhost:8080/auth/google', { token: idToken })
    .pipe(
      this.toast.observe({
        loading: 'Logging you in...',
        success: (s: any) => s.message,
        error: (e) => e.error.message,
      })
    ).subscribe((response: any) => {
        this.auth.saveToken(response.token);
        this.router.navigateByUrl('/dash')
      },
        (err: HttpErrorResponse) => {
          this.toast.error(err.error)
        });
  }

  onLoginSubmit(form: FormGroup) {
    if (form.valid) {
      this.auth.login(form.value).pipe(
        this.toast.observe({
          loading: 'Logging you in...',
          success: (s: any) => s.message,
          error: (e) => e.error.message,
        })
      ).subscribe((res: any) => {
        this.auth.saveToken(res.token);
        this.user = this.jwt.getData(res.token);
        this.router.navigateByUrl('/dash');
      }, (err: HttpErrorResponse) => {

      })


    }
  }



}
