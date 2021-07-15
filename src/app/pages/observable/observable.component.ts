/*
 * @Author: Stevie
 * @Date: 2021-07-02 14:44:35
 * @LastEditTime: 2021-07-15 21:01:23
 * @LastEditors: Stevie
 * @Description:
 */
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  Observable,
  Observer,
  Subscriber,
  Subscription,
  from,
  fromEvent,
  Subject,
  asyncScheduler,
} from "rxjs";
import { map, debounceTime, observeOn } from "rxjs/operators";

@Component({
  selector: "app-observable",
  templateUrl: "./observable.component.html",
  styleUrls: ["./observable.component.less"],
})
export class ObservableComponent implements OnInit, OnDestroy {
  private intervalObs: Observable<unknown>;
  private intervalSubscription: Subscription;

  constructor() { }

  ngOnInit() { }

  useObservable() {
    const producer = (observer: any) => {
      observer.next(1); // resolve(1)
      observer.next(2);
      setTimeout(() => {
        observer.next(3);
      }, 1000);
    };
    const observable = new Observable(producer);

    observable.subscribe((value) => {
      console.log(value);
    });
  }

  useObserver() {
    const observable = new Observable((observer: Subscriber<unknown>) => {
      observer.next(1);
      observer.next(2);
      // - 注: 不管是error, 还是complete, 都会中断observable的执行
      observer.complete();
      observer.next(3);
      observer.error(new Error("some error occurred"));
    });

    const observer: Observer<string> = {
      next: (value) => {
        console.log(value);
      },
      error: (error: Error) => {
        console.error(error.message);
      },
      complete: () => {
        console.log("complete");
      },
    };

    observable.subscribe(observer);
  }

  useSubject() {
    const subject = new Subject<number>();
    // - observable
    subject.subscribe((v) => {
      console.log("subscriber A: ", v);
    });
    subject.subscribe((v) => {
      console.log("subscriber B: ", v);
    });
    subject.subscribe((v) => {
      console.log("subscriber C: ", v);
    });

    const source = from([1, 2, 3]); // observable
    console.log("source :>> ", source);
    // - observer
    source.subscribe(subject);
  }

  useSubcription() {
    this.intervalObs = new Observable((observer) => {
      setInterval(() => {
        observer.next(new Date().toUTCString());
      }, 1000);
    });
    this.intervalSubscription = this.intervalObs.subscribe((value) =>
      console.log(value)
    );
  }

  cancelSubscribe() {
    this.intervalSubscription.unsubscribe();
  }

  useOperators() {
    // - 输入流
    const clicks$ = fromEvent(document, "click");
    // - 输出流
    const source = clicks$.pipe(
      map((event: MouseEvent) => event.clientX),
      debounceTime(500)
    );
    source.subscribe((v) => console.log("clientX:", v));
  }

  useScheduler() {
    const observable = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    const source = observable.pipe(
      observeOn(asyncScheduler) // - 异步调度器
    );

    console.log("订阅前");

    source.subscribe(
      (data) => {
        console.log("data:", data);
      },
      (error) => {
        console.error("error:", error);
      },
      () => {
        console.log("subscribe complete");
      }
    );

    console.log("订阅后");
  }

  ngOnDestroy() {

  }
}
