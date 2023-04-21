import { Component, OnInit, ViewChild, TemplateRef, HostListener,Input } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatieresService } from '../services/matieres.service';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../models/categorie';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.sass'],
  providers: [ToastrService],
})
export class CategorieComponent implements OnInit {
 
  //
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
 
 
 
 
  
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  
  constructor( private router:Router,public categorieService: CategorieService, 
  private fb: FormBuilder,
    private modalService: NgbModal, public modal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    
  
    
   
  }
 

 
  
  
  ngOnInit() {
   
  }
  
  
  

  ///partie chapitres///////////////////
  




/////////////partie tabs///////////////////////

//////////////////////////////////////////////////

@HostListener('window:resize', ['$event'])
onResize(event) {
  this.scrollBarHorizontal = window.innerWidth < 1200;
  this.table2.recalculate();
  this.table2.recalculateColumns();
}

onPage(event) {
  clearTimeout(this.timeout);
  this.timeout = setTimeout(() => {
    console.log('paged!', event);
  }, 100);
}

getRowHeight(row) {
  return row.height;
}

toggleExpandRow(row) {
  console.log('Toggled Expand Row!', row);
  this.table2.rowDetail.toggleExpandRow(row);
}

onDetailToggle(event) {
  console.log('Detail Toggled', event);
}




}
export interface selectRowInterface {
  nomCategorie: String;
  
}
