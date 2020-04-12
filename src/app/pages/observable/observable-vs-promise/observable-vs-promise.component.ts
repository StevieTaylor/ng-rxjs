import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-observable-vs-promise',
  templateUrl: './observable-vs-promise.component.html',
  styleUrls: ['./observable-vs-promise.component.less']
})
export class ObservableVsPromiseComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  usePromise() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise success after 2 second');
      }, 2000);
    });
    promise.then((value) => console.log(value));
  }

  // 可以取消
  ObservableUnsubscribe() {
    const observable$ = new Observable((observer) => {
      const timer = setTimeout(() => {
        observer.next('Observable next after 2 second');
      }, 2000);
      return () => clearTimeout(timer);
    });
    const subscription = observable$.subscribe((value) => console.log(value));
    setTimeout(() => {
      console.log('在observable执行的中途取消');
      subscription.unsubscribe();
    }, 1000);
  }

  // 多播
  ObservableMulticast() {
    const observable$ = new Observable((observer) => {
      let count = 1;
      const timer = setInterval(() => {
        observer.next(count++);
      }, 1000);
      return () => clearInterval(timer);
    });
    const subscription = observable$.subscribe((value) => console.log('send: ', value));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }

  // 使用各种工具函数操作符
  ObservableUseOperators() {
    const observable$ = new Observable((observer) => {
      let count = 1;
      const timer = setInterval(() => {
        observer.next(count++);
      }, 1000);
      return () => clearInterval(timer);
    });
    const subscription = observable$.pipe(
      filter((x: any) => x % 2 === 1),
      map((x: any) => x * 3)
    ).subscribe(value => console.log('filter and map: ', value));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }
}
