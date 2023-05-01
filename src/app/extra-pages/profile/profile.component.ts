import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {User} from "../../core/models/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  active;
  constructor(private authService: AuthService, private userService: UserService) {}
  user: User;
  ngOnInit(): void {
    this.user = this.authService.currentUserValue;
  }

  onSubmit(){
    if (!this.user.password){
      // @ts-ignore
      this.user.password = "";
    }
    console.log(this.user)
    this.authService.update(this.user);
  }
}
