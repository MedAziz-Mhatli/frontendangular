import { Injectable } from '@angular/core';
import {User} from "../core/models/user";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../core/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080/api/auth';
  user: User;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {
  }
  postUser(user: User){
    return this.http.post(this.url + '/signup'  , user).subscribe((res: any) => {
      // localStorage.setItem('currentUser', res);
      console.log(res);
      alert("Success!");
    });
  }
  verify(code: string){
    return this.http.get(this.url + '/signup/verify?code=' + code);
  }
  forgetPassword(email: string){
    this.user = new User();
    this.user.email = email;
    return this.http.post(this.url + '/forgot-password', this.user ).subscribe((res) => {
      // @ts-ignore
      alert(res.message);
    });
  }
  verifyCodepassword(code: string, email: string){
    return this.http.get(this.url + '/verifyCodeReset?code=' + code + '&email=' + email);
  }
  resetPassword(email: string, newPass: string){
    return this.http.post(this.url + '/reset-password',{email: email, password: newPass}).subscribe((res) => {
      console.log(res);
      // @ts-ignore
      alert(res.message);
    });
  }
  update(user: User){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    // @ts-ignore
    return this.http.put('http://localhost:8080/user/userEdit', user, headers);
  }
}
