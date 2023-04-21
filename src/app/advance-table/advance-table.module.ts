import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdvanceTableRoutingModule } from './advance-table-routing.module';
import { AdvanceTableComponent } from './advance-table.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AdvanceTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdvanceTableRoutingModule,
    NgxDatatableModule,NgbModule,
    ToastrModule.forRoot(),
  ],
})
export class AdvanceTableModule {
  
}
