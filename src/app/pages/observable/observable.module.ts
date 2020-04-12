import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { ObservableRoutingModule } from './observable-routing.module';
import { ObservableComponent } from './observable.component';

@NgModule({
  declarations: [ObservableComponent],
  imports: [
    SharedModule,
    ObservableRoutingModule
  ]
})
export class ObservableModule { }
