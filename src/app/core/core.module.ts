import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  providers: [],
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwErrorIfModuleAlreadyLoaded(parentModule, 'CoreModule');
  }
}

// 当某模块已经加载时，抛出错误，以确保只加载一次
function throwErrorIfModuleAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded,Please import Core module in AppModule Only `);
  }
}
