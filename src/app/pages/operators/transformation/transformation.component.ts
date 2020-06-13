import { Component, OnInit } from '@angular/core';
import { from, of, interval } from 'rxjs';
import { map, mapTo, switchMap, delay, mergeMap, mergeAll, flatMap, switchAll, concatMap, scan, bufferTime } from 'rxjs/operators';

@Component({
  selector: 'app-transformation',
  templateUrl: './transformation.component.html',
  styleUrls: ['./transformation.component.less']
})
export class TransformationComponent implements OnInit {
  private eArray = [1, 2, 3];
  private operators = ['map', 'mapTo', 'mergeMap', 'switchMap', 'concatMap', 'scan', 'bufferTime'];
  public operatorList = [
    {
      key: '1',
      name: this.operators[0],
      signature: 'map(project: Function, thisArg: any): Observable',
      description: '对每个源值进行映射'
    },
    {
      key: '2',
      name: this.operators[1],
      signature: 'mapTo(value: any): Observable',
      description: '将所有源值映射成同一个常量'
    },
    {
      key: '3',
      name: this.operators[2],
      signature: 'mergeMap(project: function: Observable, resultSelector?: function: any, concurrent?: number): Observable',
      description: '映射成 observable 并发出值',
      tip: '如果只想将数据平整为一个Observable，则使用mergeMap'
    },
    {
      key: '4',
      name: this.operators[3],
      signature: 'switchMap(project: (value: T, index: number) => O): OperatorFunction): Observable',
      description: '映射成 observable，完成前一个内部 observable，发出值',
      tip: '如果需要将数据平整为一个Observable，但仅需要最新值，则使用switchMap'
    },
    {
      key: '5',
      name: this.operators[4],
      signature: 'concatMap(project: function, resultSelector?: function): Observable',
      description: '将值映射成内部 observable，并按顺序订阅和发出',
      tip: '如果需要将数据平整为一个Observable，且需要按序发出，则使用concatMap'
    },
    {
      key: '6',
      name: this.operators[5],
      signature: 'scan(accumulator: function, seed?: any): Observable',
      description: '对源值进行reduce计算'
    },
    {
      key: '7',
      name: this.operators[6],
      signature: 'bufferTime(bufferTimeSpan: number, bufferCreationInterval: number): Observable',
      description: '以数组的形式从过去收集值，并定期发出这些数组'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  public useExample(name: string) {
    switch (name) {
      case this.operators[0]:
        this.useMap();
        break;
      case this.operators[1]:
        this.useMapTo();
        break;
      case this.operators[2]:
        this.useMergeMap();
        break;
      case this.operators[3]:
        this.useSwitchMap();
        break;
      case this.operators[4]:
        this.useConcatMap();
        break;
      case this.operators[5]:
        this.useScan();
        break;
      case this.operators[6]:
        this.useBufferTime();
        break;
      default:
        break;
    }
  }

  private getData(params: string | number) {
    return of(`params ${params}`).pipe(delay(1000));
  }

  private getRandomData(params: string | number) {
    const delayTime = Math.floor(Math.random() * 10000) + 1;
    return of(`params: ${params} and delay: ${delayTime}`).pipe(
      delay(delayTime)
    );
  }

  private useMap() {
    const persons = [
      { name: 'Jack', age: 25 },
      { name: 'Lucy', age: 23 },
      { name: 'Tom', age: 28 }
    ];
    const source$ = from(persons);
    const result = source$.pipe(map(({ name }) => name)).subscribe(value => console.log(value));
    result.unsubscribe();
  }

  private useMapTo() {
    const source$ = of(1, 2, 3, 4);
    const result = source$.pipe(mapTo('mapTo')).subscribe(value => console.log(value));
    result.unsubscribe();
  }

  /**
   * mergeMap：
   *      1.mergeAll + map 的结合
   *      2.别名是 flatMap
   */
  private useMergeMap() {
    // 订阅outer的时候又要订阅inner
    from(this.eArray).pipe(map(res => this.getData(res))).subscribe(obs => obs.subscribe(value => console.log('map:', value)));
    // map + mergeAll
    from(this.eArray).pipe(
      map(res => this.getData(res)),
      mergeAll()
    ).subscribe(value => console.log('map + mergeAll:', value));
    // mergeMap
    from(this.eArray).pipe(mergeMap((res) => this.getData(res))).subscribe(value => console.log('mergeMap:', value));
    // flatMap
    from(this.eArray).pipe(flatMap((res) => this.getData(res))).subscribe(value => console.log('flatMap:', value));
  }

  /**
   * switchMap：switchAll + map 的结合
   */
  private useSwitchMap() {
    // map
    from(this.eArray).pipe(map(res => this.getData(res))).subscribe(obs => obs.subscribe(value => console.log('map:', value)));
    // map + switchAll
    from(this.eArray).pipe(
      map(res => this.getData(res)),
      switchAll()
    ).subscribe(value => console.log('map + switchAll:', value));
    // switchMap
    from(this.eArray).pipe(switchMap((res) => this.getData(res))).subscribe(value => console.log('switchMap:', value));
  }

  /**
   * concatMap：按顺序订阅和发出
   */
  private useConcatMap() {
    // map
    from(this.eArray).pipe(map(res => this.getRandomData(res))).subscribe(obs => obs.subscribe(value => console.log('map:', value)));
    // mergeMap
    from(this.eArray).pipe(mergeMap((res) => this.getRandomData(res))).subscribe(value => console.log('mergeMap:', value));
    // concatMap
    from(this.eArray).pipe(concatMap(res => this.getRandomData(res))).subscribe(value => console.log('concatMap:', value));
  }

  /**
   * scan: 类似于Array的reduce方法
   */
  private useScan() {
    from(this.eArray).pipe(scan((acc, curValue) => acc + curValue, 10)).subscribe(value => console.log(value));
  }

  /**
   * bufferTime(bufferTimeSpan, bufferCreationInterval)
   *     1. bufferTimeSpan:  缓冲时间间隔
   *     2. bufferCreationInterval：何时开始下一个缓冲区
   */
  private useBufferTime() {
    const source$ = interval(500);
    const subscription = source$.pipe(bufferTime(2000, 1000)).subscribe(value => console.log('Start Buffer Every 1s:', value));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 10000);
  }
}
