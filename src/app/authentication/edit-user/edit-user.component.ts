import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {

  user:any={}
  editForm:FormGroup
  id:any

  constructor(private formBuilder:FormBuilder,
    private user_service:UserServiceService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.editForm=this.formBuilder.group({
      fullname:[''],
      username:[''],
      adresse:['']
    })
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.user_service.getById(this.id).subscribe(data=>{
      this.user=data
      console.log(data);
      
    })
  }
  edit(){
    console.log(this.user);
      this.user_service.update(this.user).subscribe(data=>{
      console.log(data);
      
    })

  }

}
