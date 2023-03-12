import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CityStreets } from '../models/city-streets.model';

@Injectable({
  providedIn: 'root',
})
export class CityStreetsService {
  private readonly apiUrl = 'https://localhost:7248/api/CityStreets';

  constructor(private readonly http: HttpClient) {}

  get(): Observable<CityStreets[]> {
    return this.http.get<CityStreets[]>(this.apiUrl);
  }
}
