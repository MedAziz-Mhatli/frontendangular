import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { BlankComponent } from './blank/blank.component';

import { ProfileComponent } from './profile/profile.component';
import { OffresComponent } from './offres/offres.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';





@NgModule({
  declarations: [BlankComponent, ProfileComponent, OffresComponent, EditProfileComponent],
  imports: [CommonModule, ExtraPagesRoutingModule, NgbModule],
//import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { ToastrModule } from 'ngx-toastr';

})
export class ExtraPagesModule {}
