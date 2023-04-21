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
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Chapitres } from '../models/Chapitres';
import { MatieresService } from '../services/matieres.service';

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

  constructor(private route:ActivatedRoute,public MatieresS: MatieresService,public ChappitresS: ChapitresService, private router:Router,private http:HttpClient) { 
    this.route.params.subscribe((params=>{
      if(params['chapitreId']){
       // console.log(params['matiereId']);
      
        this.getChapitre(params['chapitreId']);
         this.readCours();
         this.readDevoirs();
         this.readEx      
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
  getChapitre(chapitreId:string){
    this.ChappitresS.details(chapitreId).pipe(
     map(data => {
       const res: any = data;
       console.log(res);
       return res ? res : [];
 
     })).subscribe((Chapitres)=>console.log(Chapitres));
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
  readDevoirs(chapitreId: string): any {
    this.ChappitresS.devoirs(chapitreId)
      .subscribe(
        data => {
          this.devoirs = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }
  readEx(chapitreId: string): any {
    this.ChappitresS.exercices(chapitreId)
      .subscribe(
        data => {
          this.exercices = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }
  readQcm(chapitreId: string): any {
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
    this.readTypesCours();
  }
}


