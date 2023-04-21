import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.sass']
})
export class ParentFormComponent implements OnInit {
  editForm: FormGroup;
  register: FormGroup;
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
    { id: '1', value: 'Mr' },
    { id: '2', value: 'Mme' },
  ];
  EgendersType=[
    { id: '1', value: 'Garçon' },
    { id: '2', value: 'Fille' },
  ];

  statusType = [
    { id: '1', value: 'Active' },
    { id: '2', value: 'Completed' },
    { id: '3', value: 'Pending' },
  ];

  constructor(
    private fb: FormBuilder,
  ) {
    /*this.editForm = */this.fb.group({
      id: new FormControl(),
      img: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      gender:new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      dateNaissance: new FormControl(),
      address: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
      gouvernorat: new FormControl(),
      rue: new FormControl(),
      delegation: new FormControl(),
      code: new FormControl(),
      enfant: new FormControl(),
      niveau: new FormControl(),
      Egender: new FormControl(),
    });
  }

 
  ngOnInit() {
    this.register = this.fb.group({
      id: [''],
      img: [''],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastName: [''],
      gender:[''],
      phone: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dateNaissance: ['', [Validators.required]],
      address: [''],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      gouvernorat:[''] ,
      rue:[''] ,
      delegation:[''] ,
      code:[''] ,
      enfant:[''],
      niveau: [''],
      Egender:['']
    });
   
  }
  
}

