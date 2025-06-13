import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  userId = 0;
  constructor(private auth: AuthService, private router: Router, private jwt: JwtServiceService, private toast: HotToastService, private activatedRoute: ActivatedRoute) {
    if (this.jwt.isAuthenticated()) {
      this.router.navigateByUrl('/dash');
    }
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.auth.verifyResetToken(params['key']).pipe(
        this.toast.observe({
          loading: 'Verifying key...',
          success: (s: any) => s.message,
          error: (e) => e.error.message,
        })
      ).subscribe((res: any) => {
        this.userId = res.userId;
      }, (err: HttpErrorResponse) => {
        this.router.navigateByUrl('/login');
      })
    })
  }

  resetRequestForm = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.min(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });


  onSubmitRequest(form: FormGroup) {
    if (form.valid) {
      if(form.value.password === form.value.confirmPassword) {
        console.log("userId", this.userId);
        console.log("password", form.value.password);
        this.auth.updatePassword({ userId: this.userId, password: form.value.password }).pipe(
          this.toast.observe({
            loading: 'Loading...',
            success: (s: any) => s.message,
            error: (e) => e.error.message,
          })
        ).subscribe((res: any) => {
          this.router.navigateByUrl('/login');
        }, (err: HttpErrorResponse) => {
          // Handle error
        });
      }else{
        this.toast.error('Passwords do not match');
      }
    }
  }
}
