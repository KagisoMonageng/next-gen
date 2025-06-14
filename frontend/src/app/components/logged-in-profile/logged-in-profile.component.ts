import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { EnvironmentService } from 'src/app/services/environment.service';
import { JwtServiceService } from 'src/app/services/jwt-service.service';


@Component({
  selector: 'app-logged-in-profile',
  templateUrl: './logged-in-profile.component.html',
  styleUrls: ['./logged-in-profile.component.scss']
})
export class LoggedInProfileComponent implements OnInit {

  user !: User | null
  userBlogs$: Observable<any> | undefined;
  cloudinaryUrl: string = '';
  file!: string
  editing: boolean = true;
  uploadImageForm: FormGroup = new FormGroup({
    file: new FormControl('', [Validators.required]),
  })

  constructor(private jwt: JwtServiceService, private router: Router, private blogService: BlogService, private http: HttpClient, private toast: HotToastService, private authService: AuthService, private cdr: ChangeDetectorRef,private env: EnvironmentService) {
    this.user = this.jwt.getData(localStorage.getItem('key'))
    if (!this.user) {
      this.router.navigateByUrl('/login')
    }

    

  }
  ngOnInit(): void {
    this.user = this.jwt.getData(localStorage.getItem('key'))
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
    this.userBlogs$ = this.blogService.viewUserProfile(this.user?.id || 0);
  }

  submitForm() {
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('upload_preset', 'zvryv0vg');
    this.http.post(this.env.cloudinaryUrl, formData).pipe(
      this.toast.observe({
        loading: 'Saving...',
        success: 'Profile image Saved',
        error: 'Couldn\'t save image',
      })
    ).subscribe(async (res: any) => {
      this.uploadImageForm.reset()
      this.file = '';
      const imageUrl = await res.url;
      this.user!.profile_image = imageUrl;

      this.authService.updateProfileImage(this.user!.id, { url: this.user!.profile_image }).subscribe((res: any) => {
        this.authService.saveToken(res.token);
        this.cdr.detectChanges(); // Trigger change detection to update the view
      })

    })
  }



  async onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  logout(): void {
    localStorage.removeItem('key');
    this.router.navigateByUrl('/login');
  }

}
