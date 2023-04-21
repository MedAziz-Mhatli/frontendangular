import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {
  Url_NiveauComplet: string='http://localhost:8000/Section Niveau';
  
  constructor(private http :HttpClient) {}
  public getNiveauSectionFromDataBase()
  {
    let section=this.http.get<any>(`${this.Url_NiveauComplet}`);
    return section;
  }
  
  

}
