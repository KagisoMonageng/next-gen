import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environment';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = '';
  constructor(private http: HttpClient , private jwtHelper: JwtHelperService,private env: EnvironmentService) {
    this.baseURL = this.env.baseUrl;
  }

  public signIn() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser: any) => {
      const id_token = googleUser.getAuthResponse().id_token;
      // Send the token to your backend
      this.sendTokenToBackend(id_token);
    });
  }

  private sendTokenToBackend(token: string) {
    // HTTP POST to your backend to verify and log in
    this.http.post(this.baseURL + 'auth/google', token).subscribe((res: any) => {
      console.log(res)
    })
  }

  login(data: any) {
    return this.http.post(this.baseURL + 'auth/login', data)
  }

  register(data: any) {
    return this.http.post(this.baseURL + 'auth/register', data)
  }

  resetPassword(data: any) {
    return this.http.post(this.baseURL + 'auth/reset-password', data)
  }

  verifyResetToken(token: string) {
    return this.http.get(this.baseURL + 'auth/verify-token/' + token)
  }
  updatePassword(data: any) {
    return this.http.patch(this.baseURL + 'auth/update-password', data)
  }

  updateProfileImage(id:number,  url: any) {
    return this.http.patch(this.baseURL + 'auth/update-profile-image/'+id, url)
  }

  

  //saving data
  saveToken(token: string) {
    localStorage.setItem('key', token);
  }

  isLoggedIn() : boolean{
    const token = localStorage.getItem('key');
    return !this.jwtHelper.isTokenExpired(token)
  }
  logout() {
    localStorage.removeItem('key');
  }
}
