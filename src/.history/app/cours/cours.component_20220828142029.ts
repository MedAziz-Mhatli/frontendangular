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
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.sass'],
  providers: [ToastrService],
})
export class CoursComponent implements OnInit {
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  active;
  active2 = 'top';
  active3;
  active4;
  disabled = true;
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
    { id: '2', value: 'exercices' },
    { id: '3', value: 'devoirs' },
    { id: '4', value: 'qcm' },
  ];
  enseignants = [
    { id: '1', value: 'Hamadi Mohamed' },
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
    { id: '1', value: '7 ème De base' },
    { id: '2', value: '8 ème De base' },
    { id: '3', value: '9 ème De base' },
    { id: '4', value: '1 ère Secondaire' },
    { id: '5', value: '2 ème Secondaire économie et service' },
    { id: '6', value: '2 ème Secondaire Informatique' },
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
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: new FormControl(),
      //img: new FormControl(),
      NomC: new FormControl(),
      typeC: new FormControl(),
      chapitre: new FormControl(),
      enseig: new FormControl(),
      formatC: new FormControl(),
      dureeC: new FormControl(),

   lienCours: new FormControl(),
    //  MatiereFiche: new FormControl(),
     /* gender: new FormControl(),
      address: new FormControl(),*/
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
     NomC: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
     typeC: ['', [Validators.required]],
     chapitre: ['', [Validators.required]],
     enseig: ['', [Validators.required]],
     formatC: ['', [Validators.required]],
     dureeC: ['', [Validators.required]],
     lienCours: ['', [Validators.required]],

      
     
     /* email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      status: ['', [Validators.required]],
      address: [''],*/
    });

   

  }
  // fetch data
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/cours.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
    
  // add new record
  addRow(content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',scrollable:true
    });
    this.register.patchValue({
      id: this.getId(10, 100),
   //   img: this.newUserImg,

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
      NomC: row.NomC,
      typeC: row.typeC,
      chapitre: row.chapitre,
      enseig: row.enseig,
      formatC: row.formatC,
      dureeC: row.dureeC,
      lienCours: row.lienCours,
     // MatiereFiche: row.status,
       /* address: row.address,*/
    });
    this.selectedRowData = row;
  }


  // delete single row
  deleteSingleRow(row) {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir supprimer ce chapitre?',
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
        value.NomC = form.value.NomC;
        value.typeC = form.value.typeC;
        value.chapitre = form.value.chapitre;
        value.enseig = form.value.enseig;
        value.formatC = form.value.formatC;
        value.dureeC = form.value.dureeC;
      value.lienCours = form.value.lienCours;
      //  value.MatiereFiche = form.value.MatiereFiche;
        //value.address = form.value.address;
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
    this.toastr.success('cours ajoutée avec succès', '');
  }
  editRecordSuccess() {
    this.toastr.success('cours modifiée avec succès', '');
  }
  deleteRecordSuccess(count) {
    this.toastr.error(count + ' cours supprimée avec succès', '');
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


}
export interface selectRowInterface {
  Nom: String;
  Description: String;
  Type: String;
  Niveau: String;
  Trimestre: String;
  NbrChapitres: String;
  

}
