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
    nomCategorie: ''
  };
  filterCategories() {
    let filteredData = this.data;
  
    if (this.filterValues.nom_categorie) {
      filteredData = filteredData.filter((categorie: Categorie) =>
        categorie.nomCategorie.toLowerCase().includes(this.filterValues.nomCategorie.toLowerCase())
      );
    }
  
    this.filteredData = filteredData;
  }
  


  
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
