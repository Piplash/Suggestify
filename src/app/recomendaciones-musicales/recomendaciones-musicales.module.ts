import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './pages/inicio/inicio.component';
import { DescubreComponent } from './pages/descubre/descubre.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { PrivacidadComponent } from './pages/privacidad/privacidad.component';

import { RecomendacionesMusicalesRoutingModule } from './recomendaciones-musicales-routing.module';




@NgModule({
  declarations: [
    InicioComponent,
    DescubreComponent,
    ResultadosComponent,
    AcercaDeComponent,
    PrivacidadComponent
  ],
  imports: [
    CommonModule,
    RecomendacionesMusicalesRoutingModule,
  ]
})
export class RecomendacionesMusicalesModule { }
