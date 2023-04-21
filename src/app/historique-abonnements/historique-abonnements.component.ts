import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-historique-abonnements',
  templateUrl: './historique-abonnements.component.html',
  styleUrls: ['./historique-abonnements.component.sass']
})
export class HistoriqueAbonnementsComponent implements OnInit {

  /*constructor() { }*/

  ngOnInit(): void {
  }
  rows = [];
  editing = {};
  loadingIndicator = true;
  reorderable = true;
  scrollBarHorizontal = window.innerWidth < 1200;

  @ViewChild('table') table: DatatableComponent;

  constructor() {
    this.fetch((data) => {
      this.rows = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
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
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
 
}
