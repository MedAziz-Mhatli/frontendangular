import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AddresseService} from '../services/addresse.service';
import {NiveauService} from '../services/niveau.service';
import {ElevesService} from '../services/eleves.service';
import {MatiereOptionService} from '../services/matiere-option.service';
import {Eleve} from '../models/eleve';
import {Gouvernorat} from '../models/gouvernorat';
import {TypeAbonnementService} from  '../services/type-abonnement.service'
import {AbonnementService} from '../services/abonnement.service'
import {ParentService} from '../services/parent.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eleve-form',
  templateUrl: './eleve-form.component.html',
  styleUrls: ['./eleve-form.component.sass'],
})


export class EleveFormComponent implements OnInit {

  //show and hide password
  public showPassword: boolean;
  registerEleve!:FormGroup;
  registerParent:FormGroup;
  registerAbonnement:FormGroup;

  //Creation eleve
  submittedEleve :boolean ;
  error = 'Opération post échoué !';
  eleve: Eleve = new Eleve();
  id!: number;

  //genders
  genders = [
    { id: '1', value: 'Garçon' },
    { id: '2', value: 'Fille' },
  ];

  //parentType
  parentType=[
    {id: '1', value:'Pére'},
    {id: '2',value:'Mère'},
  ];

  //Pgenders
  Pgenders = [
    { id: '1', value: 'Mr' },
    { id: '2', value: 'Mme' },
  ];

  //packType
  /*packType = [
    { id: '1', value: 'Pack1' },
    { id: '2', value: 'Pack2' },
    { id: '3', value: 'Pack3' },
    { id: '4', value: 'Gratuit' },
  ];*/

  vGouvernorat: number;
  vDelegation:number;
  vVille:number;

  public gouvernoratListe = [];
  public villeListe = [];
  public villeListaParDelegation = [];
  public codePostalListe = [];
  public delegationListeParGouvernorat =[];
  public niveauListe=[];
  public localiteListeParDelegation=[];
  public codePostalListeParDelegation=[];
  public codeListeParLocalite=[];
  public codeListe=[];

  public listeOption=[];
  public listePack=[];

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private addressService:AddresseService,
    private niveauService:NiveauService,
    private eleveService:ElevesService,
    private matiereoptionService: MatiereOptionService,
    private typeAbonnementService: TypeAbonnementService,
    private abonnementService: AbonnementService,
    private parentService:ParentService,
    private toastr: ToastrService) 
  {
  }

  getGouvernorat()
  {
    this.addressService.getGouvernoratFromDataBase().subscribe(
      result => {
        this.gouvernoratListe=result;
        console.log(result);
      }
    );
  }


  getDelegationParGouvernorat()
  {
      this.addressService.getDelegationParGouvernoratFromDataBase(this.vGouvernorat).subscribe(
      result => {
        this.delegationListeParGouvernorat=result;
        console.log(result);
      } 
    );
  }

  getLocaliteParDelegation()
  {
    this.addressService.getLocaliteParDelegationFromDataBase(this.vDelegation).subscribe(
      result => {
        this.localiteListeParDelegation=result;
        console.log(result);
      } 
    );

  }

  getcodePostalParLocalite()
  {
    this.addressService.getCodePostalParLocaliteFromDataBase(this.vVille).subscribe(
      result => {
        this.codeListeParLocalite=result;
        //console.log("****************codepostaleee" +result[0].code);
        console.log(result);
      } 
    );
  }

  
  getNiveauComplet()
  {
    this.niveauService.getNiveauSectionFromDataBase().subscribe(
      result => {
        this.niveauListe=result;
        console.log(result);
      } 
    );

  }

  getOptionMatiere()
  {
    this.matiereoptionService.getOptionMatiereFromDataBase().subscribe(
      result => {
        this.listeOption=result;
        console.log(result);
      }
    )
    
  }

  getPack()
  {
    this.typeAbonnementService.getTypeAbonnementFromDataBase().subscribe(
      result => {
        this.listePack=result;
        console.log(result);
      } 
    );
  }

  onChangeGouvernorat(event) {
    this.vGouvernorat = event;
    this.getDelegationParGouvernorat();
    
  }

  OnChangeDelegation(event) {
    this.vDelegation = event;
    this.getLocaliteParDelegation();
  }

  OnChangeVille(event) {
    this.vVille = event;
    this.getcodePostalParLocalite();
  }

  ngOnInit() {
    this.getGouvernorat();
    this.getNiveauComplet();
    this.getPack();
    this.getOptionMatiere();


    //
    //this.getDelegationParGouvernorat();
    //this. getLocaliteParDelegation();
    //this.getcodePostalParLocalite();
    //

    this.id = this.route.snapshot.params['id'];

    /*this.registerEleve = new FormGroup({
      prenomEleve: new FormControl( 'nom',[Validators.required]),
      nomEleve: new FormControl( 'nom',[Validators.required]),
      sexeEleve: new FormControl( 'nom',[Validators.required]),
      dateNaissanceEleve: new FormControl( 'nom',[Validators.required]),
      phoneEleve: new FormControl( 'nom',[Validators.required]),
      emailEleve:new FormControl( 'nom',[Validators.required]),
      rue:new FormControl( 'nom',[Validators.required]),*/

    this.registerEleve = this.fb.group({
      //id: [''],
      prenomEleve: ['', [Validators.required]],
      nomEleve: ['',[Validators.required]],
      sexeEleve: ['', [Validators.required]],
      dateNaissanceEleve:['',[Validators.required]],
      phoneEleve: ['',[Validators.required]],
      emailEleve: ['',[Validators.required]],
      rue: ['',Validators.required],
      loginEleve:['', [Validators.required]],
      motPasseEleve:['', [Validators.required]],
      photoEleve: [''],
      localite:[''],
      sectionNiveau:[''],
      gouvernorat:[''],
      delegation:[''],
      //codePostal:['']

    });


    this.registerAbonnement = this.fb.group({
      //id: [''],
      typeAbonnement:[''],
      //sectionNiveau:[''],
      optionMatiere:[''],
      dateExpiration:[''],
      etatAbonnement:['']
    });
    

    this.registerParent = this.fb.group({
      //id: [''],
      civiliteParent:[''],
      nomParent:[''],
      prenomParent:[''],
      typeParents:[''],
      phoneParent:[''],
      emailParent:[''],
      fonctionParents:[''],
      rue:[''],
      gouvernoratParents:[''],
      delegationParents:[''],
      localite:[''],
      //codePostalParents:['']
    });


    
  }

  public get_form(){
    return this.registerEleve.controls;
  }


  addEleve()
  {
    this.eleveService.createEleve(this.registerEleve.value)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.submittedEleve=true;
        this.toastr.success("L'élève est ajoutée avec succés !");
      },
      error: (e) => {
        console.error(e);
        this.submittedEleve=false;
        this.toastr.error("Opération d'envoi échoué !");
      }
    });
  }

  addAbonnement()
  {
    this.abonnementService.createAbonnement(this.registerAbonnement.value)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  addParent()
  {
    this.parentService.createParent(this.registerParent.value)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.error(e)
      }
    });
  }

  
  onSubmit():void {
    this.addEleve();
}






}

