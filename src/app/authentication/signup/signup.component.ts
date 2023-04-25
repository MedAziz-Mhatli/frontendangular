import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from "../../core/models/user";
import {AuthService} from "../../core/service/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  user: User;
  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(){
    console.log(this.user)
    this.userService.postUser(this.user);
  }
}
