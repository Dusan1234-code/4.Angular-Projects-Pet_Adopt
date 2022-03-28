import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdoptionsSearchList } from '../models/adoptions.search.list.model';
import { Adoption } from '../models/adoption.model';

const baseURL = 'http://localhost:3000/api/adoptions';

@Injectable({
  providedIn: 'root',
})
export class AdoptionService {
  constructor(private http: HttpClient) {}

  getAdoptions(): Observable<AdoptionsSearchList> {
    return this.http.get(`${baseURL}`).pipe(
      map((elem: any) => {
        return new AdoptionsSearchList(elem);
      })
    );
  }

  add(adoption: Adoption): Observable<any> {
    return this.http.post(`${baseURL}`, adoption);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${baseURL}/${id}`);
  }
}
