import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  Url_Test: string ='http://localhost:8000/api/tests';
  constructor(private http :HttpClient) { }
  /*public createTest(test: Test) {
    return this.http.post(this.Url_Test, test);
  }*/

  public createTest(test: Object): Observable<Object> {
    return this.http.post(`${this.Url_Test}`, test);
  }
  
}
