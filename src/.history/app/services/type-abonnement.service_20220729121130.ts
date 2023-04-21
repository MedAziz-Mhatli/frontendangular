import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TypeAbonnementService {

  Url_Type_Abonnement: string ='http://localhost:8000/Pack';
  constructor(private http :HttpClient) { }
  public getTypeAbonnementFromDataBase()
  {
    //On peut remplacer any par notre model 
    let pack = this.http.get<any>(`${this.Url_Type_Abonnement}`);
    return pack;
  }

}
