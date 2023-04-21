import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.sass']
})
export class AdminFormComponent implements OnInit {
  //show and hide password
  public showPassword: boolean;
  //editForm: FormGroup;
  register: FormGroup;
  
  genders = [
    { id: '1', value: 'Garçon' },
    { id: '2', value: 'Fille' },
  ];

  roleType=[
    {id: '1', value:'Gestion des utilisateurs'},
    {id: '2',value:'Gestion des matières'},
    {id: '3',value:'Gestion des cours'}
  ];

  Pgenders = [
    { id: '1', value: 'Mr' },
    { id: '2', value: 'Mme' },
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
  
  constructor(
    private fb: FormBuilder,
  ) {
    /*this.editForm =*/ this.fb.group({
      id: new FormControl(),
      img: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      gender: new FormControl(),
      dateNaissance: new FormControl(),
      gouvernorat: new FormControl(),
      photo: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
      rue: new FormControl(),
      delegation: new FormControl(),
      code: new FormControl(),
      genre: new FormBuilder(),
      Pgender: new FormBuilder(),
      role: new FormBuilder(),
    });
  }

  
  ngOnInit() {
    this.register = this.fb.group({
      id: [''],
      img: [''],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastName: [''],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dateNaissance:[''],
      gouvernorat:[''],
      photo:[''],
      login:['', [Validators.required]],
      password:['', [Validators.required]],
      rue: ['', [Validators.required]],
      delegation:['', [Validators.required]],
      code: ['', [Validators.required]],
      genre: [''],
      Pgender: [''],
      role: [''], 
    });
    
  }
}

