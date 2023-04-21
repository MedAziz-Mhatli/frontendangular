import { Component, OnInit,Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatieresService } from 'src/app/services/matieres.service';

import { Matieres } from 'src/app/models/Matieres';
import { Observable, range } from 'rxjs';
import { ChapitresService } from 'src/app/services/chapitres.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  matieres: any;
   mat:any;
   m:any;
   public Matieres:Matieres[];
    constructor(public MatieresS: MatieresService,public ChappitresS: ChapitresService, private router:Router, private route: ActivatedRoute) { }
  ngOnInit(){
  
    setTimeout(this.readMatieres(),100);
   

  }

readMatieres(): any {
    this.ChappitresS.getNbChapitre()
      .subscribe(
        data => {
          this.matieres = data

        
         console.log( data);
          
        },
        error => {
          console.log(error);
        });
  }
  

}
