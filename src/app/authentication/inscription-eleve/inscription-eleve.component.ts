import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ElevesService } from 'src/app/services/eleves.service';
import { Eleve } from 'src/app/models/eleve';
import { ActivatedRoute, Router } from '@angular/router';
import { NiveauService } from 'src/app/services/niveau.service';
import { AddresseService } from 'src/app/services/addresse.service';

@Component({
  selector: 'app-inscription-eleve',
  templateUrl: './inscription-eleve.component.html',
  styleUrls: ['./inscription-eleve.component.sass']
})
export class InscriptionEleveComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  error = '';
  sectionNiveau:number;
  eleve: Eleve = new Eleve();
  listGouvernorat: [];
  listNiveauSection:[];
  id!: number;
 
  selected: number;
  constructor(private eleveService: ElevesService,private adressService:AddresseService , private sectionNiveauService: NiveauService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
  //  this.getGouvernorat();
    this.getSectionNiveau();
    this.id = this.route.snapshot.params['id'];


    this.registerForm = new FormGroup({
      nomEleve: new FormControl( 'nom',[Validators.required]),
      prenomEleve: new FormControl( 'nom',[Validators.required]),
      phoneEleve: new FormControl( 'nom',[Validators.required]),
      dateNaissanceEleve: new FormControl( 'nom',[Validators.required]),
      motPasseEleve: new FormControl( 'nom',[Validators.required]),
      sectionNiveau:new FormControl( 'nom',[Validators.required]),
    //  localiteId:new FormControl( 'nom',[Validators.required]),

    //  sectionNiveauId:[],

    });

  }

  get f() { return this.registerForm.controls; }
  //add data
  saveEleve(): void {
    this.eleveService.createEleve(this.registerForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
     
      });
      
  }

  getSectionNiveau() {
    this.sectionNiveauService.getNiveauSectionFromDataBase().subscribe(
      result => {
        this.listNiveauSection = result;
        console.log( result);
        
      }
    );
  }
  onSubmit(): void {

    this.saveEleve();

  }

  //getGouvernorat() {
 //   this.adressService.getGouvernoratFromDataBase().subscribe(
  //   result => {
   //     this.listGouvernorat = result;
   //    console.log(result);
        
   //   }
  // );
  //}
  
 
}







