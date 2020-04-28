import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtering',
  templateUrl: './filtering.component.html',
  styleUrls: ['./filtering.component.less']
})
export class FilteringComponent implements OnInit {

  CreationOperators = [
    {
      key: '1',
      name: 'debounceTime',
      signature: 'debounceTime(dueTime: number, scheduler: Scheduler): Observable',
      description: '将参数列表转化为Observable'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  public useExample(name: string) {
    switch (name) {
      case 'debounce':
        this.useDebounce();
        break;
      default:
        break;
    }
  }

  public useDebounce() {

  }
}

