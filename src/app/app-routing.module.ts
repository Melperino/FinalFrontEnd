import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { Top5Component } from './pages/top5/top5.component';
import { HistogramaComponent } from './pages/histograma/histograma.component';
import { AuthGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard] },
  {
    path: 'top5',
    component: Top5Component,
    canActivate: [AuthGuard],
    data: { roles: ['Pie'] }
  },
  {
    path: 'histograma',
    component: HistogramaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Barras'] }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
export const routing = RouterModule.forRoot(routes);
