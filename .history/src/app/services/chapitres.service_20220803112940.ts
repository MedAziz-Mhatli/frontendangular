import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapitres } from '../models/Chapitres';
@Injectable({
  providedIn: 'root'
})
export class ChapitresService {
  list !: Chapitres[];
  private baseUrl = 'http://localhost:8000/api/chapitres';
  private baseUrlNbChapitreParMatiere = 'http://localhost:8000/getNumberChapitresParMatiere';
  private UrlChapitreParMatiere ='http://localhost:8000/ChapitreParMatiere';
  private UrlTypeCours ='http://localhost:8000/api/type_cours';
  private Url = 'http://localhost:8000/api/chapitres';

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }
  getNbChapitre(): Observable<any> {
    return this.httpClient.get(`${this.baseUrlNbChapitreParMatiere}`);
  }
  getTypesCours(): Observable<any> {
    return this.httpClient.get(`${this.UrlTypeCours}`);
  }
  getChapitreParMatiere(matiereId:string): Observable<any> {
    return this.httpClient.get(`${this.UrlChapitreParMatiere}/${matiereId}`);
  }
  public details(matiereId:string){
    return this.httpClient.get(`${this.Url}/${matiereId}`);
  }
}
