import { Component, OnInit } from '@angular/core';
import { interval, merge, of, concat, empty, combineLatest, fromEvent, zip, timer } from 'rxjs';
import { mapTo, startWith, delay, scan } from 'rxjs/operators';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.less']
})
export class CombinationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.calculateClickedCount();
  }

  /**
   * merge: 合并，并联，通过把多个 Observables 的值混合到一个 Observable 中 来将其打平
   */
  public useMerge() {
    const observable1 = interval(1000);
    const observable2 = interval(2000);
    const observable3 = interval(3000);
    const observableMerge = merge(
      observable1.pipe(mapTo('observable1')),
      observable2.pipe(mapTo('observable2')),
      observable3.pipe(mapTo('observable3'))
    );
    const subscription = observableMerge.subscribe(value => console.log(value));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }

  /**
   * concat: 连结，串联，通过顺序地发出多个 Observables 的值将它们连接起来，一个接一个的
   */
  public useConcat() {
    const observable1 = of(1, 2, 3);
    const observable2 = of(4, 5, 6);
    concat(observable1, observable2).subscribe(value => console.log(value));
  }

  // 使用concat实现倒计时
  public concatMessage() {
    const userMessage = document.getElementById('message');
    const delayMessage = (message: any, delayTime = 1000) => {
      // tslint:disable-next-line: deprecation
      return empty().pipe(startWith(message), delay(delayTime));
    };
    concat(
      delayMessage('ready'),
      delayMessage('3'),
      delayMessage('2'),
      delayMessage('1'),
      delayMessage('go'),
      delayMessage('', 2000)
    ).subscribe((msg: any) => userMessage.innerHTML = msg);
  }

  /**
   * zip: 多个Observable组合来创建一个Observable，其值是根据其每个输入Observable的值按顺序计算的
   */
  public useZip() {
    const name$ = of('jack', 'lucy', 'stevie');
    const age$ = of(21, 25, 26);
    const isWorker$ = of(false, true, true);
    // tslint:disable-next-line: deprecation
    zip(name$, age$, isWorker$,
      (name: string, age: number, isWorker: boolean) => ({ name, age, isWorker }))
      .subscribe(value => console.log(value));
    console.log('-------------------------------------');
    // 当任何一个流先行结束之后，整个输出流也就结束了
    const gender$ = of('male', 'female');
    // tslint:disable-next-line: deprecation
    zip(name$, age$, gender$,
      (name: string, age: number, gender: string) => ({ name, age, gender }))
      .subscribe(value => console.log(value));
  }

  /**
   * startWith: Observable 会先发出作为参数指定的项，然后再发出由源 Observable 所发出的项
   */
  public useStartWith() {
    const source = of(1, 2, 3, 4, 5);
    source.pipe(
      startWith('start count')
    ).subscribe(value => console.log(value));
  }

  /**
   * combineLastest: 组合多个Observable创建一个Observable，其值是根据其每个输入Observable的最新值计算得出的。
   */
  public useCombineLatest() {
    const timer1 = timer(0, 1000);
    const timer2 = timer(500, 1000);
    const subscription = combineLatest(timer1, timer2).subscribe(value => console.log(value));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }

  // 使用combineLastest计算BMI
  public calculateBMI() {
    const weight = of(70, 72, 76, 79, 75);
    const height = of(1.76, 1.77, 1.78);
    // tslint:disable-next-line: deprecation
    combineLatest(weight, height, (w, h) => w / (h * h)).subscribe(value => console.log('BMI is:', value));
  }

  // 使用combineLastest计算点击次数
  public calculateClickedCount() {
    const btn1Count = document.getElementById('btn1Count');
    const btn2Count = document.getElementById('btn2Count');
    const totalCount = document.getElementById('totalCount');
    const addOneClick = (id: string) => fromEvent(document.getElementById(id), 'click').pipe(
      mapTo(1),
      scan((acc, cur) => acc + cur, 0),
      startWith(0)
    );
    combineLatest(addOneClick('btn1'), addOneClick('btn2')).subscribe(
      ([count1, count2]: any) => {
        btn1Count.innerHTML = count1;
        btn2Count.innerHTML = count2;
        totalCount.innerHTML = count1 + count2;
      }
    );
  }
}
