import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatorsComponent } from './operators.component';
import { CreationComponent } from './creation/creation.component';
import { CombinationComponent } from './combination/combination.component';
import { FilteringComponent } from './filtering/filtering.component';

const routes: Routes = [
  { path: 'category', component: OperatorsComponent },
  { path: 'creation', component: CreationComponent },
  { path: 'combination', component: CombinationComponent },
  { path: 'filtering', component: FilteringComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorsRoutingModule { }
