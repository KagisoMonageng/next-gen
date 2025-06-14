import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { EnvironmentService } from 'src/app/services/environment.service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private jwt: JwtServiceService,
    private toast: HotToastService,
    private http: HttpClient,
    private env: EnvironmentService
  ) {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.env.googleClientID,
      });
    });
  }

  user !: User | null

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    cemail: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.min(6)]),
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {

    this.initializeGoogleSignIn();
    if (this.jwt.isAuthenticated()) {
      this.user = this.jwt.getData(localStorage.getItem('key'));
      this.toast.success("You're already logged in");
      this.router.navigateByUrl('/dash');
    }
  }
  initializeGoogleSignIn() {
    // Load the Google API client library
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.env.googleClientID,
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
    this.http.post(this.env.baseUrl+'auth/google', { token: idToken })
    .pipe(
      this.toast.observe({
        loading: 'Signing you up...',
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


  onRegisterSubmit(form: FormGroup) {
    console.log(form)
    
    if (form.valid) {
      this.auth.register(form.value).pipe(
        this.toast.observe({
          loading: 'Signing you up...',
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
