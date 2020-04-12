import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservableComponent } from './observable.component';
import { ObservableVsPromiseComponent } from './observable-vs-promise/observable-vs-promise.component';

const routes: Routes = [
  { path: 'example', component: ObservableComponent },
  { path: 'observable-vs-promise', component: ObservableVsPromiseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservableRoutingModule { }
