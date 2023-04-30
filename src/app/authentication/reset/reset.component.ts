import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.sass']
})
export class ResetComponent implements OnInit {
  message: string;
  password: string;
  password1: string;
  error: string;
  constructor(private authService: AuthService, private service: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.verifyCodepassword(this.service.snapshot.params.code, this.service.snapshot.params.email).subscribe(res => {
      // @ts-ignore
      if (res.message === "invalid"){
        this.message = "Invalid verification code!";
      }
      else{
        this.message = "";
      }
    });
    this.password = "";
    this.password1 = "";
    this.error = "";
  }

  OnSubmit(){
    if (this.password !== this.password1){
      this.error = "Invalid Password!";
    }
    else{
      this.error = "";
      this.userService.resetPassword(this.service.snapshot.params.email, this.password);
    }
  }
}
