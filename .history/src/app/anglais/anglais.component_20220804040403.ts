import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { TypeFichierService } from '../services/type-fichier.service';
import { ChapitresService } from '../services/chapitres.service';
import { FichierMatiereService } from '../services/fichier-matiere.service';
import { HttpClient} from '@angular/common/http';
import { FichierMatiere } from 'src/app/models/FichierMatiere';
import { MatieresService } from '../services/matieres.service';
import { Matieres } from '../models/Matieres';
import {  map } from 'rxjs/operators';

@Component({
  selector: 'app-anglais',
  templateUrl: './anglais.component.html',
  styleUrls: ['./anglais.component.sass']
})
export class AnglaisComponent implements OnInit {
  enregistrements: any;
  examen: any;
  divers: any;
   Matieres:Matieres=new ;


  constructor(private route:ActivatedRoute,public TypesS: TypeFichierService,public MatieresS: MatieresService,public FichiersS: FichierMatiereService,public ChappitresS: ChapitresService, private router:Router,private http:HttpClient) { 
    this.route.params.subscribe((params=>{
      // tslint:disable-next-line:no-string-literal

      if(params['matiereId']){
       // console.log(params['matiereId']);
       setTimeout( this.readTypes(),5);
       // tslint:disable-next-line:no-string-literal

        this.getMatiere(params['matiereId']);
       // tslint:disable-next-line:no-string-literal

        this.readChapitres(params['matiereId']);
       +// tslint:disable-next-line:no-string-literal

        this.readDivers(params['matiereId']);
           // tslint:disable-next-line:no-string-literal

        this.readEnreg(params['matiereId']);
        // tslint:disable-next-line:no-string-literal

        this.readExamen(params['matiereId']);
      
      }
    }));
   
  }
  
  active;
  active2 = 'top';
  active3;
  active4;
  disabled = true;
  types: any;
  chapitres:any;
  nombre:any;
  fichiers:any;
  Titre: any;
  fichier: any;
  typesF:number;
  FichiersMatieres:  FichierMatiere[] = [];
  FichierMatiere:  FichierMatiere = new  FichierMatiere();
  private baseUrl = 'http://localhost:8000/FichierMatiere';
   
  getMatiere(matiereId:string){
   this.MatieresS.details(matiereId).pipe(
    map(data => {
      const res: any = data;
      console.log(res);
      return res ? res : [];

    })).subscribe((Matieres)=>console.log(Matieres));
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

  ngOnInit(): void {
   
    
       
      
  }
  ////////////get les types /////////////
  readTypes(): any {
    this.TypesS.getAll()
      .subscribe(
        data => {
          this.types = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }
  ///////// les fichiers matieres //////////
  readEnreg(matiereId: string): any {
    this.FichiersS.getEnregistrements(matiereId)
      .subscribe(
        data => {
          this.enregistrements = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }
  readExamen(matiereId: string): any {
    this.FichiersS.getExamens(matiereId)
      .subscribe(
        data => {
          this.examen = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }
  readDivers(matiereId: string): any {
    this.FichiersS.getDivers(matiereId)
      .subscribe(
        data => {
          this.divers = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }
 ////////////tous les chapitres///////////////
    readChapitres(matiereId: string): any {
    this.ChappitresS.getChapitreParMatiere(matiereId)
      .subscribe(
        data => {
          this.chapitres = data
         console.log( data);
        },
        error => {
          console.log(error);
        });
  }
 

  
}
