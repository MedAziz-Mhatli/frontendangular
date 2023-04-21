import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from 'src/app/models/test';
import {TestService} from 'src/app/services/test.service';

@Component({
  selector: 'app-example-form',
  templateUrl: './example-form.component.html',
  styleUrls: ['./example-form.component.sass']
})

export class ExampleFormComponent implements OnInit {
  id!:number;
  test:Test;

  registerExemple:FormGroup;
  constructor( private fb: FormBuilder,
    private router:Router,
    private route: ActivatedRoute,
    private testService :TestService)
   { }
   
  ngOnInit(): void {


    this.registerExemple = this.fb.group({
      nomTest: [],
      prenomTest: []
    });
  }

  addTest()
  {
    this.testService.createTest(this.registerExemple.value)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
    
    });
  }

  getForm() 
  { 
    return this.registerExemple.controls;
   }
  
  onSubmit():void {
    this.addTest();
 
}

}

