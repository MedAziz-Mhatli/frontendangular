import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Chapitres } from '../models/Chapitres';


@Component({
  selector: 'app-advance-table',
  templateUrl: './advance-table.component.html',
  styleUrls: ['./advance-table.component.sass'],
  providers: [ToastrService],
})
export class AdvanceTableComponent implements OnInit {
  types: any;
  Chapitres:Chapitres= new Chapitres();
  cours: Object;
  devoirs: Object;
  exercices: Object;
  qcm: Object;

  constructor(private route:ActivatedRoute, private router:Router,private http:HttpClient) { 
    this.route.params.subscribe((params=>{
      if(params['chapitreId']){
       // console.log(params['matiereId']);
       this.readTypesCours();
        this.getChapitre(params['chapitreId']);
         this.readCours(params['chapitreId']);
         this.readDevoirs(params['chapitreId']);
         this.readEx(params['chapitreId']);
         this.readQcm(params['chapitreId']);      
      }
    }));
   
  }
  active;


  active2 = 'top';
  active3;

  active4;
  disabled = true;

  acc: any;
  disabledd = false;

 

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.active3 = 1;
    }
  }
  
 

  
  readCours(chapitreId: string): any {
    this.ChappitresS.cours(chapitreId)
      .subscribe(
        data => {
          this.cours = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }
adQcm(chapitreId: string): any {
    this.ChappitresS.qcm(chapitreId)
      .subscribe(
        data => {
          this.qcm = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }

  ngOnInit(): void {
   
  }
}


