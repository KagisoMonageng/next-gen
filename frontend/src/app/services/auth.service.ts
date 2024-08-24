import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://localhost:8080/'

  constructor(private http: HttpClient) {

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

  //saving data
  saveToken(token: string) {
    sessionStorage.setItem('key', token);
  }
}
