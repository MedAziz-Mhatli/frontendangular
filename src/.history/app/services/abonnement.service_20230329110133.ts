import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Abonnement } from '../models/abonnement';

@Injectable({
  providedIn: 'root'
})
export class AbonnementService {

  Url_create_Abonnement: string='http://localhost:8000/api/abonnements';
  
  constructor(private httpClient: HttpClient) { }

  public createAbonnement(abonnement: Abonnement) {
    return this.httpClient.post(`${this.Url_create_Abonnement}`,abonnement);
  }

}
