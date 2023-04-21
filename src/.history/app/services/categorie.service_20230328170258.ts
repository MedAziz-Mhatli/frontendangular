import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost:8082/categorie';

  constructor(private http: HttpClient) { }

  addCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.baseUrl}/add-Categorie`, categorie);
  }

  updateCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.baseUrl}/update-Categorie`, categorie);
  }

  deleteCategorie(idCategorie: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idCategorie}`);
  }

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl}/retrieve-all-categories`);
  }

  getCategorie(idCategorie: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.baseUrl}/retrieve-categorie/${idCategorie}`);
  }
}
