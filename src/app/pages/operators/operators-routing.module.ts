import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatorsComponent } from './operators.component';
import { CreationComponent } from './creation/creation.component';

const routes: Routes = [
  { path: 'category', component: OperatorsComponent },
  { path: 'creation', component: CreationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorsRoutingModule { }
