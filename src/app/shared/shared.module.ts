// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// third party
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconsProviderModule } from './icons-provider/icons-provider.module';

const THIRDPARTYMODULE = [NgZorroAntdModule, IconsProviderModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...THIRDPARTYMODULE
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ...THIRDPARTYMODULE
  ]
})
export class SharedModule { }
