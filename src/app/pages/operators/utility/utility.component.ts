/*
 * @Author: Stevie
 * @Date: 2021-07-02 17:59:06
 * @LastEditTime: 2021-07-12 15:52:06
 * @LastEditors: Stevie
 * @Description: utility
 */
import { Component, OnInit } from "@angular/core";
import { IOperator } from "./../../../shared/models/operator";
import { firstUpperCase } from "src/app/shared/utils/utils";
import { of, merge, fromEvent, interval } from "rxjs";
import {
  mapTo,
  tap,
  delay,
  map,
  debounceTime,
  timeInterval,
  timeout,
} from "rxjs/operators";

@Component({
  selector: "app-utility",
  templateUrl: "./utility.component.html",
  styleUrls: ["./utility.component.less"],
})
export class UtilityComponent implements OnInit {
  public utilityOperators: IOperator[] = [
    {
      key: 1,
      name: "tap",
      signature:
        "tap(nextOrObserver: function, error: function, complete: function): Observable",
      description: "透明地执行操作或副作用，比如打印日志",
    },
    {
      key: 2,
      name: "delay",
      signature:
        "delay(delay: number | Date, scheduler: Scheduler): Observable",
      description: "按照指定时间之后发出值",
    },
    {
      key: 3,
      name: "timeInterval",
      signature: "timeInterval(scheduler: SchedulerLike): Observable<TimeInterval<any>> | WebSocketSubject<T> | Observable<T>",
      description: "",
    },
    {
      key: 4,
      name: "timeout",
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

  useTap() {
    const clicks$ = fromEvent(document, "click");
    const postions = clicks$.pipe(
      tap((e: MouseEvent) => console.log("event:", e)),
      map((e: MouseEvent) => e.clientX),
      debounceTime(500)
    );
    postions.subscribe((value) => {
      console.log("clientX:", value);
    });
  }

  useDelay() {
    const source$ = of(null);
    const message = merge(
      source$.pipe(mapTo("delay 1s"), delay(1000)),
      source$.pipe(mapTo("delay 2s"), delay(2000)),
      source$.pipe(mapTo("delay 3s"), delay(3000))
    );
    message.subscribe((value) => {
      console.log(value);
    });
  }

  useTimeInterval() {
    const events$ = fromEvent(document, "mousedown");
    events$
      .pipe(timeInterval(), tap(console.log))
      .subscribe((value: { interval: number; value: MouseEvent }) =>
        console.log("time interval before last click", value.interval)
      );
  }

  useTimeout() {
    const seconds$ = interval(1000);
    seconds$.pipe(
      timeout(5000)
    ).subscribe(
      value => console.log(value)
    )
  }
}
