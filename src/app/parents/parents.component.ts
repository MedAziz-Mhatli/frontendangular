import { Component, OnInit,ViewChild, TemplateRef, HostListener } from '@angular/core';
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

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.sass'],
  providers: [ToastrService],
})
export class ParentsComponent implements OnInit {

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [];
  //
  expanded: any = {};
  timeout: any;

  //
  scrollBarHorizontal = window.innerWidth < 1200;
  selectedRowData: selectRowInterface;
  newUserImg = 'assets/images/users/user-2.png';
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
    { name: 'First Name' },
    { name: 'Last Name' },
    //{ name: 'Designation' },
    { name: 'Enfant' },
    { name: 'Phone' },
    { name: 'Email' },
    //{ name: 'Status' },
    { name: 'Address' },
    {name: 'Login'},
    {name: 'Mot de passe'},
    {name:'Gouvernorat'},
    {name: 'Rue'},
    {name: 'Délégation'},
    {name: 'code postal'},

    
  ];
  gouvernoratType = [
    { id: '1', value: 'Ariana' },
    { id: '2', value: 'Béja' },
    { id: '3', value: 'Ben Arous' },
    { id: '4', value: 'Bizerte' },
    { id: '5', value: 'Gabès' },
    { id: '6', value: 'Gafsa' },
    { id: '7', value: 'Jendouba' },
    { id: '8', value: 'Kairouan' },
    { id: '9', value: 'Kasserine' },
    { id: '10', value: 'Kébili' },
    { id: '11', value: 'Kef' },
    { id: '12', value: 'Mehdia' },
    { id: '13', value: 'Manouba' },
    { id: '14', value: 'Médenine' },
    { id: '15', value: 'Monastir' },
    { id: '16', value: 'Nabeul' },
    { id: '17', value: 'Sfax' },
    { id: '18', value: 'Sidi Bouzid' },
    { id: '19', value: 'Siliana' },
    { id: '20', value: 'Sousse' },
    { id: '21', value: 'Tataouine' },
    { id: '22', value: 'Tozeur' },
    { id: '23', value: 'Tunis' },
    { id: '24', value: 'Zaghouan' },    
  ];
  genders = [
    { id: '1', value: 'male' },
    { id: '2', value: 'femelle' },
  ];
  statusType = [
    { id: '1', value: 'Active' },
    { id: '2', value: 'Completed' },
    { id: '3', value: 'Pending' },
  ];
  designationType = [
    { id: '1', value: 'Manager' },
    { id: '2', value: 'Team Leader' },
    { id: '3', value: 'Clerk' },
  ];
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      id: new FormControl(),
      img: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      //designation: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      //status: new FormControl(),
      enfant: new FormControl(),
      address: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
      gouvernorat: new FormControl(),
      rue: new FormControl(),
      delegation: new FormControl(),
      code: new FormControl()
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
      title: 'Voulez vous supprimer cette ligne?',
      showCancelButton: true,
      confirmButtonColor: '#8963ff',
      cancelButtonColor: '#fb7823',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Supprimer',
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
      img: [''],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastName: [''],
      //designation: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      enfant: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      //status: ['', [Validators.required]],
      address: [''],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      gouvernorat:[''] ,
      rue:[''] ,
      delegation:[''] ,
      code:[''] 
    });
  }
  // fetch data
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/parents-data.json');
    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };
    req.send();
  }
  // add new record
  addRow(content) {
    /*this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',scrollable:true
    });*/
    this.register.patchValue({
      id: this.getId(10, 100),
      img: this.newUserImg,
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
      img: row.img,
      firstName: row.firstName,
      lastName: row.lastName,
      //designation: row.designation,
      phone: row.phone,
      email: row.email,
      enfant: row.enfant,
      //status: row.status,
      address: row.address,
      login: row.login,
      password: row.password,
      gouvernorat:row.gouvernorat,
      rue:row.rue,
      delegation:row.delegation,
      code:row.code

      
    });
    this.selectedRowData = row;
  }
  // delete single row
  deleteSingleRow(row) {
    Swal.fire({
      title: 'Voulez vous supprimer cette ligne?',
      showCancelButton: true,
      confirmButtonColor: '#8963ff',
      cancelButtonText:'Annuler',
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
        value.firstName = form.value.firstName;
        value.lastName = form.value.lastName;
        //value.designation = form.value.designation;
        value.phone = form.value.phone;
        value.enfant = form.value.enfant;
        value.email = form.value.email;
        //value.status = form.value.status;
        value.address = form.value.address;
        value.login=form.value.login;
        value.password=form.value.login;
        value.gouvernorat=form.value.gouvernorat;
        value.rue=form.value.rue;
        value.delegation=form.value.delegation;
        value.code=form.value.code;
      }
      this.modalService.dismissAll();
      return true;
    });
    this.editRecordSuccess();
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
    this.toastr.success('Ligne ajoutée avec succés', '');
  }
  editRecordSuccess() {
    this.toastr.success('Ligne modifiée avec succés', '');
  }
  deleteRecordSuccess(count) {
    this.toastr.error(count + ' Ligne supprimée avec succés', '');
  }

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


  // Partie oui ou non du parent 
  
}
export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
}

