import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { FeatherModule } from 'angular-feather';
import {
  Facebook,
  Twitter,
  Github,
  Gitlab,
  User,
  Home,
  Key,
  UserCheck,
  Mail,
  Calendar,
  Phone,
  Edit2
} from 'angular-feather/icons';
import { ForgotComponent } from './forgot/forgot.component';
import { Page500Component } from './page500/page500.component';
import { Page404Component } from './page404/page404.component';
import { ResetComponent } from './reset/reset.component';


import { NgSelectModule } from '@ng-select/ng-select';
import { InscriptionEleveComponent } from './inscription-eleve/inscription-eleve.component';

const icons = {
  Facebook,
  Twitter,
  Github,
  Gitlab,
  User,
  Home,
  Key,
  UserCheck,
  Mail,
  Phone,
  Calendar,
  Edit2

};

@NgModule({
  declarations: [
    SigninComponent, 
    SignupComponent,
     ForgotComponent, 
    Page500Component, 
    Page404Component,
    ResetComponent,
    InscriptionEleveComponent ],
    
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    FeatherModule.pick(icons),
  ],
})
export class AuthenticationModule {}
