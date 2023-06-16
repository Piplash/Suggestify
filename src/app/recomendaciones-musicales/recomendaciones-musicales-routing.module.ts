import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DescubreComponent } from './pages/descubre/descubre.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { PrivacidadComponent } from './pages/privacidad/privacidad.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'descubre',
    component: DescubreComponent
  },
  {
    path: 'resultados',
    component: ResultadosComponent
  },
  {
    path: 'acerca-de',
    component: AcercaDeComponent
  },
  {
    path: 'privacidad',
    component: PrivacidadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecomendacionesMusicalesRoutingModule { }
