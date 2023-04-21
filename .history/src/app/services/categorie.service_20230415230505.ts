import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:8082/SpringPi/categorie';

  constructor(private http: HttpClient) { }

  addCategorie(formData: FormData, httpOptions: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/add-Categorie', formData, httpOptions);
  }
  
 updateCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<any>(`${this.baseUrl}/update-Categorie`, formData, httpOptions);
  }
  //updateCategorie(categorie: Categorie): Observable<Categorie> {
    //return this.http.put<Categorie>(`${this.baseUrl}/update-Categorie`, categorie);
  //}

  deleteCategorie(id_categorie: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id_categorie}`);
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl}/retrieve-all-categories`);
  }

  getCategorie(id_categorie: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.baseUrl}/retrieve-categorie/${id_categorie}`);
  }
}
