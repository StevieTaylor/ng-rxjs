import { fromEvent, from, Subscription, interval, timer, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, map, distinctUntilChanged, filter, take, takeLast, takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.less']
})
export class FilteringComponent implements OnInit {

  private operators = ['debounceTime', 'distinctUntilChanged', 'filter', 'take', 'takeLast', 'takeUntil', 'takeWhile'];
  operatorList = [
    {
      key: '1',
      name: this.operators[0],
      signature: 'debounceTime(dueTime: number, scheduler: Scheduler): Observable',
      description: '防抖：舍弃掉在两次输入之间小于指定时间间隔的发出值，保留最新值'
    },
    {
      key: '2',
      name: this.operators[1],
      signature: 'distinctUntilChanged(compare: function): Observable',
      description: '去重：只有当前值与之前最后一个值不同时才将其发出'
    },
    {
      key: '3',
      name: this.operators[2],
      signature: 'filter(select: Function, thisArg: any): Observable',
      description: '筛选：只发出符合给定条件的值'
    },
    {
      key: '4',
      name: this.operators[3],
      signature: 'take(count: number): Observable',
      description: '在完成前只发出最先的N个值'
    },
    {
      key: '5',
      name: this.operators[4],
      signature: 'takeLast(count: number): Observable',
      description: '在完成前只发出最后的N个值'
    },
    {
      key: '6',
      name: this.operators[5],
      signature: 'takeUntil(notifier: Observable): Observable',
      description: '发出值，直到提供的Observable开始发出值为止'
    },
    {
      key: '7',
      name: this.operators[6],
      signature: 'takeWhile(predicate: function(value, index): boolean, inclusive?: boolean): Observable',
      description: '发出值，直到给定的表达式为false'
    }
  ];
  example: string[] = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'last'];
  constructor() { }

  ngOnInit() {
  }

  public useExample(name: string) {
    switch (name) {
      case 'debounceTime':
        this.useDebounceTime();
        break;
      case 'distinctUntilChanged':
        this.useDistinctUntilChanged();
        break;
      case 'filter':
        this.useFilter();
        break;
      case 'take':
        this.useTake();
        break;
      case 'takeLast':
        this.useTakeLast();
        break;
      case 'takeUntil':
        this.useTakeUntil();
        break;
      case 'takeWhile':
        this.useTakeWhile();
        break;
      default:
        break;
    }
  }

  public useDebounceTime() {
    // 输出1秒间隔内最后一次按键的值
    const keyupEvent$ = fromEvent(document, 'keyup').pipe(
      map((event: KeyboardEvent) => event.key),
      debounceTime(1000)
    );
    keyupEvent$.subscribe(value => console.log(value));
  }

  public useDistinctUntilChanged() {
    // 去掉数组中相同的前一项
    const source$ = from([1, 1, '2', '2', true, true]);
    source$.pipe(
      distinctUntilChanged()
    ).subscribe(value => console.log(value));

    // 使用比较函数
    const person$ = from([
      { name: 'jack' },
      { name: 'jack' },
      { name: 'lucy' },
      { name: 'elisa' },
      { name: 'elisa' }
    ]);
    const compare = <T extends Person>(prev: T, curr: T): boolean => prev.name === curr.name;
    const result: Subscription = person$.pipe(
      distinctUntilChanged(compare)
    ).subscribe(
      value => console.log(value)
    );
    result.unsubscribe();
  }

  public useFilter() {
    const students$ = from([
      { name: 'Li Lei', score: 95 },
      { name: 'Han Meimei', score: 92 },
      { name: 'Chen yan', score: 86 }
    ]);
    const result: Subscription = students$.pipe(
      filter(person => person.score > 90)
    ).subscribe(person => console.log('score over 90:', person.name));
    result.unsubscribe();
  }

  public useTake() {
    const source$ = from(this.example);
    const subscription: Subscription = source$.pipe(take(3)).subscribe(value => console.log(value));
    subscription.unsubscribe();
  }

  public useTakeLast() {
    const source$ = from(this.example);
    const subscription: Subscription = source$.pipe(takeLast(3)).subscribe(value => console.log(value));
    subscription.unsubscribe();
  }

  public useTakeUntil() {
    const source$ = interval(1000);
    const timer$ = timer(5000);
    const subscription: Subscription = source$.pipe(
      takeUntil(timer$)
    ).subscribe(value => console.log(value));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }

  public useTakeWhile() {
    const source$ = of(3, 3, 3, 9, 1, 4, 5, 8, 96, 3, 66, 3, 3, 3);
    // takeWhile：判定表达式为false时停止发出值
    source$.pipe(
      takeWhile(n => n === 3)
    ).subscribe(value => console.log('takeWhile:', value));
    // filter：筛选所有满足条件的值
    source$.pipe(
      filter(n => n === 3)
    ).subscribe(value => console.log('filter:', value));
  }
}

interface Person {
  name: string;
  score?: number;
}











