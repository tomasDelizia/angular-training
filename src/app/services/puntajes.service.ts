import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Puntaje} from '../models/puntaje';
@Injectable()
export class PuntajesService {
  constructor(private http: HttpClient, private config: AppConfig) {
  }

  getPuntajes(): Observable<Puntaje[]> {
    return this.http.get<Puntaje[]>(`${this.config.apiUrl}/getPuntajes`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getPuntajesDeAlumno(cuil: string): Observable<Puntaje[]> {
    return this.http.get<Puntaje[]>(`${this.config.apiUrl}/getPuntajesDeAlumno/${cuil}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  registrarPuntaje(body: any): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/registrarPuntaje`, body).pipe(
      map((response) => {
        return response;
      })
    );
  }

  modificarPuntaje(idAlumno: number, idProfesor: number, idTema: number, body: any): Observable<any> {
    return this.http.post(
      `${this.config.apiUrl}/modificarPuntaje?idAlumno=${idAlumno}&idProfesor=${idProfesor}&idTema=${idTema}`, body)
      .pipe(
          map((response) => {
            return response;
          })
        );
  }

  eliminarPuntaje(idPuntaje: number): Observable<any> {
    return this.http.delete(
      `${this.config.apiUrl}/eliminarPuntaje/${idPuntaje}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
