import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {User} from "../../core/models/user";
import {UserServiceService} from "../../services/user-service.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  active;
  constructor(private authService: AuthService, private userService: UserServiceService) {}
  user: User;

  ngOnInit(): void {
    this.user = this.authService.currentUserValue;

  }

  onSubmit(){
    // @ts-ignore
    this.user.roles = [{name: this.user.roles[0]}];
    console.log(this.user)
    this.userService.updateUser(this.user).subscribe((res)=>{
      console.log(res);
    });
  }
}
