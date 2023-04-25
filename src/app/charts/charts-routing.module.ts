import { GaugeComponent } from './gauge/gauge.component';
import { NgxchartComponent } from './ngxchart/ngxchart.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { ApexchartComponent } from './apexchart/apexchart.component';
import { EchartComponent } from './echart/echart.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'echart',
    pathMatch: 'full',
  },
  {
    path: 'echart',
    component: EchartComponent,
  },
  {
    path: 'apex',
    component: ApexchartComponent,
  },
  {
    path: 'chartjs',
    component: ChartjsComponent,
  },
  {
    path: 'ngx-charts',
    component: NgxchartComponent,
  },
  {
    path: 'gauge',
    component: GaugeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}