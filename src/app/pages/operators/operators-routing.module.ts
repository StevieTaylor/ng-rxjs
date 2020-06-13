import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperatorsComponent } from './operators.component';
import { CreationComponent } from './creation/creation.component';
import { CombinationComponent } from './combination/combination.component';
import { FilteringComponent } from './filtering/filtering.component';
import { TransformationComponent } from './transformation/transformation.component';

const routes: Routes = [
  { path: 'category', component: OperatorsComponent },
  { path: 'creation', component: CreationComponent },
  { path: 'combination', component: CombinationComponent },
  { path: 'filtering', component: FilteringComponent },
  { path: 'transformation', component: TransformationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperatorsRoutingModule { }
