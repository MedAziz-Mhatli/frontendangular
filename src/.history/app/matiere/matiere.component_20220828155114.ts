import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
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
import { Router } from '@angular/router';
import { SectionNiveauService } from 'src/app/services/section-niveau.service';
import { MatieresService } from '../services/matieres.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.sass'],
  providers: [ToastrService],
})
export class MatiereComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  niveauxSection: any;
  allMatieres: any;
  rows = [];

 expanded: any = {};
  timeout: any;
  scrollBarHorizontal = window.innerWidth < 1200;
  
  selectedRowData: selectRowInterface;

  newUserImg = 'assets/images/11.png';
  data = [];

  filteredData = [];
  
  editForm: FormGroup;
  
  register: FormGroup;
  loadingIndicator = true;

  isRowSelected = false;
  selectedOption: string;
 
  
  reorderable = true;
  public selected: any[] = [];
  
  columns = [
    { name: 'Nom' },
    { name: 'Type' },
    { name: 'Chapitre' },
    { name: 'Enseignant' },
   // { name: 'Lien' },
    //{ name: 'Trimestre' },
   // { name: 'Matière' },
  
   // { name: 'Email' },
    //{ name: 'Status' },
    //{ name: 'Address' },
  ];
 
  ///ch// 
  types = [
    { id: '1', value: 'cours' },
    { id: '2', value: 'examen' },
    { id: '3', value: 'enregistrement' },
    { id: '4', value: 'divers' },
  ];
  typees = [
    { id: '1', value: 'cours' },
    { id: '2', value: 'exercice' },
    { id: '3', value: 'devoir' },
    { id: '4', value: 'qcm' },
  ];
  enseignants = [
    { id: '1', value: 'Ali Mohamed' },
    { id: '2', value: 'Oumayma souissi' },
    { id: '3', value: 'Sahar Sahar' },
   
  ];
  formats = [
    { id: '1', value: 'PDF' },
    { id: '2', value: 'Video' },
   
  ];
  trimestres = [
    { id: '1', value: 'Trimestre 1' },
    { id: '2', value: 'Trimestre 2' },
    { id: '3', value: 'Trimestre 3' },
   
   
  ];
  chapitres = [
    { id: '1', value: 'probabilité' },
    { id: '2', value: 'statistiques' },
    { id: '3', value: 'mobile' },
   
   
  ];
  matieres = [
    { id: '1', value: 'Français' },
    { id: '2', value: 'Anglais' },
    { id: '3', value: 'Maths' },
    { id: '1', value: 'Arabe' },
    { id: '2', value: 'Physique' },
    { id: '3', value: 'Chimie' },
    { id: '1', value: 'Informatique' },
    { id: '2', value: 'Philosophie' },
    { id: '3', value: 'Sciences Naturelles' },
   
  ];
  niveaux = [
    { id: '1', value: '7ème De base' },
    { id: '2', value: '8ème De base' },
    { id: '3', value: '9ème De base' },
    { id: '4', value: '1ère Secondaire' },
    { id: '5', value: '2ème Secondaire économie et service' },
    { id: '6', value: '2ème Secondaire Informatique' },
    { id: '7', value: '2 ème Secondaire Scientifique' },
    { id: '8', value: '3 ème Secondaire Economie' },
    { id: '9', value: '3 ème Secondaire Informatique' },
    { id: '10', value:'3 ème Secondaire Mathématiques' },
    { id: '11', value: '3 ème Secondaire Sciences Exp' },
    { id: '12', value: '3 ème Secondaire Techniques' },
    { id: '13', value: '4 ème Secondaire Economie' },
    { id: '14', value: '4 ème Secondaire Informatique' },
    { id: '15', value:'4 ème Secondaire Mathématiques' },
    { id: '16', value: '4 ème Secondaire Sciences Exp' },
    { id: '17', value: '4 ème Secondaire Techniques' },
    { id: '18', value: '4 ème Secondaire Lettres' },
  ];
  
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  constructor( private router:Router,public NivSecS: SectionNiveauService, 
    private fb: FormBuilder,public MatieresS: MatieresService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: new FormControl(),

      Nom: new FormControl(),
      Description: new FormControl(),
      Niveau: new FormControl(),
    
  
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
    this.fetch((data) => {
      this.data = data;
      this.filteredData = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
    this.register = this.fb.group({
      id: [''],
     // img: [''],
     Nom: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
     Description: ['', [Validators.required]],
     Niveau: ['', [Validators.required]],
    
    });

   
    this.readSecNiv();
   // this.readAllMatieres();
  }
  // fetch data
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/matieres.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
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
      id: row.id,
      //img: row.img,
      Nom: row.Nom,
      Description: row.Description,
      Niveau: row.Niveau,
   
    
    });
    this.selectedRowData = row;
  }


  // delete single row
  deleteSingleRow(row) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer cette matière?',
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
      if (value.id == form.value.id) {
        value.Nom = form.value.Nom;
        value.Description = form.value.Description;
        value.Niveau = form.value.Niveau;

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
    this.toastr.success('matière ajoutée avec succès', '');
  }
  editRecordSuccess() {
    this.toastr.success('matière modifiée avec succès', '');
  }
  deleteRecordSuccess(count) {
    this.toastr.error(count + ' matière supprimée avec succès', '');
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

readSecNiv(): any {
  this.NivSecS.getAll()
    .subscribe(
      data => {
        this.niveauxSection = data

      
       console.log( data);
        
      },
      error => {
        console.log(error);
      });
}
/*readAllMatieres(): any {
  this.MatieresS.getAll1()
    .subscribe(
      data => {
        this.allMatieres = data

      
       console.log( data);
        
      },
      error => {
        console.log(error);
      });
}*/


}
export interface selectRowInterface {
  Nom: String;
  Description: String;
  Type: String;
  Niveau: String;
  Trimestre: String;
  NbrChapitres: String;
  

}
