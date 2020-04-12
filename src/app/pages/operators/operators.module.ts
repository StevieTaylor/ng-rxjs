import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { OperatorsRoutingModule } from './operators-routing.module';
import { OperatorsComponent } from './operators.component';

const COMPONENTS = [
  OperatorsComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    OperatorsRoutingModule
  ]
})
export class OperatorsModule { }
