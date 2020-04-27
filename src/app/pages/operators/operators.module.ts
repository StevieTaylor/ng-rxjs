import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { OperatorsRoutingModule } from './operators-routing.module';
import { OperatorsComponent } from './operators.component';
import { CreationComponent } from './creation/creation.component';
import { CombinationComponent } from './combination/combination.component';

const COMPONENTS = [
  OperatorsComponent,
  CreationComponent,
  CombinationComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    OperatorsRoutingModule
  ]
})
export class OperatorsModule { }
