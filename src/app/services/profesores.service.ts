import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Profesor} from '../models/profesor';
@Injectable()
export class ProfesoresService {
  constructor(private http: HttpClient, private config: AppConfig) {
  }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${this.config.apiUrl}/getProfesores`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
