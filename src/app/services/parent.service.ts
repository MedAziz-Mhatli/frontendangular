import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Parents } from '../models/parents';

@Injectable({
  providedIn: 'root'
})

export class ParentService {

  Url_create_Parent: string='http://localhost:8000/api/parents';

  constructor(private httpClient: HttpClient) { }
  
  public createParent(parent: Parents) {
    return this.httpClient.post(`${this.Url_create_Parent}`,parent);
  }
}
