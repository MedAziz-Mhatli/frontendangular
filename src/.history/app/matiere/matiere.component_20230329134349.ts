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

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.sass'],
  providers: [ToastrService],
})
export class MatiereComponent implements OnInit {
  //jdid
  categories: Categorie[]=[];
  registerForm: FormGroup;
  selectedCategorie: Categorie;
  selectedRowDataa: Categorie;
  data: Categorie[];
  filteredData: Categorie[] = [];
  editForm: FormGroup; 
  rows = [];
  //
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
 
 
 expanded: any = {};
  timeout: any;
  scrollBarHorizontal = window.innerWidth < 1200;
  selectedRowData: selectRowInterface
  newUserImg = 'assets/images/11.png';
 
    
    register: FormGroup;
  loadingIndicator = true;
  isRowSelected = false;
  selectedOption: string;
  reorderable = true;
  public selected: any[] = [];
  
  columns = [
    { name: 'nom categorie' },
  ];
 
  
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  
  constructor( private router:Router,public categorieService: CategorieService, 
  private fb: FormBuilder,
    private modalService: NgbModal, public modal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id_categorie: new FormControl(),
      nom_categorie: new FormControl(),
     
    });
  
    window.onresize = () => {
      this.scrollBarHorizontal = window.innerWidth < 1200;
      
    };
   
  }
 

  // select record using check box
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);

    if (this.selected.length === 0) {
      this.isRowSelected = false;
    } else {
      this.isRowSelected = true;
    }
  }

  deleteCategorie(idCategorie: number) {
    this.categorieService.deleteCategorie(idCategorie).subscribe(() => {
      this.categories = this.categories.filter(c => c.idCategorie !== idCategorie);
    });
  }

  deleteSelected() {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer les lignes sélectionnées?',
      showCancelButton: true,
      confirmButtonColor: '#8963ff',
      cancelButtonColor: '#fb7823',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        this.selected.forEach((row) => {
          this.deleteRecord(row);
        });
        this.deleteRecordSuccess(this.selected.length);
        this.selected = [];
        this.isRowSelected = false;
      }
    });
  }
  
  
  ngOnInit() {
    //filtre jdid
    this.categorieService.getAllCategories().subscribe(data => {
      this.data = data;
      this.filteredData = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
    this.register = this.fb.group({
      id: [''],
     nom_categorie: ['', [Validators.required]],

    });
  //ali jdid///
  //affichage
    this.categorieService.getAllCategories()
    .subscribe(categories => {
        this.categories = categories;
        console.log(this.categories);
    });
  //ajout jdid
  this.registerForm = this.fb.group({
    nomCategorie: ['', Validators.required],
}); 
//edit jdid
this.editForm = this.fb.group({
  idCategorie: [null],
  nomCategorie: ['', Validators.required],
});

this.editForm.patchValue({
  idCategorie: this.selectedRowDataa?.idCategorie,
  nomCategorie: this.selectedRowDataa?.nomCategorie,
});
  }
  //jdid ajout
  onSubmit() {
    if (this.registerForm.valid) {
        const categorie: Categorie = {
            idCategorie: this.registerForm.value.idCategorie,
            nomCategorie: this.registerForm.value.nomCategorie,
        };
        this.categorieService.addCategorie(categorie).subscribe(
            res => {
                console.log('Categorie ajoutée : ', res);
                window.location.reload(); // rafraîchit la page
            },
            err => console.error(err)
        );
    } else {
        console.error('Formulaire invalide');
    }
}
  //suppression
  deleteCateg(idCategorie: number) {
    if (confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
      this.categorieService.deleteCategorie(idCategorie).subscribe(() => {
          this.categories = this.categories.filter(categorie => categorie.idCategorie !== idCategorie);
          window.location.reload(); // rafraîchit la page
      });
  }
  }
  //edit
  onEditSaveCateg(form: FormGroup): void {
    if (form.valid) {
      const idCategorie = form.get('idCategorie')?.value;
      const nomCategorie = form.get('nomCategorie')?.value;
      if (idCategorie !== null && nomCategorie) {
        const updatedCategorie: Categorie = {
          idCategorie: idCategorie,
          nomCategorie: nomCategorie
        };
        this.categorieService.updateCategorie(updatedCategorie).subscribe(res => {
          // Faire quelque chose après la mise à jour de la catégorie
          this.modal.close();
        });
      }
    }
  }
  editRoww(row: any, rowIndex: number, content: any) {
    this.selectedRowData = row; // set the selected row data
    this.editForm = this.fb.group({
      idCategorie: [row.idCategorie],
      nomCategorie: [row.nomCategorie, Validators.required],
    });
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        // handle the modal result if needed
      },
      (reason) => {
        // handle the modal dismissal if needed
      }
    );
  }
  
  
  

  addRow(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',scrollable:true
    });
    this.register.patchValue({
      id: this.getId(10, 100),


    });
  }
 
  // edit record
  editRow(row, rowIndex, content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',scrollable:true
    });
    this.editForm.setValue({
      id_categorie: row.id_categorie,
      Nom_categorie: row.Nom_categorie,

    });
    this.selectedRowData = row;
  }

  filterValues = {
    nom_categorie: ''
  };
  filterCategories() {
  let filteredData = this.data;

  if (this.filterValues.nom_categorie) {
    filteredData = filteredData.filter((categorie: Categorie) =>
      categorie.nom_categorie.toLowerCase().includes(this.filterValues.nom_categorie.toLowerCase())
    );
  }

  this.filteredData = filteredData;
}
Dans cet exemple, nous utilisons la méthode filter pour filtrer les données en fonction du nom de la catégorie. Nous vérifions si la valeur de filtre pour le nom de la catégorie existe, puis nous filtrons les données pour inclure uniquement les catégories qui contiennent la chaîne de caractères filtrée.

