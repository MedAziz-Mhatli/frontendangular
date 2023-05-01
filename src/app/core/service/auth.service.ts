import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  url = 'http://localhost:8080/api/auth';
  user: User;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    this.user = new User();
    this.user.username = email;
    this.user.password = password;
    return this.http
      .post<any>(this.url + '/signin', this.user)
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // console.log(JSON.stringify(user));
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(user);
          return user;
        })
      );
  }

  update(user: User){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentUserValue.accessToken}`
    })
    // @ts-ignore
    return this.http.put('http://localhost:8080/user/userEdit', user, headers).subscribe((u) => {
      // @ts-ignore
      this.currentUserSubject.value.username = u.username;
      // @ts-ignore
      this.currentUserSubject.value.email = u.email;
      // @ts-ignore
      this.currentUserSubject.value.adresse = u.adresse;
      // @ts-ignore
      this.currentUserSubject.value.fullname = u.fullname;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUserSubject.value));
      alert("Profile updated!")
      return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
