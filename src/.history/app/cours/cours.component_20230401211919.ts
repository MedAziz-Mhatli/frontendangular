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

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.sass'],
  providers: [ToastrService],
})
export class CoursComponent implements OnInit {
  //jdid
  categories: any[];
  cat:any;

  produits: Produit[]=[];
  registerForm: FormGroup;
  selectedProduit: Produit;
  selectedRowDataa: Produit;
  data: Produit[];
  filteredData: Produit[] = [];
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
    { name: 'produit ' },
    { name: 'prix actuel ' },
    { name: 'prix réduction ' },
    { name: 'quantité ' },
    { name: 'description' },
    { name: 'date_expiration' },
    { name: 'catégorie' },
   
  ];
 
  @ViewChild(DatatableComponent, { static: false }) table2: DatatableComponent;
  
  constructor( private router:Router,public produitsService: ProduitsService, public categoriesService: CategorieService, 
  private fb: FormBuilder,
    private modalService: NgbModal, public modal: NgbActiveModal,
    private toastr: ToastrService
  ) {
    this.editForm = this.fb.group({
      idProduit: new FormControl(),
    //  imageProduit: new FormControl(),
      nomProduit: new FormControl(),
      prixActuel: new FormControl(),
      prixRreduction: new FormControl(),
      quantite: new FormControl(),
      description: new FormControl(),
      dateExpiration: new FormControl(),
      //idCategorie: new FormControl(),
      categorie: new FormControl(),
    //  idVendeur: new FormControl(),
     
     
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

  deleteproduit(idProduit: number) {
    this.produitsService.deleteProduit(idProduit).subscribe(() => {
      this.produits = this.produits.filter(c => c.idProduit !== idProduit);
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
     // Récupérer la liste des catégories depuis le backend
     this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
    //filtre jdid
    this.produitsService.getAllProduits().subscribe(data => {
      this.data = data;
      this.filteredData = data;
      setTimeout(() => {
        this.loadingIndicator = false;
      }, 500);
    });
    this.register = this.fb.group({
      idProduit: [''],
   //   imageProduit: ['', [Validators.required]],
      nomProduit: ['', [Validators.required]],
      prixActuel: ['', [Validators.required]],
      prixRreduction: ['', [Validators.required]],
      quantite: ['', [Validators.required]],
      idCategorie: ['', [Validators.required]],
      Categorie: ['', [Validators.required]],
     // idVendeur: ['', [Validators.required]],


    });
  //ali jdid///
  //affichage
    this.produitsService.getAllProduits()
    .subscribe(produits => {
        this.produits = produits;
        console.log(this.produits);
    });
  //ajout jdid
  this.registerForm = this.fb.group({
  //  imageProduit: ['', [Validators.required]],
    nomProduit: [''],
    prixActuel: ['', [Validators.required]],
    prixRreduction: ['', [Validators.required]],
    quantite: ['', [Validators.required]],
    description: ['', [Validators.required]],
    dateExpiration: ['', [Validators.required]],
    idCategorie: ['', [Validators.required]],
    
    //idVendeur: ['', [Validators.required]],
}); 
//edit jdid
this.editForm = this.fb.group({
  idProduit: ['null'],
//  imageProduit: ['', [Validators.required]],
  nomProduit: ['', [Validators.required]],
  prixActuel: ['', [Validators.required]],
  prixRreduction: ['', [Validators.required]],
  quantite: ['', [Validators.required]],
  description: ['', [Validators.required]],
  dateExpiration: ['', [Validators.required]],
 // idCategorie: ['', [Validators.required]],
  Categorie: [''],
 // idVendeur: ['', [Validators.required]],
});

this.editForm.patchValue({
  idProduit: this.selectedRowDataa?.idProduit,
 // imageProduit: this.selectedRowDataa?.imageProduit,
  nomProduit: this.selectedRowDataa?.nomProduit,
  prixActuel: this.selectedRowDataa?.prixActuel,
  prixRreduction: this.selectedRowDataa?.prixRreduction,
  quantite: this.selectedRowDataa?.quantite,
  description: this.selectedRowDataa?.description,
  dateExpiration: this.selectedRowDataa?.dateExpiration,
  categorie: this.selectedRowDataa?.categorie.nomCategorie,
 // idVendeur: this.selectedRowDataa?.idVendeur,
});
  }
  //jdid ajout
  onSubmit() {
   
    if (this.registerForm.valid) {
        const produit: Produit = {
            
            idProduit: this.registerForm.value.idProduit,
          //  imageProduit: this.registerForm.value.imageProduit,
            nomProduit: this.registerForm.value.nomProduit,
            prixActuel: this.registerForm.value.prixActuel,
            prixRreduction: this.registerForm.value.prixRreduction,
            quantite: this.registerForm.value.quantite,
            description: this.registerForm.value.description,
            dateExpiration: this.registerForm.value.dateExpiration,
         //   idCategorie:this.registerForm.value.idCategorie,
            categorie:{idCategorie:this.registerForm.value.idCategorie,nomCategorie:this.registerForm.value.nomCategorie},
            
          //  idVendeur: this.registerForm.value.idVendeur,
        };
        
        this.produitsService.addProduit(produit).subscribe(
            res => {
                console.log('Produit ajouté : ', res);
                Swal.fire({
                  icon: 'success',
                  title: 'Produit ajoutée avec succès!',
                  showConfirmButton: false,
                  timer: 1500
                }).then(() => {
                  window.location.reload(); // rafraîchit la page
                });
            },
            err => console.error(err)
        );
    } else {
        console.error('Formulaire invalide');
    }
}
  //suppression
  deleteProduit(idProduit: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Voulez-vous vraiment supprimer  ce produit ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#61B766',
      cancelButtonColor: '#FA8C74',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.produitsService.deleteProduit(idProduit).subscribe(() => {
          this.produits = this.produits.filter(produits => produits.idProduit !== idProduit);
          Swal.fire(
            'Supprimé!',
            'Le produit a été supprimée.',
            'success'
          ).then(() => {
            window.location.reload(); // rafraîchit la page
          });
        });
      }
    });
  }
  catt:any;
  //edit
  onEditSaveProduit(form: FormGroup): void {
    
    if (form.valid) {
      const idProduit = form.get('idProduit')?.value;
     // const imageProduit = form.get('imageProduit')?.value;
      const nomProduit = form.get('nomProduit')?.value;
      const prixActuel = form.get('prixActuel')?.value;
      const prixRreduction = form.get('prixRreduction')?.value;
      const quantite = form.get('quantite')?.value;
      const description = form.get('description')?.value;
      const dateExpiration = form.get('dateExpiration')?.value;
     // const idCategorie = form.get('idCategorie')?.value;
     const categorie = form.get('categorie')?.value;
     // const idVendeur = form.get('idVendeur')?.value;
      if (idProduit !== null  && nomProduit !== '' && prixActuel && prixRreduction && quantite && categorie) {
        const updatedProduit: Produit = {
          idProduit: idProduit,
         // imageProduit: imageProduit,
          nomProduit: nomProduit,
          prixActuel: prixActuel,
          prixRreduction: prixRreduction,
          quantite: quantite,
          categorie: { idCategorie: categorie.idCategorie, nomCategorie: categorie.nomCategorie }
          // idVendeur: idVendeur
        };
        this.produitsService.updateProduit(updatedProduit).subscribe(res => {
          // Faire quelque chose après la mise à jour de la catégorie
          this.modal.close();
          window.location.reload();
        });
      }
    }
  }
  editRoww(row: any, rowIndex: number, content: any) {
    this.selectedRowData = row; // set the selected row data
    this.editForm = this.fb.group({
      idProduit: [row.idProduit],
     // imageProduit: [row.imageProduit, Validators.required],
      nomProduit: [row.nomProduit, Validators.required],
      prixActuel: [row.prixActuel, Validators.required],
      prixRreduction: [row.prixRreduction, Validators.required],
      quantite: [row.quantite, Validators.required],
    //  idCategorie: [row.idCategorie, Validators.required],
      categorie: [row.categorie.nomCategorie, Validators.required],

      //idVendeur: [row.idVendeur, Validators.required],
    });
    this.modalService.open(content, { size: 'lg',centered: true }).result.then(
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
      size: 'lg',scrollable:true,centered: true
    });
    this.register.patchValue({
      id: this.getId(10, 100),


    });
  }
 
  // edit record
  editRow(row, rowIndex, content) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg',scrollable:true,centered: true
    });
    this.editForm.setValue({
      id_categorie: row.id_categorie,
      Nom_categorie: row.Nom_categorie,

    });
    this.selectedRowData = row;
  }
