import { AuthService } from 'src/app/core/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  username: string;
  password: string;
  error: string;
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.username = "";
    this.password = "";
    this.error = "";
  }

  onSubmit() {
    if (this.password === "" || this.username === "") {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.authService
        .login(this.username, this.password)
        .subscribe(
          (res) => {
            if (res) {
              const token = this.authService.currentUserValue.accessToken;
              if (token) {
                console.log(token);
                this.redirectUser(this.authService.currentUserValue.roles[0]);
              }
            } else {
              this.error = 'Invalid Login';
            }
          },
          (error) => {
            this.error = error;
          }
        );
    }
  }

  redirectUser(userRole) {
    if (userRole === "ROLE_USER") {
      this.router.navigate(['/user']);
    } else if (userRole === "ROLE_VENDEUR") {
      this.router.navigate(['/advance-table']);
    } else if (userRole === "ROLE_ADMIN") {
      this.router.navigate(['/dashboard/main']);
    }
  }
}
