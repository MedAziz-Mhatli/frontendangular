import { ResetComponent } from './reset/reset.component';
import { Page500Component } from './page500/page500.component';
import { Page404Component } from './page404/page404.component';
import { ForgotComponent } from './forgot/forgot.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { InscriptionEleveComponent } from './inscription-eleve/inscription-eleve.component';
//import { InscriptionEleveComponent } from './inscription-eleve/inscription-eleve.component';
//import { InscriptionParentComponent } from './inscription-parent/inscription-parent.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'forgot',
    component: ForgotComponent,
  },
  {
    path: 'reset',
    component: ResetComponent,
  },
  {
    path: 'page404',
    component: Page404Component,
  },
  {
    path: 'page500',
    component: Page500Component,
  },
  {
    path: 'inscriptionEleve',
    component: InscriptionEleveComponent,
  },
  //{
   // path: 'insciptionParent',
   // component: InscriptionParentComponent,
  //},


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
