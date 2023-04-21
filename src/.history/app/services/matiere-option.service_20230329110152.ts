import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereOptionService {

  Url_Matiere_Option: string ='http://localhost:8000/OptionMatiere';
  
  constructor(private http :HttpClient) { }
  public getOptionMatiereFromDataBase()
  {
    //On peut remplacer any par notre model 
    let option = this.http.get<any>(`${this.Url_Matiere_Option}`);
    return option;
  }
}
