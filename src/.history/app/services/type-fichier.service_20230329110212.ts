import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeFichierMatiere } from '../models/TypeFichierMatiere';
import { Matieres } from '../models/Matieres';

@Injectable({
  providedIn: 'root'
})
export class TypeFichierService {
  public readonly matiere$: Observable<Matieres>;
  list !: TypeFichierMatiere[];
  private baseUrl = 'http://localhost:8000/api/type_fichier_matieres';

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }
}

