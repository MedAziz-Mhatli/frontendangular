import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Eleve } from '../models/eleve';

@Injectable({
  providedIn: 'root'
})
export class ElevesService {

  Url_create_Eleve: string='http://localhost:8000/api/eleves';
  Url_read_Eleve: string='http://localhost:8000/api/eleves';
  Url_delete_Eleve: string='http://localhost:8000/api/eleves';
  Url_delete_Abonnement_par_Eleve: string='http://localhost:8000/DeleteAbonnement';

  constructor(private httpClient: HttpClient) { }

  public createEleve(eleve: Eleve) {
    return this.httpClient.post(`${this.Url_create_Eleve}`, eleve);
  }

  /*public createEleve(eleve: Object): Observable<Object> {
    return this.httpClient.post(`${this.Url_create_Eleve}`,eleve);
  }*/

  public getAllEleves()
  {
    //On peut remplacer any par notre model 
    let eleves = this.httpClient.get<any>(`${this.Url_read_Eleve}`);
    return eleves;
  }

  get(id: any): Observable<any> {
    return this.httpClient.get(`${this.Url_delete_Eleve}/${id}`);
  }

  deleteEleve(id: any): Observable<any> {
    return this.httpClient.delete(`${this.Url_delete_Eleve}/${id}`);
  }

  deleteAbonnementParEleve(id: any): Observable<any> {
    return this.httpClient.delete(`${this.Url_delete_Abonnement_par_Eleve}/${id}`);
  }




  

}
