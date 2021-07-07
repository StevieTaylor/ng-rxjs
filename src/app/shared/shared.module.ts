// angular
import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// third party
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { IconsProviderModule } from './icons-provider/icons-provider.module';

// pipes
import { DataNullPipe } from './pipes/data-null.pipe';

const THIRDPARTYMODULE = [NgZorroAntdModule, IconsProviderModule];
const PIPES = [DataNullPipe];

@NgModule({
  declarations: [...PIPES],
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
    ...THIRDPARTYMODULE,
    ...PIPES
  ]
})
export class SharedModule { }
