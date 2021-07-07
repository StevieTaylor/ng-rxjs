/*
 * @Author: Stevie
 * @Date: 2021-07-07 16:06:36
 * @LastEditTime: 2021-07-07 16:19:09
 * @LastEditors: Stevie
 * @Description: 
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataNull'
})
export class DataNullPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value == undefined || value === '') {
      return '-';
    }
    return value;
  }

}
