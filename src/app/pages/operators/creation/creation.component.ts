import { Component, OnInit } from '@angular/core';
import { Observable, of, interval, Observer, range, from, fromEvent, defer, timer, merge, empty } from 'rxjs';
import { filter, map, catchError, switchMap } from 'rxjs/operators';
import { ajax, AjaxResponse, AjaxError } from 'rxjs/ajax';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.less']
})
export class CreationComponent implements OnInit {

  avatarUrl: string;
  CreationOperators = [
    {
      key: '1',
      name: 'of',
      signature: 'of(...values): Observable',
      description: '将参数列表转化为Observable'
    },
    {
      key: '2',
      name: 'from',
      signature: 'from(obsInput: ObservableInput): Observable',
      description: '将Array、Promise、Iterator、String等转化为Observable'
    },
    {
      key: '3',
      name: 'fromEvent',
      signature: 'fromEvent(target: EventTargetLike, eventName: string, selector: function): Observable',
      description: '将事件转化为Observable'
    },
    {
      key: '4',
      name: 'ajax',
      signature: 'ajax(urlOrRequest: string | AjaxRequest)',
      description: '使用URL进行ajax请求'
    },
    {
      key: '5',
      name: 'create',
      signature: 'create(subscribe: function(observer: Observer<T>))',
      description: '创建新的Observable'
    },
    {
      key: '6',
      name: 'defer',
      signature: 'defer(observableFactory: ()=>ObservableInput): Observable',
      description: '惰性创建流,当被订阅时,调用该工厂函数创建新的Observable'
    },
    {
      key: '7',
      name: 'interval',
      signature: 'interval(period: number): Observable',
      description: '指定时间间隔发出连续的数字'
    },
    {
      key: '8',
      name: 'timer',
      signature: 'timer(dueTime: number, period: number): Observable',
      description: '在指定时间之后，间隔发出连续的数字'
    },
    {
      key: '9',
      name: 'range',
      signature: 'range(start: number, count: number): Observable',
      description: '发出指定范围内的数字序列'
    },
  ];

  constructor() { }

  ngOnInit() { }

  public useExample(name: string) {
    switch (name) {
      case 'of':
        this.useOf();
        break;
      case 'from':
        this.useFrom();
        break;
      case 'fromEvent':
        this.useFromEvent();
        break;
      case 'create':
        this.useCreate();
        break;
      case 'interval':
        this.useInterval();
        break;
      case 'timer':
        this.useTimer();
        break;
      case 'range':
        this.useRange();
        break;
      case 'ajax':
        this.useAjax();
        break;
      case 'defer':
        this.useDefer();
        break;
      default:
        break;
    }
  }

  public useOf() {
    // 1.发射一串数字序列
    of(1, 2, 3, 4).pipe(
      filter(x => x % 2 === 0)
    ).subscribe(v => console.log('even value:', v));
    // 2.发射不同类型的值
    const source = of(8, 'use of', false, { operator: 'of' }, () => 'use of');
    source.subscribe(data => console.log(data));
  }

  public useFrom() {
    // 1.Array
    const array = [1, 2, 3, 4, '5', false, Symbol('use from')];
    const arrayToObs = from(array).pipe(map((data: number | string | boolean | symbol) => data.toString()));
    arrayToObs.subscribe(value => console.log(value));

    // 2.Promise
    const promise = new Promise((resolve, reject) => {
      const responseCode = 200;
      if (responseCode === 200) {
        resolve('get data success');
      } else {
        reject('an error occured');
      }
    });
    const promiseToObs = from(promise);
    promiseToObs.subscribe(value => console.log(value));

    // 3.Iterator
    const techMap = new Map();
    techMap.set('front-end', 'angular');
    techMap.set('backend', 'node.js');
    const iteratorToObs = from(techMap);
    iteratorToObs.subscribe(value => console.log(value));

    // 4.String
    const source = from('convert');
    source.subscribe(value => console.log(value));
  }

  public useFromEvent() {
    const fromEventBtn = document.getElementById('fromEvent');
    const source = fromEvent(fromEventBtn, 'click').pipe(
      map((event: MouseEvent) => `click time:${event.timeStamp}`)
    );
    source.subscribe(value => console.log(value));
  }

  public useCreate() {
    const source = Observable.create((observer: Observer<any>) => {
      observer.next('use');
      observer.next('create');
    });
    source.subscribe((value: any) => console.log(value));
  }

  public useInterval() {
    const source = interval(1000);
    const subscription = source.subscribe((value) => console.log('interval:', value));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }

  public useTimer() {
    const timer$ = timer(1000, 1000);
    const subscription = timer$.subscribe(value => console.log('timer:', value));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }

  public useRange() {
    const source = range(1, 10);
    source.subscribe(value => console.log(value));
  }

  public useAjax() {
    const USER = 'yyx990803';
    const URL = `https://api.github.com/users/${USER}`;
    const userInfo = ajax(URL).pipe(
      map((res: AjaxResponse) => res.response),
      catchError((error: AjaxError) => {
        return of(error);
      })
    );
    userInfo.subscribe(
      data => {
        if (data) {
          console.log('data:', data);
        }
      },
      error => console.error(error)
    );
  }

  public useDefer() {
    const source = defer(() => of(1, 2, 3));
    source.subscribe(value => console.log(value));
    const date1 = of(new Date());
    const date2 = defer(() => of(new Date()));
    const dateMerge = timer(2000).pipe(
      switchMap(() => merge(date1, date2))
    );
    dateMerge.subscribe(value => console.log(value));
  }
}
