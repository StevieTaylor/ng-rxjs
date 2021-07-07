/*
 * @Author: Stevie
 * @Date: 2021-07-02 17:59:06
 * @LastEditTime: 2021-07-07 14:59:25
 * @LastEditors: Stevie
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { IOperator } from './../../../shared/models/operator';
import { of } from 'rxjs';

@Component({
  selector: 'app-utility',
  templateUrl: './utility.component.html',
  styleUrls: ['./utility.component.less']
})
export class UtilityComponent implements OnInit {

  public utilityOperators: IOperator[] = [
    {
      key: 1,
      name: 'do',
      signature: '',
      description: ''
    },
    {
      key: 2,
      name: 'delay',
      signature: '',
      description: ''
    },
  ]

  constructor() { }

  ngOnInit() {
    this.useDo();
  }

  public useOperators(operatorName: string) {

  }

  private useDo() {
    const source = of(1, 2, 3, 4, 5);
    console.log(`source`, source)
    source.subscribe((res) => {
      console.log(`res`, res)
    })
  }
}
