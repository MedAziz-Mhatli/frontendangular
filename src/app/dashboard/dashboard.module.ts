import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxGaugeModule } from 'ngx-gauge';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { MapToIterable } from '../dashboard/main/PropertiesPipe';

@NgModule({
  declarations: [MainComponent, Dashboard2Component,MapToIterable],
  exports: [RouterModule,MapToIterable],
  imports: [
    CommonModule,
    NgbModule,
    DashboardRoutingModule,
   
    PerfectScrollbarModule,
    NgApexchartsModule,
    NgxGaugeModule,NgxDatatableModule,NgbModule,
  ],
})
export class DashboardModule {}
