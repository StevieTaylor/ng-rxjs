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

  // Promise不可取消
  Promise() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise success after 2 second');
      }, 2000);
    });
    promise.then((value) => console.log(value));
  }

  // Promise单播
  PromiseUnicast() {
    let count = 1;
    const promise = new Promise((resolve, reject) => {
      setInterval(() => {
        resolve(count++);
      }, 1000);
    });
    promise.then((value) => console.log('Promise send:', value));
  }

  // Promise使用catch捕获错误
  PromiseUseCatch() {
    const promise = new Promise((resolve, reject) => {
      reject('Promise failed');
      setTimeout(() => {
        resolve('Promise failed after 2 second'); // 不执行
      }, 2000);
    });
    promise.then(
      (value) => console.log(value)
    ).catch((error) => {
      console.log('error:', error);
    });
  }

  // Observable可以取消
  ObservableUnsubscribe() {
    const observable$ = new Observable((observer) => {
      const timer = setTimeout(() => {
        observer.next('Observable next after 2 second');
      }, 2000);
      return () => clearTimeout(timer);
    });
    const subscription = observable$.subscribe((value) => console.log(value));
    setTimeout(() => {
      console.log('Observable cancel execution');
      subscription.unsubscribe();
    }, 1000);
  }

  // Observable多播
  ObservableMulticast() {
    const observable$ = new Observable((observer) => {
      let count = 1;
      const timer = setInterval(() => {
        observer.next(count++);
      }, 1000);
      return () => clearInterval(timer);
    });
    const subscription = observable$.subscribe((value) => console.log('Observable send: ', value));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }

  // Observable使用各种工具函数操作符
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
