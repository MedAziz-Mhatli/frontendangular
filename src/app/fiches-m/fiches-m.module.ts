import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { FichesMComponent } from './fiches-m.component';



@NgModule({
  declarations: [FichesMComponent],
  imports: [
    CommonModule,NgxDatatableModule, ToastrModule.forRoot()
  ]
})
export class FichesMModule { }
