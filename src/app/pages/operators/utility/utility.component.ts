/*
 * @Author: Stevie
 * @Date: 2021-07-02 17:59:06
 * @LastEditTime: 2021-07-08 15:41:43
 * @LastEditors: Stevie
 * @Description: utility
 */
import { Component, OnInit } from "@angular/core";
import { IOperator } from "./../../../shared/models/operator";
import { firstUpperCase } from "src/app/shared/utils/utils";
import { of, merge } from "rxjs";
import { mapTo, delay } from "rxjs/operators";

@Component({
  selector: "app-utility",
  templateUrl: "./utility.component.html",
  styleUrls: ["./utility.component.less"],
})
export class UtilityComponent implements OnInit {
  public utilityOperators: IOperator[] = [
    {
      key: 1,
      name: "do",
      signature: "",
      description: "",
    },
    {
      key: 2,
      name: "delay",
      signature: "",
      description: "",
    },
  ];

  constructor() { }

  ngOnInit() { }

  public useOperators(operatorName: string) {
    if (!operatorName) {
      return;
    }
    const func = `use${firstUpperCase(operatorName)}`;
    if (func && this[func]) {
      this[func]();
    }
  }

  useDo() {
    const source$ = of(1, 2, 3, 4, 5);
    source$.subscribe((value) => {
      console.log(value);
    });
  }

  useDelay() {
    const source$ = of(null);
    const message = merge(
      source$.pipe(delay(1000), mapTo("hello")),
      source$.pipe(delay(2000), mapTo("ni")),
      source$.pipe(delay(3000), mapTo("hao"))
    );
    message.subscribe((value) => {
      console.log(value);
    });
  }

  useToPromise() {

  }
}
