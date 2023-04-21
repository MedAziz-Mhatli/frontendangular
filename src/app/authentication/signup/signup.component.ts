import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass'],
})
export class SignupComponent implements OnInit {
  registerForm: any = { 
    username:null,
    fullname:null,
    adresse:null,
    roles:[], 
    email:null,
    password:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

 

  onSubmit():void { 
    const {username, email, password} = this.registerForm; 
    this.authService.register(username, email, password).subscribe( 
      data => { 
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      }, 
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed=true;
      }
    );
  }
}
