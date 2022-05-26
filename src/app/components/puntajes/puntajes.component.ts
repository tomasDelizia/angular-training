import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {PuntajesService} from '../../services/puntajes.service';
import {Puntaje} from '../../models/puntaje';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {Alumno} from '../../models/alumno';
import {AlumnosService} from '../../services/alumnos.service';
import {Profesor} from '../../models/profesor';
import {ProfesoresService} from '../../services/profesores.service';
import {Tema} from '../../models/tema';
import {TemasService} from '../../services/temas.service';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.component.html',
  styleUrls: ['./puntajes.component.css']
})
export class PuntajesComponent implements OnInit {
  mostrarRegistrar !: boolean;

  mostrarModificar !: boolean;

  puntajes: Puntaje[] = [];

  formPuntaje: FormGroup;

  alumnos: Alumno[] = [];

  profesores: Profesor[] = [];

  temas: Tema[] = [];

  formFiltro: FormGroup;

  @ViewChild('btnCerrar')
  private btnCerrar: ElementRef;

  private buildForm(): void {
    this.formPuntaje = this.fb.group({
      alumno: ['', Validators.required],
      profesor: ['', Validators.required],
      tema: ['', Validators.required],
      interes: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      complejidad: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      entendimiento: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      valoracion: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      observaciones: ['', [Validators.maxLength(500)]]
    });
    this.formFiltro = this.fb.group({
      alumnoFiltro: ['', Validators.required]
    });
    this.actualizarGrilla();
  }

  get alumno(): AbstractControl {
    return this.formPuntaje.get('alumno');
  }

  get profesor(): AbstractControl {
    return this.formPuntaje.get('profesor');
  }

  get tema(): AbstractControl {
    return this.formPuntaje.get('tema');
  }

  get interes(): AbstractControl {
    return this.formPuntaje.get('interes');
  }

  get complejidad(): AbstractControl {
    return this.formPuntaje.get('complejidad');
  }

  get entendimiento(): AbstractControl {
    return this.formPuntaje.get('entendimiento');
  }

  get valoracion(): AbstractControl {
    return this.formPuntaje.get('valoracion');
  }

  get observaciones(): AbstractControl {
    return this.formPuntaje.get('observaciones');
  }

  get alumnoFiltro(): AbstractControl {
    return this.formFiltro.get('alumnoFiltro');
  }

  actualizarGrilla(): void {
    this.alumnoFiltro.valueChanges.subscribe(
      value => {
        this.getPuntajesDeAlumno();
      }
    );
  }

  constructor(private spinner: NgxSpinnerService,
              private fb: FormBuilder,
              private puntajesService: PuntajesService,
              private alumnosService: AlumnosService,
              private profesoresService: ProfesoresService,
              private temasService: TemasService) {
    this.buildForm();
    // Lectura reactiva del form:
    this.formPuntaje.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        console.log(value);
      });
  }

  ngOnInit(): void {
    this.getPuntajes();
    this.getAlumnos();
    this.getProfesores();
    this.getTemas();
  }

  getPuntajes(): void {
    this.spinner.show();
    this.alumnoFiltro.reset();
    this.puntajesService.getPuntajes().subscribe(
      (data) => {
        this.puntajes = data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  getPuntajesDeAlumno(): void {
    this.spinner.show();
    const cuil = this.alumnoFiltro.value;
    this.puntajesService.getPuntajesDeAlumno(cuil).subscribe(
      (data) => {
        this.puntajes = data;
        console.log(data);
        this.spinner.hide();
      },
      (error) => {
        this.puntajes = [];
        console.log(error);
        this.spinner.hide();
        // alert('No se han encontrado puntajes del alumno solicitado');
      }
    );
  }

  private getAlumnos(): void {
    this.alumnosService.getAlumnos().subscribe(
      (data) => {
        this.alumnos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getProfesores(): void {
    this.profesoresService.getProfesores().subscribe(
      (data) => {
        this.profesores = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private getTemas(): void {
    this.temasService.getTemas().subscribe(
      (data) => {
        this.temas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClickRegistrar(): void {
    this.formPuntaje.reset();
    this.mostrarRegistrar = true;
    this.mostrarModificar = false;
    this.alumno.enable();
    this.profesor.enable();
    this.tema.enable();
  }

  registrarPuntaje(event: Event): void {
    // Evito recargar página con preventDefault().
    event.preventDefault();
    if (this.formPuntaje.valid) {
      const value = this.formPuntaje.value;
      this.puntajesService.registrarPuntaje(value).subscribe(
        (data) => {
        console.log(data);
        alert('Puntaje añadido con éxito');
        this.cerrarForm();
        this.getPuntajes();
      },
        error => {
          console.error(error);
          alert('Ocurrió un error');
        });
    }
    else {
      this.formPuntaje.markAllAsTouched();
    }
  }

  cerrarForm(): void {
    this.btnCerrar.nativeElement.click();
  }

  onClickModificar(puntaje: any): void {
    this.mostrarRegistrar = false;
    this.mostrarModificar = true;
    this.alumno.disable();
    this.profesor.disable();
    this.tema.disable();
    this.formPuntaje.controls.alumno.setValue(puntaje.idAlumno);
    this.formPuntaje.controls.profesor.setValue(puntaje.idProfesor);
    this.formPuntaje.controls.tema.setValue(puntaje.idTema);
    this.formPuntaje.controls.interes.setValue(puntaje.interes);
    this.formPuntaje.controls.complejidad.setValue(puntaje.complejidad);
    this.formPuntaje.controls.entendimiento.setValue(puntaje.entendimiento);
    this.formPuntaje.controls.valoracion.setValue(puntaje.valoracion);
    this.formPuntaje.controls.observaciones.setValue(puntaje.observaciones);
  }

  modificarPuntaje(event: Event): void {
    event.preventDefault();
    if (this.formPuntaje.valid) {
      const value = this.formPuntaje.value;
      this.puntajesService.modificarPuntaje(
        this.alumno.value,
        this.profesor.value,
        this.tema.value,
        value)
        .subscribe(
          (data) => {
          console.log(data);
          alert('Puntaje modificado con éxito');
          this.cerrarForm();
          this.getPuntajes();
        },
        error => {
          alert('Ocurrió un error');
        });
    }
    else {
      this.formPuntaje.markAllAsTouched();
    }
  }

  onClickBorrar(puntaje: any): void {
    if (confirm('Estás seguro que desear eliminar el puntaje #' + puntaje.idPuntaje)) {
      this.puntajesService.eliminarPuntaje(
        puntaje.idPuntaje)
        .subscribe(
          (data) => {
            console.log(data);
            alert('Alumno eliminado con éxito');
            this.getPuntajes();
          },
          error => {
            alert('Ocurrió un error');
          });
    }
  }
}
