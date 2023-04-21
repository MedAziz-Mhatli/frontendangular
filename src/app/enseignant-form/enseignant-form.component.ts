import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-enseignant-form',
  templateUrl: './enseignant-form.component.html',
  styleUrls: ['./enseignant-form.component.sass']
})
export class EnseignantFormComponent implements OnInit {
  public showPassword: boolean;
  register: FormGroup;

  genders = [
    { id: '1', value: 'Mr' },
    { id: '2', value: 'Mme' },
  ];

  matiereType=[
    {id:'1',value:'Math'},
    {id:'2',value:'Physiques'},
    {id:'3',value:'Sciences naturelles'},
    {id:'4',value:'Arabe'},
    {id:'5',value:'Français'},
    {id:'6',value:'Anglais'},
    {id:'8',value:'Philosophie'},
    {id:'9',value:'Techniques'},
    {id:'10',value:'Informatique'},
    {id:'11',value:'Gestion'},
    {id:'12',value:'Economie'},

  ]

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
    /*this.editForm = */this.fb.group({
      id: new FormControl(),
      img: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      gender: new FormControl(),
      grade: new FormControl(),
      phone: new FormControl(),
      email: new FormControl(),
      photo: new FormControl(),
      matiere: new FormControl(),
      address: new FormControl(),
      login: new FormControl(),
      password: new FormControl(),
      gouvernorat:new FormControl(),
      rue:new FormControl(),
      delegation:new FormControl(),
      code:new FormControl(),
      dateNaissance: new FormControl(),

    });
  }
  
  ngOnInit() {
    this.register = this.fb.group({
      id: [''],
      img: [''],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      lastName: [''],
      gender:[''],
      grade: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      matiere: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      photo: [''],
      address: [''],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      gouvernorat:[''],
      rue:[''],
      delegation:[''],
      code:[''],
      dateNaissance:[''],
    });
  }
}


