import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recomendaciones-musicales',
    loadChildren: () => import('./recomendaciones-musicales/recomendaciones-musicales.module').then(m=>m.RecomendacionesMusicalesModule)
  },
  {
    path: '**',
    redirectTo: 'recomendaciones-musicales'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