Appelez la fonction filterCategories() à chaque fois que les valeurs de filtre changent :
javascript
Copy code
onFilterChange() {
  this.filterCategories();
}
Ajoutez des champs de saisie pour saisir les valeurs de filtre dans votre modèle HTML :
python
Copy code
<input type="text" class="form-control" placeholder="Nom de la catégorie" [(ngModel)]="filterValues.nom_categorie" (ngModelChange)="onFilterChange()">
Notez que nous avons lié la valeur de l'entrée à la propriété filterValues.nom_categorie et ajouté un écouteur d'événement ngModelChange pour appeler la fonction onFilterChange() à chaque fois que la valeur de l'entrée change.

Utilisez la variable filteredData pour afficher les données dans votre modèle HTML :
php
Copy code
<ngx-datatable [rows]="filteredData" ...></ngx-datatable>
Cela devrait vous permettre de filtrer les catégories en fonction du nom de la catégorie. N'oubliez pas d'importer la classe Categorie dans votre composant si cela n'a pas déjà été fait.




souissi oumaima
code html complet
Voici un exemple de code HTML complet qui peut être utilisé comme modèle pour créer une page web :

php
Copy code
<!DOCTYPE html>
<html>
  <head>
    <title>Ma page web</title>
    <meta charset="UTF-8">
    <meta name="description" content="Description de ma page web">
    <meta name="keywords" content="mots-clés, pour, ma, page, web">
    <meta name="



souissi oumaima
corriger ca :<section class="main-content" >
    <ul class="breadcrumb breadcrumb-style ">
      <li class="breadcrumb-item">
        <h5 class="page-title m-b-0">Catégories</h5>
      </li>
      <li class="breadcrumb-item bcrumb-1">
        <a routerLink="/dashboard/main">
          <i class="
fas fa-shopping-cart font-17"></i></a>
      </li>
    <!--  <li class="breadcrumb-item" style="font-size: 15px;">Niveau</li>-->
      
    </ul>
   
    <div class="section-body" >
      <div class="row" >
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" > 
          
            <div class="card" >
                <div class="p-10" >
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="row m-0">
                        <!--<div class="col-lg-3 p-0">
                          <div class="ngxTableHeader">
                            <div class="table-title">
                              <h2><strong>Fiches matières</strong></h2>
                            </div>
                          </div>
                        </div>-->
                        <div class="col-lg-6 p-0">
                          <div class="ngxTableHeader">
                            <div class="table-search-area">
                              <div>
                                <label for="search-input"><i class="material-icons search-icon">search</i></label>
                                <input placeholder="Chercher..." type="text"  class="browser-default search-field"
                                  (keyup)='filterDatatable($event)' aria-label="Search box" >
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6 p-0">
                          <div class="ngxTableHeader">
                            <!--<div class="header-buttons-left">-->
                            <!--  <div class="icon-button-demo buttons">-->
                                <button class="btn btn-icon icon-left btn-primary rounded-button"  (click)='addRow(addRecord)' >
                                  <i class="material-icons">add</i>
                                </button>
                                &nbsp;&nbsp;<button [hidden]=!isRowSelected class="btn btn-icon icon-left btn-danger rounded-button"
                                  (click)='deleteSelected()' >
                                  <i class="material-icons">delete</i>
                                  
                                </button>
                             <!-- <a [routerLink]="['/chapitres']">  <button title="chapitres" [hidden]=!isRowSelected class="btn btn-icon icon-left btn-success rounded-button"
                                  >
                                  <i class="material-icons">folder_open
 
                                 </i>
                                  
                                </button></a>-->
                               <!-- &nbsp;&nbsp;<a [routerLink]="['/chapitres']"> <button class="btn btn-outline-primary "  [hidden]=!isRowSelected >Chapitres</button></a>-->
                                <!--&nbsp; <a [routerLink]="['/fichesMatieres']"> <button class="btn btn-outline-danger " [hidden]=!isRowSelected >Fichiers </button></a>-->


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ngx-datatable    #table class="material" [rows]="data" [loadingIndicator]="loadingIndicator"
                    columnMode="force" [headerHeight]="60" [footerHeight]="80" rowHeight="auto" [limit]="5"
                    [scrollbarH]="scrollBarHorizontal" [reorderable]="reorderable" [selected]="selected"
                    [selectionType]="'checkbox'" (select)='onSelect($event)' [rows]="categories" [columns]="columns">
                    
                    <ngx-datatable-column [width]="70" [sortable]="false" [draggable]="false" [resizeable]="false"
                      [canAutoResize]="false" [headerCheckboxable]="true" [checkboxable]="true">
                    </ngx-datatable-column>
    
                    <ngx-datatable-column [width]="200" name="nom categorie" >
                      <ng-template let-row="row" let-value="value" let-i="index"  ngx-datatable-cell-template >
                        <div class="name-col-style"  >
                          <div   >{{row.nomCategorie}}</div>
    
                       </div>
                      </ng-template>
                    </ngx-datatable-column>
                  
                    <ngx-datatable-column [width]="100" name="Actions" sortable="false" [width]="100">
                      <ng-template let-value="value" let-row="row" let-rowIndex="rowIndex" ngx-datatable-cell-template>
                        <span>
                          <button class="btn btn-tbl-edit h-auto" (click)='editRoww(row, rowIndex, editRecord)'>
                            <i class="fas fa-pen"></i>
                          </button>
                          <button class="btn btn-tbl-delete h-auto" (click)="deleteCateg(row.idCategorie)">
                            <i class="far fa-trash-alt"></i>
                          </button>
                        </span>
                      </ng-template>
                    </ngx-datatable-column>
                  </ngx-datatable>
                  <!-- Add Record Modal Window -->
                  <ng-template #addRecord let-modal>
                    <div class="modal-header editRowModal">
                      <h4 class="modal-title" id="modal-basic-title">
                        <div class="table-modal-header">
                          <img [src]='newUserImg' alt="avatar">
                          <div class="modal-about">
                            <div class="fw-bold p-t-10 font-17">
                              Nouvelle Catégorie</div>
                          </div>
                        </div>
                      </h4>
                      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss()">
                        <span aria-hidden="true"><i class="material-icons">close</i></span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
                        <div class="row">
                          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
                            <label>Nom Catégorie<span class="text-danger">*</span></label>
                            <input type="text" class="form-control" placeholder="nom catégorie" formControlName="nomCategorie"
                              required>
                            <small class="form-text text-danger"
                              *ngIf="!registerForm.get('nomCategorie').valid && registerForm.get('nomCategorie').touched"> Le nom est requis</small>
                          </div>
                        </div>
                    
                        <div class="modal-footer">
                          <button type="submit" class="btn btn-primary" [disabled]="!registerForm.valid">Ajouter</button>
                          <button type="button" class="btn btn-light" (click)="modal.close('Close click')">Fermer</button>
                        </div>
                      </form>
                    
                    </div>
                  </ng-template>
                  <!-- Edit Record Modal Window -->
                  <ng-template #editRecord let-modal>
                    <div class="modal-header editRowModal">
                      <h4 class="modal-title" id="modal-basic-title">
                        <div class="table-modal-header">
                          <!--<img [src]='selectedRowData?.img' alt="avatar">-->
                          <div class="modal-about">
                            <div class="fw-bold p-t-10 font-17">
                                modification
                              </div>
                          </div>
                        </div>
                      </h4>
                      <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
                        <span aria-hidden="true"><i class="material-icons">close</i></span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form [formGroup]="editForm" (ngSubmit)="onEditSaveCateg(editForm)">
                        <div class="input-field col s12 d-none">
                            <input formControlName="idCategorie" class="form-control" type="hidden">
                          </div>
                         <!-- <div class="input-field col s12 d-none">
                            <input formControlName="img" class="form-control" type="hidden">
                          </div>-->
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-2">
                              <label>Nom Catégorie<span class="text-danger">*</span></label>
                              <input type="text" class="form-control" placeholder="nom catégorie" formControlName="nomCategorie"
                                required>
                              <small class="form-text text-danger"
                                *ngIf="!editForm.get('nomCategorie').valid && editForm.get('nomCategorie').touched"> Nom is
                                required</small>
                            </div>
                        
                          </div>
                        
                        <div class="modal-footer">
                          <button type="submit" class="btn btn-primary" [disabled]="!editForm.valid">Enregistrer</button>
                          <button type="button" class="btn btn-light" (click)="modal.close()">Fermer</button>
                        </div>
                      </form>
                    </div>
                  </ng-template>
                </div>
              </div>
        </div>
        
      </div>
    </div>
  </section>
 
