import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TemasComponent } from './components/temas/temas.component';
import { AlumnosComponent } from './components/alumnos/alumnos.component';
import { AlumnosService } from './services/alumnos.service';
import { HttpClientModule } from '@angular/common/http';
import { AppConfig } from './app.config';
import { DestacarDirective } from './directives/destacar.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ReparticionesService} from './services/reparticiones.service';
import { PuntajesComponent } from './components/puntajes/puntajes.component';
import {PuntajesService} from './services/puntajes.service';
import {ProfesoresService} from './services/profesores.service';
import {TemasService} from './services/temas.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TemasComponent,
    AlumnosComponent,
    DestacarDirective,
    PuntajesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AlumnosService, ReparticionesService, PuntajesService, ProfesoresService, TemasService, AppConfig],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
