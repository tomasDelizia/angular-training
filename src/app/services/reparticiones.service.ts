import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Reparticion} from '../models/reparticion';

@Injectable()
export class ReparticionesService {
  constructor(private http: HttpClient, private config: AppConfig) {}

  getReparticiones(): Observable<Reparticion[]> {
    return this.http.get<Reparticion[]>(`${this.config.apiUrl}/getReparticiones`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
