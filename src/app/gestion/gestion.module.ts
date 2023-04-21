import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GestionRoutingModule } from './gestion-routing.module';
import { FichesComponent } from './fiches/fiches.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [FichesComponent],
  imports: [CommonModule, GestionRoutingModule,NgxDatatableModule, ToastrModule.forRoot(), NgbModule],
})
export class GestionModule {}
