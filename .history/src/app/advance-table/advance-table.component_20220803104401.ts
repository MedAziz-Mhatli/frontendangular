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
import { ChapitresService } from '../services/chapitres.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-advance-table',
  templateUrl: './advance-table.component.html',
  styleUrls: ['./advance-table.component.sass'],
  providers: [ToastrService],
})
export class AdvanceTableComponent implements OnInit {
  types: any;
  constructor(public ChappitresS: ChapitresService, private router:Router,private http:HttpClient) {}
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

  readTypesCours(): any {
    this.ChappitresS.getTypesCours()
      .subscribe(
        data => {
          this.types = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }

  ngOnInit(): void {}
}


