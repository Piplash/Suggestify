import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { DescubreComponent } from './pages/descubre/descubre.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecomendacionesMusicalesRoutingModule { }
