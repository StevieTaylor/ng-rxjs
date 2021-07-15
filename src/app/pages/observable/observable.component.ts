/*
 * @Author: Stevie
 * @Date: 2021-07-02 14:44:35
 * @LastEditTime: 2021-07-15 16:06:41
 * @LastEditors: Stevie
 * @Description:
 */
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Observer, Subscriber, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

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
      observer.error(new Error("some error occurred"));
      observer.complete();
    });

    const observer: Observer<unknown> = {
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

  useSubject() { }

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

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }
}
