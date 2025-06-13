import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(private auth: AuthService, private router: Router, private jwt: JwtServiceService, private toast: HotToastService) {
    if (this.jwt.isAuthenticated()) {
      this.router.navigateByUrl('/dash');
    }
  }

  resetRequestForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });


  onSubmitRequest(form: FormGroup) {
    if (form.valid) {
      this.auth.resetPassword(form.value).pipe(
        this.toast.observe({
          loading: 'Loading...',
          success: (s: any) => s.message,
          error: (e) => e.error.message,
        })
      ).subscribe((res: any) => {
        this.router.navigateByUrl('/login');
      }, (err: HttpErrorResponse) => {

      })


    }
  }
}
