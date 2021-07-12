import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { OperatorsRoutingModule } from './operators-routing.module';
import { OperatorsComponent } from './operators.component';
import { CreationComponent } from './creation/creation.component';
import { CombinationComponent } from './combination/combination.component';
import { FilteringComponent } from './filtering/filtering.component';
import { TransformationComponent } from './transformation/transformation.component';
import { UtilityComponent } from './utility/utility.component';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';

const COMPONENTS = [
  OperatorsComponent,
  CreationComponent,
  CombinationComponent,
  FilteringComponent,
  TransformationComponent,
  UtilityComponent,
  ErrorHandlingComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    OperatorsRoutingModule
  ]
})
export class OperatorsModule { }
