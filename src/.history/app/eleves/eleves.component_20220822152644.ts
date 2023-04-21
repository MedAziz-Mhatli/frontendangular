import { Component, HostListener, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import {ElevesService} from '../services/eleves.service';
import {Eleve} from '../models/eleve';

@Component({
  selector: 'app-eleves',
  templateUrl: './eleves.component.html',
  styleUrls: ['./eleves.component.sass'],
  providers: [ToastrService],
})
export class ElevesComponent implements OnInit {
  /*currentEleve: Eleve = {
    id:0,
    nomEleve: '',
    prenomEleve: '',
    loginEleve: '',
    emailEleve: '',
    phoneEleve: 0,
    dateNaissanceEleve: new Date(),
    sexeEleve: '',
    etatEleve: true,
    motPasseEleve: '',
    photoEleve: '',
    soldeEleve: 0,
    rue: '',
    acteNaissance: '',
    etatConfirmation: true,
    dateConfirmation: '',
  };*/

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  timeout: any;
  scrollBarHorizontal = window.innerWidth < 1200;
  rows = [];
  data = [];
  filteredData = [];
  loadingIndicator = true;
  isRowSelected = false;
  reorderable = true;
  public selected: any[] = [];
  columns = [
    { name: 'First Name'},
    { name: 'Last Name'},
    { name: 'Phone' },
    { name: 'Email' },
    { name: 'Pack' },
    {name:'Naissance'},
    {name:'Gouvernorat'},
    {name:'Niveau'},
    {name:"Date d expiration"},
    {name:'Photo'},
    {name: 'Login'},
    {name: 'Mot de passe'},
    {name: 'Rue'},
    {name: 'Délégation'},
    {name: 'code postal'},
    {name: 'Genre'},
    {name: 'Etat expiration'}
  ];


  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  constructor(private router:Router,
    private route: ActivatedRoute,
    private eleveService:ElevesService) {
  }


  getListeEleve()
  {
    return this.eleveService.getAllEleves().subscribe(
      result => {
        this.eleveListe=result;
        console.log(result);
      } 
    );
  }

  deleteAbonnementParEleve(id:any)
  {
    this.eleveService.deleteAbonnementParEleve(id);
  }

  deleteEleve(id:any)
  {
    this.eleveService.deleteEleve(id);
  }

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
      title: 'Voulez vous supprimer cette ligne?',
      showCancelButton: true,
      confirmButtonColor: '#8963ff',
      cancelButtonText:'Annuler',
      cancelButtonColor: '#fb7823',
      confirmButtonText: 'Supprimer',
    }).then((result) => {
      if (result.value) {
        this.selected.forEach((row) => {
          //this.deleteRecord(row);
          //this.deleteEleve(row.id);

        });
        this.deleteRecordSuccess(this.selected.length);
        this.selected = [];
        this.isRowSelected = false;
      }
    });
  }

  public eleveListe=[];
  ngOnInit() {
      this.getListeEleve();
      this.fetch((data) => {
      this.data = data;
      this.filteredData = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
  }
  
  
  // fetch data
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/élves-data.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
  
  // delete single row
  deleteSingleRow(row) {
    Swal.fire({
      title: 'Voulez vous supprimer cette ligne?',
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#8963ff',
      cancelButtonColor: '#fb7823',
      confirmButtonText: 'Supprimer',
    }).then((result) => {
      if (result.value) {
        this.deleteRecord(row);
        this.deleteRecordSuccess(1);
      }
    });
  }


  deleteRecord(row) {
    this.data = this.arrayRemove(this.data,row.id);
    /*this.deleteAbonnementParEleve(row.id);
    this.deleteEleve(row.id);
    console.log(row.id);*/
  }

  
  deleteEleveAbonnement(row)
  {
    this.deleteAbonnementParEleve(row.id);
    this.deleteEleve(row.id);
    console.log(row.id);
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
    this.addRecordSuccess();
  }


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
  // get random id
  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  addRecordSuccess() {
    //this.toastr.success('Ligne ajoutée avec succés', '');
  }
  editRecordSuccess() {
    //this.toastr.success('Ligne modifiée avec succés', '');
  }
  deleteRecordSuccess(count) {
    //this.toastr.error(count + ' Ligne supprimée avec succés', '');
  }

  //
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

