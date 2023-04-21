import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SectionNiveau} from './../models/sectionNiveau';
@Injectable({
  providedIn: 'root'
})
export class SectionNiveauService {
  list !: SectionNiveau[];
  private baseUrl = 'http://localhost:8000/SecNivAll';

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`);
  }
}
