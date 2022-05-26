import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Tema} from '../models/tema';
@Injectable()
export class TemasService {
  constructor(private http: HttpClient, private config: AppConfig) {
  }

  getTemas(): Observable<Tema[]> {
    return this.http.get<Tema[]>(`${this.config.apiUrl}/getTemas`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
