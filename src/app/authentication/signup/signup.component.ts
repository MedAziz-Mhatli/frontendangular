import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from "../../core/models/user";
import {AuthService} from "../../core/service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import { UserServiceService } from 'src/app/services/user-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  user: User;
  signup:FormGroup
  id:any
  constructor(private authService: AuthService, private router: Router, private userService: UserService,private formBuilder:FormBuilder,private activatedRoute:ActivatedRoute,
    private user_service:UserServiceService
    ) { }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    
    this.signup=this.formBuilder.group({
      id:[''],
      username:['',[Validators.required,Validators.minLength(6)]],
      fullname:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      adresse:['',[Validators.required,Validators.minLength(6)]],
      role:['',[Validators.required]]
    })

  }

  onSubmit(){
    console.log(this.signup.value)
    
    this.userService.postUser(this.signup.value);
  }
}
