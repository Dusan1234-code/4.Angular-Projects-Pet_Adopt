import { Pet } from './../models/pet.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PetsSearchList } from '../models/pets.search.list.model';

const baseURL = 'http://localhost:3000/api/pets';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  constructor(private http: HttpClient) {}

  getPets(params?: any): Observable<PetsSearchList> {
    let queryParams = {};

    if (params) {
      queryParams = {
        params: new HttpParams()
          .set('sort', params.sort || '')
          .set(
            'filter',
            (params.filter && JSON.stringify(params.filter)) || ''
          ),
      };
    }

    return this.http.get(`${baseURL}`, queryParams).pipe(
      map((elem: any) => {
        return new PetsSearchList(elem);
      })
    );
  }

  getPetsById(petId: number): Observable<Pet> {
    return this.http.get(`${baseURL}/${petId}`).pipe(
      map((elem: any) => {
        return new Pet(elem);
      })
    );
  }
}
