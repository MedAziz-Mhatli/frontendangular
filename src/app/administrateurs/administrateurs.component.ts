import { Component, OnInit,ViewChild, TemplateRef } from '@angular/core';
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
  selector: 'app-administrateurs',
  templateUrl: './administrateurs.component.html',
  styleUrls: ['./administrateurs.component.sass'],
  providers: [ToastrService],
})
export class AdministrateursComponent implements OnInit {

  /*constructor() { }

  ngOnInit(): void {
  }*/
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  rows = [];
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
    //{ name: 'Gender' },
    //{ name: 'Phone' },
    { name: 'Email' },
    { name: 'Responsabilité' },
    { name: 'Address' },
    { name: 'Login' },
    { name: 'Mot de passe' },
  ];
  genders = [
    { id: '1', value: 'male' },
    { id: '2', value: 'femelle' },
  ];
  responsibilityType = [
    { id: '1', value: "Gestion des utilisateurs" },
    { id: '2', value: 'Gestion des cours' },
    { id: '3', value: 'Gestion des matières' },
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
      //phone: new FormControl(),
      email: new FormControl(),
      responsibility: new FormControl(),
      //gender: new FormControl(),
      address: new FormControl(),
      login: new FormControl(),
      password: new FormControl()
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
      cancelButtonText: 'Annuler',
      confirmButtonColor: '#8963ff',
      cancelButtonColor: '#fb7823',
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
      //phone: ['', [Validators.required]],
      //gender: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      responsibility: ['', [Validators.required]],
      address: [''],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  // fetch data
  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'assets/data/administrateurs-data.json');
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
      size: 'lg',
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
      size: 'lg',
    });
    this.editForm.setValue({
      id: row.id,
      img: row.img,
      firstName: row.firstName,
      lastName: row.lastName,
      //designation: row.designation,
      //phone: row.phone,
      email: row.email,
      //gender: row.gender,
      responsibility: row.responsiblity,
      address: row.address,
      login: row.login,
      password: row.password,

    });
    this.selectedRowData = row;
  }
  // delete single row
  deleteSingleRow(row) {
    Swal.fire({
      title: 'Voulez vous supprimer cette ligne?',
      showCancelButton: true,
      confirmButtonColor: '#8963ff',
      cancelButtonColor: '#fb7823',
      cancelButtonText: 'Annuler',
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
        //value.phone = form.value.phone;
        //value.gender = form.value.gender;
        value.email = form.value.email;
        value.responsibility = form.value.responsibility;
        value.address = form.value.address;
        value.login=form.value.login;
        value.password=form.value.password;
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
    this.toastr.success('Ligne ajoutée avec succées!', '');
  }
  editRecordSuccess() {
    this.toastr.success('Ligne modifiée avec succés', '');
  }
  deleteRecordSuccess(count) {
    this.toastr.error(count + ' Ligne supprimée avec succés', '');
  }

}

export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
}


