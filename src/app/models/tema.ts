export class Tema {
  idTema: number;
  nombre: string;
  descripcion: string;
  duracion: string;

  constructor(idTema: number, nombre: string, descripcion: string, duracion: string) {
    this.idTema = idTema;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.duracion = duracion;
  }
}
