import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { Alumno } from 'src/app/models/alumno';
import { NgxSpinnerService } from 'ngx-spinner';
import {Reparticion} from '../../models/reparticion';
import {ReparticionesService} from '../../services/reparticiones.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
})
export class AlumnosComponent implements OnInit {
  mostrarRegistrar !: boolean;

  mostrarModificar !: boolean;

  public alumnos: Alumno[] = [];

  public reparticiones: Reparticion[] = [];

  @ViewChild('btnCerrar')
  private btnCerrar: ElementRef;

  formAlumno: FormGroup;

  private buildForm(): void {
    this.formAlumno = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(45)]],
      apellido: ['', [Validators.required, Validators.maxLength(45)]],
      cuil: ['', [Validators.required, Validators.maxLength(45), Validators.minLength(11)]],
      edad: ['', [Validators.required, Validators.max(150), Validators.min(1)]],
      reparticion: ['', Validators.required],
    });
  }

  get nombre(): AbstractControl {
    return this.formAlumno.get('nombre');
  }

  get apellido(): AbstractControl {
    return this.formAlumno.get('apellido');
  }

  get cuil(): AbstractControl {
    return this.formAlumno.get('cuil');
  }

  get edad(): AbstractControl {
    return this.formAlumno.get('edad');
  }

  get reparticion(): AbstractControl {
    return this.formAlumno.get('reparticion');
  }

  constructor(
    private alumnosService: AlumnosService,
    private reparticionesService: ReparticionesService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
    // Lectura reactiva del form:
    this.formAlumno.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(value => {
        console.log(value);
      });
  }

  ngOnInit(): void {
    this.buscarAlumnos();
    this.getReparticiones();
  }

  buscarAlumnos(): void {
    this.spinner.show();
    this.alumnosService.getAlumnos().subscribe(
      (data) => {
        this.alumnos = data;
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  getReparticiones(): void {
    this.reparticionesService.getReparticiones().subscribe(
        (data) => {
          this.reparticiones = data;
        },
        (error) => console.error(error)
      );
  }

  registrarAlumno(event: Event): void {
    event.preventDefault();
    if (this.formAlumno.valid) {
      this.alumnosService.registrarAlumno(this.formAlumno.value).subscribe(
        (data) => {
          console.log(data);
          if (data) {
            alert('Alumno añadido con éxito');
            this.cerrarForm();
            this.buscarAlumnos();
          }
          else {
            alert('Ocurrió un error');
          }
        },
        (error) => {
          console.error(error);
          alert('Ocurrió un error');
        }
      );
    }
    else {
      this.formAlumno.markAllAsTouched();
    }
  }

  cerrarForm(): void {
    this.btnCerrar.nativeElement.click();
  }

  onClickRegistrar(): void {
    this.formAlumno.reset();
    this.mostrarRegistrar = true;
    this.mostrarModificar = false;
    this.cuil.enable();
  }

  onClickModificar(alumno: any): void {
    this.mostrarRegistrar = false;
    this.mostrarModificar = true;
    this.formAlumno.controls.apellido.setValue(alumno.apellido);
    this.formAlumno.controls.nombre.setValue(alumno.nombre);
    this.formAlumno.controls.cuil.setValue(alumno.cuil);
    this.formAlumno.controls.edad.setValue(alumno.edad);
    this.formAlumno.controls.reparticion.setValue(alumno.reparticion);
    this.cuil.disable();
  }

  onClickBorrar(alumno: any): void {
    if (confirm('Estás seguro que desear eliminar al alumno ' + alumno.nombre + ' ' + alumno.apellido)) {
      this.alumnosService.eliminarAlumno(
        alumno.cuil)
        .subscribe(
          (data) => {
            console.log(data);
            alert('Alumno eliminado con éxito');
            this.buscarAlumnos();
          },
          error => {
            alert('Ocurrió un error');
          });
    }
  }

  modificarAlumno(event: Event): void {
    event.preventDefault();
    if (this.formAlumno.valid) {
      const value = this.formAlumno.value;
      this.alumnosService.modificarAlumno(
        this.cuil.value,
        value)
        .subscribe(
          (data) => {
            console.log(data);
            alert('Alumno modificado con éxito');
            this.cerrarForm();
            this.buscarAlumnos();
          },
          error => {
            alert('Ocurrió un error');
          });
    }
    else {
      this.formAlumno.markAllAsTouched();
    }
  }
}
