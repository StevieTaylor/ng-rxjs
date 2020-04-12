import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { ObservableRoutingModule } from './observable-routing.module';
import { ObservableComponent } from './observable.component';
import { ObservableVsPromiseComponent } from './observable-vs-promise/observable-vs-promise.component';

const COMPONENTS = [
  ObservableComponent,
  ObservableVsPromiseComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    SharedModule,
    ObservableRoutingModule
  ]
})
export class ObservableModule { }
