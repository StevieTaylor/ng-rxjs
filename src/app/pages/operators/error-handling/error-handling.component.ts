import { Component, OnInit } from '@angular/core';
import { throwError, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-error-handling',
  templateUrl: './error-handling.component.html',
  styleUrls: ['./error-handling.component.less']
})
export class ErrorHandlingComponent implements OnInit {

  private operators = ['catchError', 'retry', 'retryWhen'];
  public operatorList = [
    {
      key: '1',
      name: this.operators[0],
      signature: 'catchError(selector: (err: any, caught: Observable)=>ObservableInput)):Observable',
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
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  useOperators(operatorName: string) {
    switch (operatorName) {
      case this.operators[0]:
        this.useCatchError();
        break;

      default:
        break;
    }
  }

  useCatchError() {
    const typeError = new Error('type mismatch');
    const error$ = throwError(typeError);
    const uncaught = error$.subscribe(value => console.log(value));
    const caught = error$.pipe(
      catchError(err => of(`Error Info: ${err}`))
    );
    caught.subscribe(value => console.log(value));
  }

  useRetry() {

  }

}
