import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {

  /*constructor() { }

  ngOnInit(): void {
  }*/
   //show and hide password
   public showPassword: boolean;

   //rows = [];
   expanded: any = {};
   timeout: any;
 
   //
   scrollBarHorizontal = window.innerWidth < 1200;
   selectedRowData: selectRowInterface;
   newUserImg = 'assets/images/users/user-0.png';
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
     { name: 'First Name'},
     { name: 'Last Name'},
     //{ name: 'Gender' },
     { name: 'Phone' },
     { name: 'Email' },
     { name: 'Pack' },
     //{ name: 'Address' },
     {name:'Naissance'},
     {name:'Gouvernorat'},
     {name:'Niveau'},
     //{name:'Date de début'},
     {name:"Date d expiration"},
     //{name:'Solde'},
     {name:'Photo'},
     {name: 'Login'},
     {name: 'Mot de passe'},
     {name: 'Rue'},
     {name: 'Délégation'},
     {name: 'code postal'},
     //{name: 'Fille'},
     {name: 'Genre'},
     {name: 'Etat expiration'},
     
 
   ];
 
   niveauType = [
     { id: '1', value: '7éme année' },
     { id: '2', value: '8éme année' },
     { id: '3', value: '9éme année' },
     { id: '4', value: '1ére année' },
     { id: '5', value: '2éme Science' },
     { id: '6', value: '2éme Economie et services' },
     { id: '7', value: '2éme Lettres' },
     { id: '8', value: '2éme Informatique' },
     { id: '9', value: '3éme Mathématiques' },
     { id: '10', value: '3éme Sciences expérimentales' },
     { id: '11', value: '3éme Techniques' },
     { id: '12', value: '3éme Economie et Services' },
     { id: '13', value: '3éme Informatique' },
     { id: '14', value: '4éme Mathématiques' },
     { id: '15', value: '4éme Sciences expérimentales' },
     { id: '16', value: '4éme Techniques' },
     { id: '17', value: '4éme Economie et Services' },
     { id: '18', value: '4éme Informatique' },
   ];
 
   genders = [
     { id: '1', value: 'Garçon' },
     { id: '2', value: 'Fille' },
   ];
 
   Pgenders = [
     { id: '1', value: 'Mr' },
     { id: '2', value: 'Mme' },
   ];
 
 
 
   packType = [
     { id: '1', value: 'Pack1' },
     { id: '2', value: 'Pack2' },
     { id: '3', value: 'Pack3' },
     { id: '4', value: 'Gratuit' },
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
   
   /*optionType = [
     { id: '1', value: 'Allemenad' },
     { id: '2', value: 'Espagnol' },
     { id: '3', value: 'Italien' },
     { id: '4', value: 'Chinois' },
     { id: '5', value: 'Dessin' },
   ];*/
   //@ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
   constructor(
     //currentDate :Date= new Date(),
     private fb: FormBuilder,
     //private modalService: NgbModal,
     private toastr: ToastrService
   ) {
     this.editForm = this.fb.group({
       id: new FormControl(),
       img: new FormControl(),
       firstName: new FormControl(),
       lastName: new FormControl(),
       //option: new FormControl(),
       phone: new FormControl(),
       email: new FormControl(),
       pack: new FormControl(),
       gender: new FormControl(),
       //address: new FormControl(),
       dateNaissance: new FormControl(),
       gouvernorat: new FormControl(),
       niveau: new FormControl(),
       //debut: new FormControl(),
       expiration: new FormControl(),
       //solde: new FormControl(),
       photo: new FormControl(),
       login: new FormControl(),
       password: new FormControl(),
       rue: new FormControl(),
       delegation: new FormControl(),
       code: new FormControl(),
       fille: new FormControl(),
       garcon: new FormControl(),
       genre: new FormBuilder(),
       etatExpiration: new FormBuilder(),
       PfirstName: new FormBuilder(),
       LlastName: new FormBuilder(),
       Pgender: new FormBuilder(),
       
     
       
 
       
 
     });
     
     window.onresize = () => {
       this.scrollBarHorizontal = window.innerWidth < 1200;
     };
   }
 
   
   // select record using check box
   /*onSelect({ selected }) {
     this.selected.splice(0, this.selected.length);
     this.selected.push(...selected);
 
     if (this.selected.length === 0) {
       this.isRowSelected = false;
     } else {
       this.isRowSelected = true;
     }
   }*/
   /*deleteSelected() {
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
           this.deleteRecord(row);
         });
         this.deleteRecordSuccess(this.selected.length);
         this.selected = [];
         this.isRowSelected = false;
       }
     });
   }*/
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
       /*designation: ['', [Validators.required]],*/
       //option:[''],
       phone: ['', [Validators.required]],
       gender: ['', [Validators.required]],
       email: [
         '',
         [Validators.required, Validators.email, Validators.minLength(5)],
       ],
       pack: ['', [Validators.required]],
       //address: [''],
       dateNaissance:[''],
       gouvernorat:[''],
       niveau:[''],
       //debut:[''],
       expiration:[''],
       //solde:[''],
       photo:[''],
       login:['', [Validators.required]],
       password:['', [Validators.required]],
       rue: ['', [Validators.required]],
       delegation:['', [Validators.required]],
       code: ['', [Validators.required]],
       fille:[''],
       garcon: [''],
       genre: [''],
       etatExpiration: [''],
       PfirstName:[''],
       PlastName:[''],
       Pgender: [''],
       enfant: [''], 
       
 
       
 
       
     });
     
   }
   
   
   // fetch data
   fetch(cb) {
     const req = new XMLHttpRequest();
     req.open('GET', 'assets/data/élève-data.json');
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
       size: 'lg',scrollable:true,
     });*/
     this.register.patchValue({
       id: this.getId(10, 100),
       img: this.newUserImg,
     });
   }
   // edit record
   editRow(row, rowIndex, content) {
     /*this.modalService.open(content, {
       ariaLabelledBy: 'modal-basic-title',
       size: 'lg',scrollable: true,
     });*/
     this.editForm.setValue({
       id: row.id,
       img: row.img,
       firstName: row.firstName,
       lastName: row.lastName,
       //option :row.option,
       phone: row.phone,
       email: row.email,
       gender: row.gender,
       pack: row.status,
       //address: row.address,
       dateNaissance: row.dateNaissance,
       gouvernorat: row.gouvernorat,
       niveau: row.niveau,
       //debut: row.debut,
       expiration: row.expiration,
       //solde: row.solde,
       photo: row.photo,
       login: row.login,
       password: row.password,
       rue: row.rue,
       delegation: row.delegation,
       code: row.code,
       fille:row.fille,
       garcon:row.garçon,
       genre:row.genre,
       etatExpiration:row.etatExpiration,
       PfirstName: row.PfirstName,
       Pgender: row.Pgender,
       
 
       
       
       
     });
     
     this.selectedRowData = row;
   }
   // delete single row
   /*deleteSingleRow(row) {
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
   }*/
 
   /*deleteRecord(row) {
     this.data = this.arrayRemove(this.data, row.id);
   }*/
   /*arrayRemove(array, id) {
     return array.filter(function (element) {
       return element.id !== id;
     });
   }*/
   // save add new record
   /*onAddRowSave(form: FormGroup) {
     this.data.push(form.value);
     this.data = [...this.data];
     form.reset();
     this.modalService.dismissAll();
     this.addRecordSuccess();
   }*/
   // save record on edit
   onEditSave(form: FormGroup) {
     this.data = this.data.filter((value, key) => {
       if (value.id == form.value.id) {
         value.firstName = form.value.firstName;
         value.lastName = form.value.lastName;
         //value.option = form.value.option;
         value.phone = form.value.phone;
         value.gender = form.value.gender;
         value.email = form.value.email;
         value.pack = form.value.pack;
         //value.address = form.value.address;
         value.dateNaissance=form.value.dateNaissance;
         value.gouvernorat=form.value.gouvernorat;
         value.niveau=form.value.niveau;
         //value.debut=form.value.debut;
         value.expiration=form.value.expiration;
         //value.solde=form.value.solde;
         value.photo=form.value.photo;
         value.login=form.value.login;
         value.password=form.value.login;
         value.rue=form.value.rue;
         value.delegation=form.value.delegation,
         value.code=form.value.code,
         value.fille=form.value.code,
         value.garcon=form.value.garcon,
         value.genre=form.value.genre,
         value.etatExpiration=form.value.etatExpiration,
         value.PfirstName=form.value.PfirstName,
         value.Pgender=form.value.Pgender
        
       }
       //this.modalService.dismissAll();
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
     //this.table.offset = 0;
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
  

}

export interface selectRowInterface {
  img: String;
  firstName: String;
  lastName: String;
 
}