//filtre jdid
  filterValues = {
    nomProduit: ''
  };
  filterCategories() {
    let filteredData = this.data;
  
    if (this.filterValues.nomProduit) {
      filteredData = filteredData.filter((produit: Produit) =>
      produit.nomProduit.toLowerCase().includes(this.filterValues.nomProduit.toLowerCase())
      );
    }
  
    this.filteredData = filteredData;
  }
  
  onFilterChange() {
    this.filterCategories();
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
      if (value.idProduit == form.value.idProduit) {
    //    value.imageProduit = form.value.imageProduit;
        value.nomProduit = form.value.nomProduit;
        value.prixActuel = form.value.prixActuel;
        value.prixRreduction = form.value.prixRreduction;
        value.quantite = form.value.quantite;
        value.categorie = form.value.categorie;
        //value.idVendeur = form.value.idVendeur;
      
      }
      this.modalService.dismissAll();
      return true;
    });
    this.editRecordSuccess();
  }
  // save record on edit chapitres
  
 
  // filter jdid
  filterDatatable(event) {
    const val = event.target.value.toLowerCase();
    if (this.data) { // check if the data variable is not null or undefined
    const filtered = this.data.filter(
    (d) => d.nomProduit.toLowerCase().indexOf(val) !== -1 || !val
    );
    this.filteredData = filtered;
    this.table.offset = 0;
    }
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
