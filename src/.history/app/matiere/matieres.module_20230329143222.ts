import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
//import { MapToIterable } from './PropertiesPipe';

@NgModule({
  declarations: [],
  exports: [RouterModule,],
  providers:[NgbActiveModal],
  imports: [
    CommonModule,
    NgbModule,NgbActiveModal,
    
   
    PerfectScrollbarModule,
    NgApexchartsModule,
    NgxGaugeModule,NgxDatatableModule,NgbModule,
  ],
})
export class MatieresModule {}
