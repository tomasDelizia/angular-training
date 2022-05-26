import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { map } from 'rxjs/operators';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';
@Injectable()
export class AlumnosService {
  constructor(private http: HttpClient, private config: AppConfig) {
  }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.config.apiUrl}/getAlumnos`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  registrarAlumno(body: any): Observable<any> {
    return this.http.post(`${this.config.apiUrl}/crearAlumno`, body).pipe(
      map((response) => {
        return response;
      })
    );
  }

  modificarAlumno(cuil: string, body: any): Observable<any> {
    return this.http.post(
      `${this.config.apiUrl}/modificarAlumno/${cuil}`, body)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  eliminarAlumno(cuil: string): Observable<any> {
    return this.http.delete(
      `${this.config.apiUrl}/eliminarAlumno/${cuil}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
