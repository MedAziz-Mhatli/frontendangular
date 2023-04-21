import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Matieres} from './../models/Matieres';
const baseUrl= 'http://localhost:8000/matieresAll';
@Injectable({
  providedIn: 'root'
})
export class MatieresService {
 private baseUrl = 'http://localhost:8000/matieresAll';
 private baseUrl1 = 'http://localhost:8000/getAll';
  private Url = 'http://localhost:8000/api/matieres';
  private urll='http://localhost:8000/Matiere';
  list !: Matieres[];
  

  
  constructor(private httpClient: HttpClient) { 
   
  }

getAll(): any {
  return this.httpClient.get(`${this.baseUrl}`);
}
       
getAll1(): any {
  return this.httpClient.get(`${this.baseUrl1}`);
}
public details(matiereId:string){
  return this.httpClient.get(`${this.Url}/${matiereId}`);
}
 
}
