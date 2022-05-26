import {Alumno} from './alumno';
import {Profesor} from './profesor';
import {Tema} from './tema';

export class Puntaje {
  idPuntaje: number;
  alumno: Alumno;
  profesor: Profesor;
  tema: Tema;
  interes: number;
  complejidad: number;
  entendimiento: number;
  valoracion: number;
  observaciones: string;

  constructor(idPuntaje: number,
              alumno: Alumno,
              profesor: Profesor,
              tema: Tema,
              interes: number,
              complejidad: number,
              entendimiento: number,
              valoracion: number,
              observaciones: string) {
    this.idPuntaje = idPuntaje;
    this.alumno = alumno;
    this.profesor = profesor;
    this.tema = tema;
    this.interes = interes;
    this.complejidad = complejidad;
    this.entendimiento = entendimiento;
    this.valoracion = valoracion;
    this.observaciones = observaciones;
  }
}
