import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthService} from "../core/service/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  url = 'http://localhost:8080/user';

  constructor(private http:HttpClient, private authService: AuthService) { 

  }
  getAll(){
    return this.http.get(`${this.url}/all`)
  }

  delete(id:any){
    return this.http.delete(`${this.url}/delete/${id}`)
  }

  getById(id:any){
    return this.http.get(`${this.url}/get/${id}`)
  }
  update(user:any){
    return this.http.put(`${this.url}/update`,user)
  }

  updateUser(user: any){
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.currentUserValue.accessToken}`
    })
    // @ts-ignore
    return this.http.put('http://localhost:8080/user/userEdit', user, headers);
  }
}
