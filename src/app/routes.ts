import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TemasComponent } from './components/temas/temas.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import {PuntajesComponent} from './components/puntajes/puntajes.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'temas', component: TemasComponent },
  { path: 'alumnos', component: AlumnosComponent },
  { path: 'puntajes', component: PuntajesComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
