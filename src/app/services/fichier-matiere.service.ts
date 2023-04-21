import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FichierMatiere } from '../models/FichierMatiere';

@Injectable({
  providedIn: 'root'
})
export class FichierMatiereService {
  //list !: FichierMatiere[];
  private baseUrlEnreg = 'http://localhost:8000/getEnregistrements';
  private baseUrlExamens = 'http://localhost:8000/getExamens';
  private baseUrlDivers = 'http://localhost:8000/getDivers';
  
  constructor(private httpClient: HttpClient) { }
  getEnregistrements(matiereId:string): Observable<any> {
    return this.httpClient.get(`${this.baseUrlEnreg}/${matiereId}`);
  }
  getExamens(matiereId:string): Observable<any> {
    return this.httpClient.get(`${this.baseUrlExamens}/${matiereId}`);
  }
  getDivers(matiereId:string): Observable<any> {
    return this.httpClient.get(`${this.baseUrlDivers}/${matiereId}`);
  }
}
