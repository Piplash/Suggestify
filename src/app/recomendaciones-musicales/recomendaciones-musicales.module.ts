import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioComponent } from './pages/inicio/inicio.component';
import { DescubreComponent } from './pages/descubre/descubre.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';

import { RecomendacionesMusicalesRoutingModule } from './recomendaciones-musicales-routing.module';



@NgModule({
  declarations: [
    InicioComponent,
    DescubreComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    RecomendacionesMusicalesRoutingModule,
  ]
})
export class RecomendacionesMusicalesModule { }
