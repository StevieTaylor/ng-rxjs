import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatorsComponent } from './operators.component';
import { CombinationComponent } from './combination/combination.component';

const routes: Routes = [
  { path: 'category', component: OperatorsComponent },
  { path: 'combination', component: CombinationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorsRoutingModule { }
