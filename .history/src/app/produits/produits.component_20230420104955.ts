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
import { Produit } from '../models/Produit';
import { ProduitsService } from '../services/produits.service';
//import { Console } from 'console';

@Component({
  selector: 'app-cours',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.sass'],
  providers: [ToastrService],
})
export class ProduitsComponent implements OnInit {
 
  //
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
 

 
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  
  constructor( private router:Router,public produitsService: ProduitsService, public categoriesService: CategorieService, 
  private fb: FormBuilder,
    private modalService: NgbModal, public modal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    
   
  }
 


  
  
  ngOnInit() {
    
 }
  //jdid ajout
  onSubmit() {
  
 

