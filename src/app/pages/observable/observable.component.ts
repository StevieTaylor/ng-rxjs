import { Component, OnInit } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.less']
})
export class ObservableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createObservable();
  }

  createObservable() {
    const obs = new Observable((observer) => {
      observer.next(1);
      observer.next(2);
      setTimeout(() => {
        observer.next(3);
        observer.complete();
      }, 2000);
    });
    console.log('subscribe begin');
    obs.subscribe({
      next: (data) => console.log('output data:', data),
      error: (error) => console.log('error:', error),
      complete: () => console.log('done')
    });
    console.log('subscribe end');
  }
}
