import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.sass'],
})
export class ForgotComponent implements OnInit {
  email: string;
  constructor(private authService: AuthService, private service: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.email = "";
  }
  OnSubmit(){
    this.userService.forgetPassword(this.email);
  }
}