!
Something went wrong. If this issue persists please contact us through our help center at help.openai.com.






  
  deleteSingleRow(row) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette catégorie?',
      showCancelButton: true,
      confirmButtonColor: '#8FBC8F',
      cancelButtonColor: '#FF6347',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.value) {
        this.deleteRecord(row);
        this.deleteRecordSuccess(1);
      }
    });
  }
    

  deleteRecord(row) {
    this.data = this.arrayRemove(this.data, row.id);
  }

  arrayRemove(array, id) {
    return array.filter(function (element) {
      return element.id !== id;
    });
  }
  
  // save add new record
  onAddRowSave(form: FormGroup) {
    this.data.push(form.value);
    this.data = [...this.data];
    form.reset();
    this.modalService.dismissAll();
    this.addRecordSuccess();
  }
  
  // save record on edit
  onEditSave(form: FormGroup) {
    this.data = this.data.filter((value, key) => {
      if (value.idCategorie == form.value.idCategorie) {
        value.nomCategorie = form.value.nomCategorie;
      
      }
      this.modalService.dismissAll();
      return true;
    });
    this.editRecordSuccess();
  }
  // save record on edit chapitres
  
 
  // filter table data
  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.filteredData[0]);
    // assign filtered matches to the active datatable
    this.data = this.filteredData.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (
          item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
          !val
        ) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  details(row, rowIndex,content) {
    this.modalService.open(content, { centered: true });
  }
  
 


  // get random id
  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  } 
  // get random id chapitres

  addRecordSuccess() {
    this.toastr.success('catégorie ajoutée avec succès', '');
  }
  editRecordSuccess() {
    this.toastr.success('catégorie modifiée avec succès', '');
  }
  deleteRecordSuccess(count) {
    this.toastr.error(count + ' catégorie supprimée avec succès', '');
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
