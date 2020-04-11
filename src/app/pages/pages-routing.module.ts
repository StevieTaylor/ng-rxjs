import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
// components
const pageRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    ]
  },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(pageRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
