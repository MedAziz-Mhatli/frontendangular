import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';
import { Produit } from '../models/Produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private baseUrl = 'http://localhost:8082/SpringPi/produit';

  constructor(private http: HttpClient) { }

  addProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.baseUrl}/add-Produit`, produit);
  }

  updateCategorie(categorie: Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.baseUrl}/update-Produit`, categorie);
  }

  deleteCategorie(id_categorie: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id_categorie}`);
  }

  getAllProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(`${this.baseUrl}/retrieve-all-Produits`);
  }

  getProduit(id_categorie: number): Observable<Produit> {
    return this.http.get<Produit>(`${this.baseUrl}/retrieve-produit/${id_categorie}`);
  }
}
