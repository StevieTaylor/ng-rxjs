import { Component, OnInit } from '@angular/core';
import { interval, merge, of, concat, empty } from 'rxjs';
import { mapTo, startWith, delay } from 'rxjs/operators';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.less']
})
export class CombinationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // 并联：通过把多个 Observables 的值混合到一个 Observable 中 来将其打平
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
    }, 30000);
  }

  // 串联：通过顺序地发出多个 Observables 的值将它们连接起来，一个接一个的
  public useConcat() {
    const observable1 = of(1, 2, 3);
    const observable2 = of(4, 5, 6);
    concat(observable1, observable2).subscribe(console.log);
  }

  public concatMessage() {
    const userMessage = document.getElementById('message');
    const delayMessage = (message: any, delayTime = 1000) => {
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

  public useCombineLatest() {

  }

}
