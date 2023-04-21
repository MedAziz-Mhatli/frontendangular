import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddresseService {

  Url_Gouvernorat: string ='http://localhost:8000/Gouvernorat';
  Url_Delegation_parGouvernorat: string='http://localhost:8000/Delegation';
  Url_localite_parGouvernorat: string='http://localhost:8000/Localite';
  Url_codePostal_parLocalite: string='http://localhost:8000/codePostal';

  constructor(private http :HttpClient) { }
  public getGouvernoratFromDataBase()
  {
    //On peut remplacer any par notre model 
    let gouvernorat = this.http.get<any>(`${this.Url_Gouvernorat}`);
    return gouvernorat;
  }

  public getDelegationParGouvernoratFromDataBase(id:any): Observable<any>
  {
    return this.http.get(`${this.Url_Delegation_parGouvernorat}/${id}`);
  }

  public getLocaliteParDelegationFromDataBase(id:any): Observable<any>
  {
    return this.http.get(`${this.Url_localite_parGouvernorat}/${id}`);
  }

  
  public getCodePostalParLocaliteFromDataBase(id:any): Observable<any>
  {
    return this.http.get(`${this.Url_codePostal_parLocalite}/${id}`);
  }

}
