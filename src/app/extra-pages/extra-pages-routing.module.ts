import { BlankComponent } from './blank/blank.component';
import { ProfileComponent } from './profile/profile.component';
import { OffresComponent } from './offres/offres.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: 'blank',
    component: BlankComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  //Component Editer profile
  {
    path: 'edit',
    component: EditProfileComponent,

  },
  //Component Offres
  {
    path: 'offres',
    component: OffresComponent,
  },
  
  //Component Porte monnaie
  
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtraPagesRoutingModule {}
