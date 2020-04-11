import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';

// components

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
