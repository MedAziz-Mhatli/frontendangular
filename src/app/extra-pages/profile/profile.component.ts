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
    // @ts-ignore
    this.user.roles = [{name: this.user.roles[0]}];
    console.log(this.user)
    this.userService.update(this.user).subscribe((res)=>{
      console.log(res);
    });
  }
}
