import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.sass']
})
export class VerificationComponent implements OnInit {
  message: string;
  constructor(private authService: AuthService, private service: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.verify(this.service.snapshot.params.id).subscribe((res: any) => {
      console.log(res);
      this.message = res.message;
    });
  }

}
