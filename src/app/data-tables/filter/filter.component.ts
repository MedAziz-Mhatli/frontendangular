import { Component, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {  UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass'],
})
export class FilterComponent {
  rows = [];
  temp = [];
  user=[{id:1,fullname: 'John',adresse:"hello world",email: 'john',roles:[{id:1,name:"admin"}]}]
  loadingIndicator = true;
  reorderable = true;
  scrollBarHorizontal = window.innerWidth < 1200;

  @ViewChild('table') table: DatatableComponent;

  constructor(private user_service:UserServiceService,private router:Router) {
   /* this.fetch((data) => {
      this.temp = [...data];
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });*/
    this.user_service.getAll().subscribe((data:any)=>{
      console.log(data);
      this.user=data
      
      this.rows=this.user
    })
    this.rows=this.user
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.scrollBarHorizontal = window.innerWidth < 1200;
    this.table.recalculate();
    this.table.recalculateColumns();
  }

  getRowHeight(row) {
    return row.height;
  }
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/datatable-data.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  delete(id){
    this.user_service.delete(id).subscribe(data =>{
      this.user_service.getAll().subscribe((data:any)=>{
        console.log(data);
        this.user=data
        
        this.rows=this.user
      })

    })
  }
  goto(id:any){
    this.router.navigate(['authentication/edit/'+id])

  }
}
